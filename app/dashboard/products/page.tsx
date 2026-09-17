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
      alert('Error during deletion: ' + res.error);
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
          <h1 className="text-2xl font-black text-white">Manage Products & Projects</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Complete control over all projects displayed in the Florence online catalog.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#181822] p-4 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121217] border border-zinc-700 text-white rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-primary placeholder:text-zinc-500"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['all', 'published', 'draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {st === 'all' ? 'All' : st === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table / Cards */}
      <div className="bg-[#181822] rounded-2xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-400 text-sm">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading products...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 text-sm space-y-3">
            <Layers className="w-10 h-10 mx-auto text-zinc-600" />
            <p className="font-semibold text-white">No projects found</p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              No products match your current filters. Add a new project or reset your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#14141c] text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="relative h-12 w-14 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-700/50">
                        <Image
                          src={item.thumbnail || '/img/1.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{item.slug}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-zinc-800 text-primary font-medium text-[11px]">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          item.status === 'published'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'published' ? 'bg-green-400' : 'bg-amber-400'
                          }`}
                        />
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {new Date(item.created_at).toLocaleDateString('en-US')}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/dashboard/products/${item.id}/edit`}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-primary hover:text-zinc-950 text-zinc-300 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Delete"
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
          <div className="bg-[#181822] border border-zinc-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Delete Project</h3>
              <p className="text-xs text-zinc-400">
                Are you sure you want to permanently delete this project? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
