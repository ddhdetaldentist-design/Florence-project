export type ProductCategory = 
  | 'all'
  | 'kitchens'
  | 'dressing-rooms'
  | 'living-rooms'
  | 'bedrooms'
  | 'furniture';

export interface ProductSpecs {
  material?: string;
  accessories?: string;
  countertop?: string;
  lighting?: string;
  warranty?: string;
  location?: string;
  dimensions?: string;
  color?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory | string;
  description: string;
  thumbnail: string;
  images: string[];
  specs?: ProductSpecs;
  price?: number | null;
  featured: boolean;
  status: 'published' | 'draft';
  created_at: string;
  updated_at?: string;
}

export interface ProductFormData {
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  specs: ProductSpecs;
  price?: number | null;
  featured: boolean;
  status: 'published' | 'draft';
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  product_id?: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}
