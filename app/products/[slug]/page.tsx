import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductBySlug, getProducts } from '@/lib/products-service';
import ProductGallery from './ProductGallery';
import { 
  ShieldCheck, 
  Ruler, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  PhoneCall, 
  ArrowRight, 
  Layers, 
  Calendar, 
  Sparkles,
  Share2
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Get related products in same category
  const allInCat = await getProducts({ category: product.category, status: 'published' });
  const relatedProducts = allInCat.filter((p) => p.id !== product.id).slice(0, 3);

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail || '/img/1.jpg'];

  const whatsappMessage = encodeURIComponent(
    `مرحباً فلورنس للمطابخ، أريد الاستفسار عن تفاصيل وسعر تصميم: "${product.title}"`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#121217]">
      <Navbar />

      {/* Breadcrumb Header */}
      <div className="bg-[#181822] border-b border-zinc-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <Link href="/" className="hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">
              المنتجات والمشاريع
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-primary font-medium truncate max-w-[200px] sm:max-w-xs">
              {product.title}
            </span>
          </nav>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للكتالوج</span>
          </Link>
        </div>
      </div>

      {/* Main Details Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery images={imagesList} title={product.title} />
          </div>

          {/* Details & Action Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 border border-primary/30 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="bg-zinc-800 text-amber-300 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>مشروع مميز</span>
                  </span>
                )}
                <span className="text-zinc-500 text-xs flex items-center gap-1 mr-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(product.created_at).toLocaleDateString('ar-EG')}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {product.title}
              </h1>

              {/* Description */}
              <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line bg-[#181822]/60 p-5 rounded-2xl border border-zinc-800/80">
                {product.description}
              </div>

              {/* Technical Specifications */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="bg-[#181822] rounded-2xl p-5 border border-zinc-800 space-y-3">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Layers className="w-4 h-4 text-primary" />
                    <span>المواصفات الفنية والتفاصيل</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-2.5 text-xs">
                    {product.specs.material && (
                      <div className="flex justify-between py-1 border-b border-zinc-800/50">
                        <span className="text-zinc-400">الخامة الرئيسية:</span>
                        <span className="text-white font-semibold">{product.specs.material}</span>
                      </div>
                    )}
                    {product.specs.accessories && (
                      <div className="flex justify-between py-1 border-b border-zinc-800/50">
                        <span className="text-zinc-400">المفصلات والإكسسوار:</span>
                        <span className="text-white font-semibold">{product.specs.accessories}</span>
                      </div>
                    )}
                    {product.specs.countertop && (
                      <div className="flex justify-between py-1 border-b border-zinc-800/50">
                        <span className="text-zinc-400">القرصة / السطح:</span>
                        <span className="text-white font-semibold">{product.specs.countertop}</span>
                      </div>
                    )}
                    {product.specs.lighting && (
                      <div className="flex justify-between py-1 border-b border-zinc-800/50">
                        <span className="text-zinc-400">نظام الإضاءة:</span>
                        <span className="text-white font-semibold">{product.specs.lighting}</span>
                      </div>
                    )}
                    {product.specs.color && (
                      <div className="flex justify-between py-1 border-b border-zinc-800/50">
                        <span className="text-zinc-400">اللون والتشطيب:</span>
                        <span className="text-white font-semibold">{product.specs.color}</span>
                      </div>
                    )}
                    {product.specs.location && (
                      <div className="flex justify-between py-1 border-b border-zinc-800/50">
                        <span className="text-zinc-400">موقع التنفيذ:</span>
                        <span className="text-white font-semibold">{product.specs.location}</span>
                      </div>
                    )}
                    {product.specs.warranty && (
                      <div className="flex justify-between py-1">
                        <span className="text-zinc-400">فترة الضمان:</span>
                        <span className="text-primary font-bold">{product.specs.warranty}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Inquiries & CTAs */}
            <div className="pt-6 space-y-3">
              <a
                href={`https://wa.me/201065772456?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>طلب معاينة واستفسار عبر الواتساب</span>
              </a>

              <a
                href="tel:01065772456"
                className="w-full py-3.5 rounded-xl bg-[#181822] hover:bg-zinc-800 text-white font-bold text-sm border border-zinc-700 flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-primary" />
                <span>اتصال هاتفي مباشر: 0106 577 2456</span>
              </a>

              <p className="text-center text-xs text-zinc-500 pt-1">
                معاينة مجانية داخل القاهرة والجيزة وتصميم 3D لمطبخك قبل البدء
              </p>
            </div>
          </div>
        </div>

        {/* Related Works */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-8">
              أعمال ومشاريع مشابهة قد تهمك
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
