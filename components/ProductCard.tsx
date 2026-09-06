import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Shield, Sparkles, ArrowLeft, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const CATEGORY_NAMES: Record<string, string> = {
  kitchens: 'مطابخ',
  'dressing-rooms': 'دريسنج روم',
  'living-rooms': 'غرف معيشة',
  bedrooms: 'غرف نوم',
  furniture: 'أثاث منزلي',
};

export default function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = CATEGORY_NAMES[product.category] || product.category;

  return (
    <div className="group relative bg-[#181822] rounded-2xl overflow-hidden border border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900">
        <Image
          src={product.thumbnail || '/img/1.jpg'}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181822] via-transparent to-black/40" />

        {/* Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="bg-primary/90 backdrop-blur-md text-zinc-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {categoryLabel}
          </span>
          {product.featured && (
            <span className="bg-zinc-900/80 backdrop-blur-md text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/30 flex items-center gap-1 shadow">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>عمل مميز</span>
            </span>
          )}
        </div>

        {/* Images Count badge */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-zinc-300 text-xs px-2.5 py-1 rounded-lg border border-zinc-700/50 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>{product.images.length} صور</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1 mb-2">
            {product.title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Specs Highlights */}
        {product.specs && (
          <div className="pt-3 border-t border-zinc-800/80 mb-4 space-y-1.5 text-xs text-zinc-400">
            {product.specs.material && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">الخامة:</span>
                <span className="text-zinc-300 font-medium truncate max-w-[180px]">
                  {product.specs.material}
                </span>
              </div>
            )}
            {product.specs.warranty && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-primary" />
                  <span>الضمان:</span>
                </span>
                <span className="text-primary font-semibold">
                  {product.specs.warranty}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Footer Action */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            {product.price ? `${product.price.toLocaleString()} ج.م` : 'معاينة وتصميم مجاني'}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:translate-x-[-4px] transition-all"
          >
            <span>عرض التفاصيل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
