'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Globe, 
  LogOut, 
  Sparkles, 
  Menu,
  X
} from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { name: 'نظرة عامة', href: '/dashboard', icon: LayoutDashboard },
    { name: 'إدارة المنتجات والأعمال', href: '/dashboard/products', icon: Package },
    { name: 'إضافة منتج جديد', href: '/dashboard/products/new', icon: PlusCircle },
  ];

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push('/login');
  };

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href !== '/dashboard' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#0e0e12] flex flex-col md:flex-row text-zinc-200">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-[#14141c] border-l border-zinc-800 p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/dashboard" className="block relative h-14 w-40">
            <Image
              src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
              alt="Florence Kitchen"
              fill
              className="object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-3 px-3">
              لوحة الإدارة
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-primary text-zinc-950 shadow-lg shadow-primary/20 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-zinc-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span>عرض الموقع المباشر</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-[#14141c] border-b border-zinc-800 p-4 flex items-center justify-between">
        <Link href="/dashboard" className="relative h-10 w-28">
          <Image
            src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
            alt="Florence Kitchen"
            fill
            className="object-contain"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-zinc-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#14141c] border-b border-zinc-800 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                  active ? 'bg-primary text-zinc-950 font-bold' : 'text-zinc-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-xs text-zinc-400"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span>عرض الموقع المباشر</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar inside content */}
        <header className="bg-[#121217]/80 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">إدارة شركة فلورنس كيتشن</span>
            <span className="text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-semibold">
              Admin
            </span>
          </div>

          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة منتج / مشروع جديد</span>
          </Link>
        </header>

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
