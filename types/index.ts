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

// ---------------- Site Customization Types ----------------

export interface HeroSlide {
  id: string;
  image: string;
  badge: string;
  subtitle: string;
  title: string;
  desc: string;
  btnText?: string;
  btnLink?: string;
  waBtnText?: string;
}

export interface AboutPillar {
  title: string;
  subtitle: string;
  icon?: string;
}

export interface AboutSectionData {
  yearsExperience: string;
  experienceBadge: string;
  experienceSubtitle: string;
  tagline: string;
  title: string;
  description: string;
  pillars: AboutPillar[];
}

export interface OfferItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tagColor?: string;
}

export interface OfferingsSectionData {
  badge: string;
  title: string;
  description: string;
  items: OfferItem[];
}

export interface WhyChooseUsFeature {
  title: string;
  desc: string;
}

export interface WhyChooseUsSectionData {
  badge: string;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
  features: WhyChooseUsFeature[];
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter?: string;
  tiktok?: string;
}

export interface SiteSettings {
  contact: ContactInfo;
  social: SocialLinks;
  heroSlides: HeroSlide[];
  about: AboutSectionData;
  offerings: OfferingsSectionData;
  whyChooseUs: WhyChooseUsSectionData;
}

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  text: string;
  rating: number;
  image: string;
  created_at?: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  image: string;
  facebook?: string;
  linkedin?: string;
  whatsapp?: string;
  sort_order?: number;
  created_at?: string;
}
