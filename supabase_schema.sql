-- ==========================================================
-- FLORENCE KITCHEN & FURNITURE - COMPLETE SUPABASE SCHEMA
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products / Projects Table
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

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);

-- 3. Site Settings Table (Hero Slider, About, Contact info, Social, Offerings)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'general',
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials Table (Client Reviews)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image TEXT DEFAULT '/img/prof.jpg',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    image TEXT DEFAULT '/img/prof.jpg',
    facebook TEXT,
    linkedin TEXT,
    whatsapp TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Inquiries & Contact Messages Table
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

-- 7. Automatically update updated_at timestamp
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

CREATE OR REPLACE TRIGGER set_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 8. Row Level Security (RLS) Setup
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Product Policies:
DROP POLICY IF EXISTS "Public can view published products" ON public.products;
CREATE POLICY "Public can view published products"
ON public.products FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
USING (true)
WITH CHECK (true);

-- Site Settings Policies:
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings"
ON public.site_settings FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
USING (true)
WITH CHECK (true);

-- Testimonials Policies:
DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
CREATE POLICY "Public can view testimonials"
ON public.testimonials FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials FOR ALL
USING (true)
WITH CHECK (true);

-- Team Members Policies:
DROP POLICY IF EXISTS "Public can view team members" ON public.team_members;
CREATE POLICY "Public can view team members"
ON public.team_members FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins can manage team members" ON public.team_members;
CREATE POLICY "Admins can manage team members"
ON public.team_members FOR ALL
USING (true)
WITH CHECK (true);

-- Inquiries Policies:
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.inquiries;
CREATE POLICY "Public can submit inquiries"
ON public.inquiries FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage inquiries" ON public.inquiries;
CREATE POLICY "Admins can manage inquiries"
ON public.inquiries FOR ALL
USING (true)
WITH CHECK (true);

-- 9. Storage Bucket Configuration
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Product Images" ON storage.objects;
CREATE POLICY "Public Read Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow All Uploads" ON storage.objects;
CREATE POLICY "Allow All Uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow All Updates" ON storage.objects;
CREATE POLICY "Allow All Updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow All Deletes" ON storage.objects;
CREATE POLICY "Allow All Deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- 10. Initial Seed Data (Florence Kitchen real showcase items)
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
)
ON CONFLICT (slug) DO NOTHING;

-- 11. Initial Testimonials Seed
INSERT INTO public.testimonials (name, title, text, rating, image)
VALUES
('Afaf Abdelmoneam', 'Verified Client - Acrylic Kitchen', 'Thank you so much Eng. Mohamed for the excellent kitchen design and high-quality materials exactly as requested. You truly cared about delivering the best outcome and were strictly on time.', 5, '/img/1-1.jpg'),
('Yomna Osama', 'Verified Client - Kitchen & Dressing Room', 'An exceptional company with great dedication to quality. The materials are top European grade, prices are fair, and Eng. Mohamed Atef is very professional and respectful. Delivery was right on schedule.', 5, '/img/1-2.jpg'),
('Mando Kamal', 'Verified Client - Furniture & Interior Decor', 'I would like to thank everyone at Florence for product quality, adherence to specs, easy handling of modifications, and sticking to agreed pricing. Outstanding work and best wishes.', 5, '/img/1-3.jpg')
ON CONFLICT DO NOTHING;

-- 12. Initial Team Members Seed
INSERT INTO public.team_members (name, role, image, facebook, linkedin, whatsapp, sort_order)
VALUES
('Eng. Mohamed Atef', 'Owner & General Manager', '/img/prof.jpg', 'https://www.facebook.com/Florencekitchenandfurniture', NULL, 'https://wa.me/201065772456', 1),
('Hassan Samhan', 'Sales & Design Consultant', '/img/prof.jpg', NULL, 'https://www.linkedin.com/in/hassan-samhan-194889247/', 'https://wa.me/201065772456', 2)
ON CONFLICT DO NOTHING;
