import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Product, ProductFormData, Inquiry } from '@/types';
import { INITIAL_PRODUCTS } from '@/lib/mock-data';

// In-memory fallback store for when Supabase is not yet hooked up or local demoing
let localProductsStore: Product[] = [...INITIAL_PRODUCTS];

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
  let result = [...localProductsStore];

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

  const found = localProductsStore.find((p) => p.slug === slug);
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

  const found = localProductsStore.find((p) => p.id === id);
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
        return { product: null, error: error.message };
      }
      return { product: data as Product, error: null };
    } catch (err: any) {
      return { product: null, error: err.message || 'Database error' };
    }
  }

  // Local fallback insertion
  localProductsStore = [newProduct, ...localProductsStore];
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
        return { product: null, error: error.message };
      }
      return { product: data as Product, error: null };
    } catch (err: any) {
      return { product: null, error: err.message || 'Database error' };
    }
  }

  // Local fallback update
  const index = localProductsStore.findIndex((p) => p.id === id);
  if (index !== -1) {
    localProductsStore[index] = {
      ...localProductsStore[index],
      ...productData,
      updated_at: new Date().toISOString(),
    };
    return { product: localProductsStore[index], error: null };
  }

  return { product: null, error: 'Product not found' };
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Database error' };
    }
  }

  // Local fallback deletion
  localProductsStore = localProductsStore.filter((p) => p.id !== id);
  return { success: true, error: null };
}

export async function uploadProductImage(file: File): Promise<{ url: string | null; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        return { url: null, error: uploadError.message };
      }

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      return { url: data.publicUrl, error: null };
    } catch (err: any) {
      return { url: null, error: err.message || 'Storage upload failed' };
    }
  }

  // Fallback: create an object URL or base64
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
