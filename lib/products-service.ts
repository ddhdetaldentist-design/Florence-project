import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Product, ProductFormData, Inquiry } from '@/types';
import { INITIAL_PRODUCTS } from '@/lib/mock-data';

const STORAGE_KEY = 'florence_local_products_v2';

function isSchemaOrTableMissing(msg?: string): boolean {
  if (!msg) return false;
  const lower = msg.toLowerCase();
  return (
    lower.includes('schema cache') ||
    lower.includes('could not find the table') ||
    (lower.includes('relation') && lower.includes('does not exist')) ||
    lower.includes('pgrst205') ||
    lower.includes('pgrst200') ||
    lower.includes('42p01')
  );
}

// In-memory fallback store with browser localStorage synchronization
let localProductsStore: Product[] = [...INITIAL_PRODUCTS];

function getLocalProductsStore(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localProductsStore = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed reading products from localStorage', e);
    }
  }
  return localProductsStore;
}

function saveLocalProductsStore(items: Product[]) {
  localProductsStore = items;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed writing products to localStorage', e);
    }
  }
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  status?: 'published' | 'draft' | 'all';
  search?: string;
}): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase.from('products').select('*');

      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      } else if (!options?.status) {
        query = query.eq('status', 'published');
      }

      if (options?.category && options.category !== 'all') {
        query = query.eq('category', options.category);
      }

      if (options?.featured !== undefined) {
        query = query.eq('featured', options.featured);
      }

      if (options?.search) {
        query = query.ilike('title', `%${options.search}%`);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local dataset', err);
    }
  }

  // Fallback to local data
  let result = [...getLocalProductsStore()];

  if (options?.status && options.status !== 'all') {
    result = result.filter((p) => p.status === options.status);
  } else if (!options?.status) {
    result = result.filter((p) => p.status === 'published');
  }

  if (options?.category && options.category !== 'all') {
    result = result.filter((p) => p.category === options.category);
  }

  if (options?.featured !== undefined) {
    result = result.filter((p) => p.featured === options.featured);
  }

  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return data as Product;
      }
    } catch (err) {
      console.warn('Supabase fetch by slug failed, falling back', err);
    }
  }

  const found = getLocalProductsStore().find((p) => p.slug === slug);
  return found || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return data as Product;
      }
    } catch (err) {
      console.warn('Supabase fetch by id failed, falling back', err);
    }
  }

  const found = getLocalProductsStore().find((p) => p.id === id);
  return found || null;
}

export async function createProduct(productData: ProductFormData): Promise<{ product: Product | null; error: string | null }> {
  const newProduct: Product = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `prod_${Date.now()}`,
    ...productData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          console.warn('Supabase table missing, saving locally:', error.message);
          const current = getLocalProductsStore();
          const updated = [newProduct, ...current];
          saveLocalProductsStore(updated);
          return { product: newProduct, error: null };
        }
        return { product: null, error: error.message };
      }
      return { product: data as Product, error: null };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        const current = getLocalProductsStore();
        const updated = [newProduct, ...current];
        saveLocalProductsStore(updated);
        return { product: newProduct, error: null };
      }
      return { product: null, error: err.message || 'Database error' };
    }
  }

  // Local fallback insertion
  const current = getLocalProductsStore();
  const updated = [newProduct, ...current];
  saveLocalProductsStore(updated);
  return { product: newProduct, error: null };
}

export async function updateProduct(id: string, productData: Partial<ProductFormData>): Promise<{ product: Product | null; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .update({
          ...productData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          console.warn('Supabase table missing, updating locally:', error.message);
          return updateLocalFallback(id, productData);
        }
        return { product: null, error: error.message };
      }
      return { product: data as Product, error: null };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return updateLocalFallback(id, productData);
      }
      return { product: null, error: err.message || 'Database error' };
    }
  }

  return updateLocalFallback(id, productData);
}

function updateLocalFallback(id: string, productData: Partial<ProductFormData>): { product: Product | null; error: string | null } {
  const current = getLocalProductsStore();
  const index = current.findIndex((p) => p.id === id);
  if (index !== -1) {
    const updatedItem = {
      ...current[index],
      ...productData,
      updated_at: new Date().toISOString(),
    };
    current[index] = updatedItem;
    saveLocalProductsStore([...current]);
    return { product: updatedItem, error: null };
  }
  return { product: null, error: 'Product not found' };
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          console.warn('Supabase table missing, deleting locally:', error.message);
          return deleteLocalFallback(id);
        }
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return deleteLocalFallback(id);
      }
      return { success: false, error: err.message || 'Database error' };
    }
  }

  return deleteLocalFallback(id);
}

function deleteLocalFallback(id: string): { success: boolean; error: string | null } {
  const current = getLocalProductsStore();
  const filtered = current.filter((p) => p.id !== id);
  saveLocalProductsStore(filtered);
  return { success: true, error: null };
}

export async function uploadProductImage(file: File): Promise<{ url: string | null; error: string | null }> {
  // 1. Try server-side API upload with service role key (guarantees storage permissions)
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.url) {
        return { url: data.url, error: null };
      }
    }
  } catch (apiErr) {
    console.warn('API upload failed, trying direct browser upload', apiErr);
  }

  // 2. Direct browser upload with Supabase client
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (!uploadError) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
        return { url: data.publicUrl, error: null };
      }
    } catch (err: any) {
      console.warn('Direct Supabase upload error:', err);
    }
  }

  // 3. Fallback: Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ url: reader.result as string, error: null });
    };
    reader.onerror = () => {
      resolve({ url: null, error: 'Failed to read file' });
    };
    reader.readAsDataURL(file);
  });
}

export async function submitInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('inquiries').insert([inquiry]);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Inquiry submission failed' };
    }
  }

  return { success: true, error: null };
}
