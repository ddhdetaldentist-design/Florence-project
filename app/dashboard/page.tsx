import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/products-service';
import { getInquiries, getTestimonials } from '@/lib/site-settings-service';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  Database, 
  PlusCircle, 
  ArrowRight, 
  ExternalLink,
  Edit,
  Sliders,
  PhoneCall,
  Star,
  MessageSquare,
  Layers
} from 'lucide-react';

export const revalidate = 0; // Fresh data on each load

export default async function DashboardOverviewPage() {
  const [products, inquiries, testimonials] = await Promise.all([
    getProducts({ status: 'all' }),
    getInquiries(),
    getTestimonials(),
  ]);

  const publishedCount = products.filter((p) => p.status === 'published').length;
  const draftCount = products.filter((p) => p.status === 'draft').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;
  const isLiveSupabase = isSupabaseConfigured();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1b1b26] to-[#14141c] p-6 md:p-8 rounded-3xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            <span>Official Admin Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Florence Kitchen & Furniture Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Control everything across your live portfolio: add projects, upload photos, customize hero banners, update contact numbers, and respond to client inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <Link
            href="/dashboard/site-content"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl transition-colors border border-zinc-700"
          >
            <Sliders className="w-4 h-4 text-primary" />
            <span>Edit Website Content</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800/80 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Total Projects</p>
            <p className="text-3xl font-extrabold text-white mt-1">{products.length}</p>
            <p className="text-[11px] text-zinc-500 mt-1">{publishedCount} live, {draftCount} drafts</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800/80 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Client Inquiries</p>
            <p className="text-3xl font-extrabold text-white mt-1">{inquiries.length}</p>
            <p className="text-[11px] text-primary font-bold mt-1">{newInquiriesCount} new uncontacted</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-primary flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800/80 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Customer Reviews</p>
            <p className="text-3xl font-extrabold text-white mt-1">{testimonials.length}</p>
            <p className="text-[11px] text-green-400 font-medium mt-1">100% 5-Star verified</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#181822] p-5 rounded-2xl border border-zinc-800/80 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Database Status</p>
            <p className="text-sm font-bold text-white mt-2 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveSupabase ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isLiveSupabase ? 'Supabase Connected' : 'Local Fallback'}</span>
            </p>
            <Link href="/dashboard/sql-setup" className="text-[11px] text-primary hover:underline block mt-1">
              View Database Schema & SQL
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/dashboard/site-content"
          className="p-4 bg-[#181822] hover:bg-zinc-800/80 border border-zinc-800 rounded-2xl flex items-center gap-3 transition-colors group"
        >
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-zinc-950 transition-colors">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Hero & Sections</div>
            <div className="text-[10px] text-zinc-400">Edit homepage texts</div>
          </div>
        </Link>

        <Link
          href="/dashboard/contact-settings"
          className="p-4 bg-[#181822] hover:bg-zinc-800/80 border border-zinc-800 rounded-2xl flex items-center gap-3 transition-colors group"
        >
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-zinc-950 transition-colors">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Contact & WhatsApp</div>
            <div className="text-[10px] text-zinc-400">Phone & social links</div>
          </div>
        </Link>

        <Link
          href="/dashboard/testimonials"
          className="p-4 bg-[#181822] hover:bg-zinc-800/80 border border-zinc-800 rounded-2xl flex items-center gap-3 transition-colors group"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Client Reviews</div>
            <div className="text-[10px] text-zinc-400">Manage testimonials</div>
          </div>
        </Link>

        <Link
          href="/dashboard/inquiries"
          className="p-4 bg-[#181822] hover:bg-zinc-800/80 border border-zinc-800 rounded-2xl flex items-center gap-3 transition-colors group"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-zinc-950 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Customer Inbox</div>
            <div className="text-[10px] text-zinc-400">Read messages</div>
          </div>
        </Link>
      </div>

      {/* Recent Products List */}
      <div className="bg-[#181822] rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-white">Recent Projects & Catalog Items</h2>
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
          {products.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 text-xs">
              No projects added yet. Click &quot;Add New Project&quot; to start.
            </div>
          ) : (
            products.slice(0, 6).map((product) => (
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
                      <span className="text-primary font-medium">{product.category}</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
