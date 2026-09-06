import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121217]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md mx-auto space-y-6">
          <span className="text-6xl sm:text-8xl font-black text-primary block">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            الصفحة غير موجودة
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            عذراً، يبدو أن المنتج أو الصفحة التي تبحث عنها قد تم نقلها أو حذفها. يمكنك العودة لكتالوج المنتجات لاستعراض باقي أعمالنا.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 text-xs font-black transition-colors"
            >
              <span>تصفح الكتالوج</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
