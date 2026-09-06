'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products-service';
import { Product } from '@/types';
import { CATEGORIES } from '@/lib/mock-data';
import { Search, Sparkles, Filter, PackageOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getProducts({ status: 'published' });
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update selectedCategory if query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.specs?.material && p.specs.material.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <>
      {/* Page Header Banner */}
      <section className="relative py-16 bg-[#181822] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معرض الأعمال الحصرية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            كتالوج المنتجات ومشاريع فلورنس
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            استكشف أحدث تصاميم المطابخ المودرن والكلاسيك والدريسنج روم المنفذة بأعلى جودة وإتقان لعملائنا في مصر.
          </p>

          {/* Search Input Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="ابحث عن مطبخ، خامة، أو دريسنج روم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white rounded-full py-3.5 pr-11 pl-4 text-sm outline-none transition-all placeholder:text-zinc-500 shadow-inner"
            />
            <Search className="w-5 h-5 text-zinc-400 absolute right-4 top-3.5" />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary text-zinc-950 shadow-lg shadow-primary/20 scale-105'
                  : 'bg-[#181822] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {category.nameAr}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-primary" />
            <span>عرض: {filteredProducts.length} عمل متاح</span>
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary hover:underline"
            >
              إلغاء البحث
            </button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-[#181822] rounded-2xl h-96 animate-pulse border border-zinc-800"
              />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#181822]/40 rounded-3xl border border-zinc-800 p-8">
            <PackageOpen className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">لم نجد نتائج مطابقة</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              جرّب البحث بكلمات أخرى أو اختر تصنيفاً آخر، أو تواصل معنا لتصميم فكرتك الخاصة مباشرة!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-primary text-zinc-950 font-bold rounded-full text-sm"
            >
              عرض جميع الأعمال
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121217]">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-zinc-500 text-sm">جاري تحميل المعرض...</div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
