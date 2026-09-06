-- ==========================================================
-- FLORENCE KITCHEN & FURNITURE - SUPABASE DATABASE SCHEMA
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'kitchens',
    description TEXT,
    thumbnail TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    specs JSONB DEFAULT '{}'::jsonb,
    price NUMERIC(12, 2) DEFAULT NULL,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for fast search and filtering
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);

-- 3. Inquiries & Contact Messages Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    message TEXT NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5. Row Level Security (RLS) Setup
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Product Policies:
-- Anyone (public) can read published products
CREATE POLICY "Public can view published products"
ON public.products FOR SELECT
USING (status = 'published');

-- Authenticated admins can view all products (including drafts)
CREATE POLICY "Admins can view all products"
ON public.products FOR SELECT
TO authenticated
USING (true);

-- Authenticated admins can insert new products
CREATE POLICY "Admins can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated admins can update products
CREATE POLICY "Admins can update products"
ON public.products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Authenticated admins can delete products
CREATE POLICY "Admins can delete products"
ON public.products FOR DELETE
TO authenticated
USING (true);

-- Inquiry Policies:
-- Anyone can submit an inquiry / contact form
CREATE POLICY "Public can submit inquiries"
ON public.inquiries FOR INSERT
WITH CHECK (true);

-- Authenticated admins can read and manage inquiries
CREATE POLICY "Admins can view inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can update inquiries"
ON public.inquiries FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Admins can delete inquiries"
ON public.inquiries FOR DELETE
TO authenticated
USING (true);

-- 6. Storage Bucket Configuration (Run in Supabase SQL editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for product-images bucket:
CREATE POLICY "Public Read Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated Admin Upload Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated Admin Update Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated Admin Delete Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- 7. Initial Seed Data (Florence Kitchen real showcase items)
INSERT INTO public.products (title, slug, category, description, thumbnail, images, specs, price, featured, status)
VALUES
(
    'مطبخ أكريليك مودرن - رمادي وخشب طبيعي',
    'modern-acrylic-kitchen-grey-wood',
    'kitchens',
    'تصميم وتنفيذ مطبخ مودرن يجمع بين شياكة الأكريليك التركي عالي اللمعان باللون الرمادي، مع دفء خامات الخشب الطبيعي المعالج ضد الرطوبة والحرارة. وحدات تخزين ذكية ومفصلات سوفت كلوز بلوم نمساوي.',
    '/img/1.jpg',
    ARRAY['/img/1.jpg', '/img/1-1.jpg', '/img/1-2.jpg', '/img/1-3.jpg'],
    '{"material": "أكريليك تركي مقاوم للخدش", "accessories": "بلوم نمساوي Soft Close", "countertop": "كوارتز أبيض إسباني", "warranty": "ضمان 10 سنوات", "location": "مدينة العبور"}'::jsonb,
    NULL,
    TRUE,
    'published'
),
(
    'مطبخ كلاسيك راقي - خشب أبيض مع جولد',
    'classic-luxury-white-kitchen',
    'kitchens',
    'مطبخ كلاسيكي فاخر بدهانات دوكو فرن مقاومة للرطوبة، تشطيبات دقيقة ومقابض نحاسية مذهبة، مع جزيرة وسطى مجهزة بمساحات تخزين واسعة ورخام كارارا إيطالي.',
    '/img/2.jpg',
    ARRAY['/img/2.jpg', '/img/img-2.jpg', '/img/img-3.jpg'],
    '{"material": "خشب زان أحمر مطعم بقواطع HPL", "accessories": "إكسسوارات إيطالية هيدروليك", "countertop": "رخام طبيعي كارارا", "warranty": "ضمان 10 سنوات", "location": "التجمع الخامس"}'::jsonb,
    NULL,
    TRUE,
    'published'
),
(
    'دريسنج روم مودرن مع إضاءات ليد بروفايل',
    'modern-luxury-dressing-room',
    'dressing-rooms',
    'غرفة ملابس (Dressing Room) ذكية بتقسيمات داخلية مخصصة للأحذية والملابس والإكسسوارات، مع زجاج سيكوريت عسلي وإضاءات ليد مدمجة ومستشعرات حركة.',
    '/img/3.jpg',
    ARRAY['/img/3.jpg', '/img/img-4.jpg', '/img/img-5.jpg'],
    '{"material": "خشب كاونتر مستورد مكسو HPL ألماني", "glass": "زجاج مسنفر مع فريم ألومنيوم أسود", "lighting": "LED Profile مخفي مع حساسات", "warranty": "ضمان 5 سنوات", "location": "مدينة نصر"}'::jsonb,
    NULL,
    TRUE,
    'published'
),
(
    'وحدة تلفزيون وديكور ليفنج مودرن',
    'modern-tv-unit-living-room',
    'living-rooms',
    'ديكور حوائط ووحدة تلفزيون متكاملة ببديل الخشب وبديل الرخام مع إضاءة دافئة ووحدات سفلية معلقة عصرية تمنح الصالة إحساساً بالفخامة والاتساع.',
    '/img/img-6.jpg',
    ARRAY['/img/img-6.jpg', '/img/img-7.jpg'],
    '{"material": "بديل رخام UV مع بديل خشب WPC", "shelves": "أرفف خشبية معلقة مع إنارة مخفية", "warranty": "ضمان 3 سنوات", "location": "الشيخ زايد"}'::jsonb,
    NULL,
    FALSE,
    'published'
),
(
    'مطبخ بولى لاك عصرى مقاوم للحرارة',
    'polylac-modern-kitchen',
    'kitchens',
    'مطبخ مصنع من ألواح البولي لاك المقاومة بنسبة 100% للخدوش وبخار الماء والحرارة، تصميم مفتوح بتوزيع هندسي يراعي مثلث الحركة ويوفر أقصى استغلال للمساحة.',
    '/img/portfolio-1.jpg',
    ARRAY['/img/portfolio-1.jpg', '/img/portfolio-2.jpg', '/img/portfolio-3.jpg'],
    '{"material": "بولي لاك كوري عالي اللمعان", "countertop": "جرانيت هندي أسود دبل بلاك", "warranty": "ضمان 10 سنوات", "location": "مصر الجديدة"}'::jsonb,
    NULL,
    TRUE,
    'published'
);
