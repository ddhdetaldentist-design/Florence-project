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
    'Modern Acrylic Kitchen - Matte Grey & Warm Wood',
    'modern-acrylic-kitchen-grey-wood',
    'kitchens',
    'Custom-designed contemporary kitchen combining Turkish high-gloss Acrylic in elegant matte grey with heat and moisture-treated natural wood accents. Features smart storage solutions, ergonomic workflows, and Austrian Blum soft-close fittings for decades of smooth operation.',
    '/img/1.jpg',
    ARRAY['/img/1.jpg', '/img/1-1.jpg', '/img/1-2.jpg', '/img/1-3.jpg'],
    '{"material": "Turkish High-Gloss Scratch-Resistant Acrylic", "accessories": "Original Austrian Blum Soft-Close Hinges & Runners", "countertop": "Spanish White Quartz Stain-Resistant Stone", "warranty": "10-Year Certified Warranty", "location": "Obour City - 9th District", "color": "Matte Grey & Warm Oak Wood"}'::jsonb,
    NULL,
    TRUE,
    'published'
),
(
    'Classic Luxury Kitchen - Royal White with Gold Accents',
    'classic-luxury-white-kitchen',
    'kitchens',
    'A timeless classic masterpiece finished with moisture-resistant oven Duco paint, handcrafted mouldings, and gold brass handles. Equipped with a central island offering generous storage and authentic Italian Carrara marble countertops.',
    '/img/2.jpg',
    ARRAY['/img/2.jpg', '/img/img-2.jpg', '/img/img-3.jpg'],
    '{"material": "Natural Red Beech Wood with German HPL Cladding", "accessories": "Full Hydraulic Italian Hardware Systems", "countertop": "Natural Italian Carrara Marble", "warranty": "10-Year Certified Warranty", "location": "Fifth Settlement, New Cairo", "color": "Royal White with Brushed Gold"}'::jsonb,
    NULL,
    TRUE,
    'published'
),
(
    'Contemporary Luxury Dressing Room with Profile LED',
    'modern-luxury-dressing-room',
    'dressing-rooms',
    'Smart walk-in closet and dressing room featuring calculated geometric compartments for apparel, shoes, and luxury accessories. Fitted with reflective bronze securit glass doors and integrated profile LED lighting with automatic motion sensors.',
    '/img/3.jpg',
    ARRAY['/img/3.jpg', '/img/img-4.jpg', '/img/img-5.jpg'],
    '{"material": "High-Density Imported Counter Wood with HPL Finish", "lighting": "Concealed LED Profile with Door Motion Sensors", "accessories": "Heavy-Duty Hydraulic Drawer Runners & Organizers", "warranty": "5-Year Certified Warranty", "location": "Nasr City, Cairo", "color": "Dark Anthracite with Bronze Glass"}'::jsonb,
    NULL,
    TRUE,
    'published'
),
(
    'Modern Living Room TV Unit & Architectural Wall Paneling',
    'modern-tv-unit-living-room',
    'living-rooms',
    'Integrated wall decor and floating TV console featuring UV marble alternative and WPC fluted wood panels. Ambient warm lighting and floating storage compartments deliver an upscale hotel-suite ambiance to your lounge.',
    '/img/img-6.jpg',
    ARRAY['/img/img-6.jpg', '/img/img-7.jpg'],
    '{"material": "Turkish UV Marble Alternative & WPC Fluted Wood Panels", "lighting": "Concealed Warm White LED 3000K", "accessories": "Heavy-Duty Wall Mounts & Hidden Cable Routing", "warranty": "3-Year Certified Warranty", "location": "Sheikh Zayed City", "color": "Calacatta White & Natural Walnut"}'::jsonb,
    NULL,
    FALSE,
    'published'
),
(
    'PolyLac High-Gloss Modern Kitchen - Heat & Steam Proof',
    'polylac-modern-kitchen',
    'kitchens',
    'Crafted with premium Korean PolyLac boards engineered to withstand 100% of moisture, steam, and everyday scratches. Open-plan layout configured strictly around the ergonomic work triangle to maximize every inch of functional space.',
    '/img/portfolio-1.jpg',
    ARRAY['/img/portfolio-1.jpg', '/img/portfolio-2.jpg', '/img/portfolio-3.jpg'],
    '{"material": "Korean Multi-Layer Scratch-Proof PolyLac", "countertop": "Indian Double Black Anti-Bacterial Granite", "accessories": "Italian FGV Hydraulic Soft-Close Hinges", "warranty": "10-Year Certified Warranty", "location": "Heliopolis, Cairo", "color": "Pure Gloss White & Charcoal"}'::jsonb,
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
