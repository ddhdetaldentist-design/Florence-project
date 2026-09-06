import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/products-service';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  Database, 
  PlusCircle, 
  ArrowRight, 
  ExternalLink,
  Edit,
  Sparkles
} from 'lucide-react';

export const revalidate = 0; // Fresh data on each load

export default async function DashboardOverviewPage() {
  const products = await getProducts({ status: 'all' });
  const publishedCount = products.filter((p) => p.status === 'published').length;
  const draftCount = products.filter((p) => p.status === 'draft').length;
  const isLiveSupabase = isSupabaseConfigured();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1b1b26] to-[#14141c] p-6 rounded-3xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">
            Welcome to Florence Kitchen Dashboard 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Add, update, and manage your kitchens, dressing rooms, and bespoke projects in real time.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover text-zinc-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shrink-0 transition-transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Total Projects</p>
            <p className="text-3xl font-extrabold text-white mt-1">{products.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Published Items</p>
            <p className="text-3xl font-extrabold text-green-400 mt-1">{publishedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Drafts</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">{draftCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Database Status</p>
            <p className="text-sm font-bold text-white mt-2 flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveSupabase ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isLiveSupabase ? 'Supabase Connected' : 'Local Storage Mode'}</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Products List */}
      <div className="bg-[#181822] rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-white">Recent Projects</h2>
          </div>
          <Link
            href="/dashboard/products"
            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <span>View & Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-800/60">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-16 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-700/50">
                  <Image
                    src={product.thumbnail || '/img/1.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{product.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <span className="text-primary">{product.category}</span>
                    <span>•</span>
                    <span className={product.status === 'published' ? 'text-green-400' : 'text-amber-400'}>
                      {product.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span>•</span>
                    <span>{new Date(product.created_at).toLocaleDateString('en-US')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/products/${product.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  title="View Live"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href={`/dashboard/products/${product.id}/edit`}
                  className="p-2 rounded-lg bg-zinc-800/80 hover:bg-primary hover:text-zinc-950 text-zinc-300 transition-colors"
                  title="Edit Project"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
