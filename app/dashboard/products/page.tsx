'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, deleteProduct } from '@/lib/products-service';
import { Product } from '@/types';
import { 
  PlusCircle, 
  Search, 
  Trash2, 
  Edit, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle,
  Layers
} from 'lucide-react';

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getProducts({ status: 'all' });
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteProduct(id);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
    } else {
      alert('حدث خطأ أثناء الحذف: ' + res.error);
    }
  };

  const filtered = products.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">إدارة المنتجات والمشاريع</h1>
          <p className="text-xs text-zinc-400 mt-1">
            تحكم كامل في جميع أعمال فلورنس المنشورة في المعرض والكتالوج.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة عمل جديد</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#181822] p-4 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="بحث بالاسم أو التصنيف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121217] border border-zinc-700 text-white rounded-xl py-2 pr-10 pl-4 text-xs outline-none focus:border-primary placeholder:text-zinc-500"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-2.5" />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['all', 'published', 'draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-primary text-zinc-950 font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {st === 'all' ? 'الكل' : st === 'published' ? 'المنشورة' : 'المسودات'}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#181822] rounded-2xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 text-sm">جاري تحميل المنتجات...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">لا توجد منتجات مطابقة</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#14141c] text-zinc-400 border-b border-zinc-800 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">المنتج / المشروع</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4">الصور</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">تاريخ الإضافة</th>
                  <th className="p-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-700/50">
                          <Image
                            src={product.thumbnail || '/img/1.jpg'}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm line-clamp-1">{product.title}</p>
                          <p className="text-zinc-500 text-[11px] line-clamp-1 max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px]">
                        {product.category}
                      </span>
                    </td>

                    <td className="p-4 text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-primary" />
                        <span>{product.images?.length || 1}</span>
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          product.status === 'published'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {product.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>

                    <td className="p-4 text-zinc-400">
                      {new Date(product.created_at).toLocaleDateString('ar-EG')}
                    </td>

                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="عرض في الموقع"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181822] border border-zinc-700 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white mb-1">تأكيد حذف المنتج</h3>
              <p className="text-xs text-zinc-400">
                هل أنت متأكد من رغبتك في حذف هذا العمل؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
