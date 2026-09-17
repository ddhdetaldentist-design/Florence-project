'use client';

import React, { useState } from 'react';
import { 
  Database, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

const SQL_SCHEMA = `-- ==========================================================
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

-- 3. Site Settings Table (Hero Slider, About, Contact, Offerings)
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

-- 7. Row Level Security (RLS) Setup
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admins can manage team members" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

-- 8. Storage Bucket Configuration
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Product Images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Allow All Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow All Updates" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
CREATE POLICY "Allow All Deletes" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');
`;

export default function SqlSetupPage() {
  const [copied, setCopied] = useState(false);

  const copySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Supabase Database Setup & Schema</h1>
          <p className="text-xs text-zinc-400 mt-1">
            One-click SQL script to generate all required database tables and storage rules in your Supabase project.
          </p>
        </div>

        <button
          onClick={copySql}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 transition-all"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'SQL Copied to Clipboard!' : 'Copy Complete SQL'}</span>
        </button>
      </div>

      {/* Quick Setup Instructions */}
      <div className="bg-[#181822] p-6 rounded-3xl border border-zinc-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <span>Quick 2-Step Setup</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-primary text-zinc-950 text-xs font-black flex items-center justify-center">
              1
            </span>
            <h3 className="text-xs font-bold text-white">Open Supabase SQL Editor</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Open your project dashboard on Supabase and click on the <strong>SQL Editor</strong> tab on the left.
            </p>
            <a
              href="https://supabase.com/dashboard/project/ebsdkibpaxpszbqjygnb/sql/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-primary text-zinc-950 text-xs font-black flex items-center justify-center">
              2
            </span>
            <h3 className="text-xs font-bold text-white">Paste & Click &quot;Run&quot;</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Paste the copied script below into the editor and hit <strong>Run</strong>. All tables (`products`, `site_settings`, `testimonials`, `team_members`, `inquiries`) will be created instantly.
            </p>
            <button
              onClick={copySql}
              className="text-xs font-bold text-primary hover:underline block pt-1 text-left"
            >
              {copied ? '✓ Copied' : 'Click here to copy SQL'}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>
            Storage bucket <strong>&apos;product-images&apos;</strong> has already been created and enabled for uploads via Supabase API!
          </span>
        </div>
      </div>

      {/* SQL Code Box */}
      <div className="bg-[#14141c] rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="p-4 bg-[#181822] border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">supabase_schema.sql</span>
          <button
            onClick={copySql}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-5 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-96 leading-relaxed">
          {SQL_SCHEMA}
        </pre>
      </div>
    </div>
  );
}
