'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  Globe, 
  LogOut, 
  Menu,
  X,
  Sliders,
  PhoneCall,
  Star,
  Users,
  MessageSquare,
  ImagePlus,
  Database
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

  const navSections = [
    {
      title: 'Catalog & Works',
      items: [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Products & Projects', href: '/dashboard/products', icon: FolderKanban },
        { name: 'Add New Project', href: '/dashboard/products/new', icon: PlusCircle },
        { name: 'Media Library', href: '/dashboard/media', icon: ImagePlus },
      ],
    },
    {
      title: 'Website Customization',
      items: [
        { name: 'Site Content & Sections', href: '/dashboard/site-content', icon: Sliders },
        { name: 'Contact & Social Info', href: '/dashboard/contact-settings', icon: PhoneCall },
        { name: 'Client Testimonials', href: '/dashboard/testimonials', icon: Star },
        { name: 'Team Members', href: '/dashboard/team', icon: Users },
      ],
    },
    {
      title: 'Messages & System',
      items: [
        { name: 'Client Inquiries', href: '/dashboard/inquiries', icon: MessageSquare },
        { name: 'Database SQL Setup', href: '/dashboard/sql-setup', icon: Database },
      ],
    },
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
      <aside className="w-64 bg-[#14141c] border-r border-zinc-800/80 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Logo */}
          <Link href="/dashboard" className="block relative h-12 w-36">
            <Image
              src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
              alt="Florence Kitchen"
              fill
              className="object-contain"
            />
          </Link>

          {/* Navigation Groups */}
          <div className="space-y-5">
            {navSections.map((sec, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3">
                  {sec.title}
                </div>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-primary text-zinc-950 shadow-md shadow-primary/20 font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Topbar for Mobile */}
      <div className="md:hidden bg-[#14141c] border-b border-zinc-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/dashboard" className="block relative h-9 w-28">
          <Image
            src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
            alt="Florence Kitchen"
            fill
            className="object-contain"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-zinc-800 text-zinc-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#14141c] border-b border-zinc-800 p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-2">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                      active ? 'bg-primary text-zinc-950 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-xs">
            <Link href="/" target="_blank" className="text-zinc-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" /> View Site
            </Link>
            <button onClick={handleLogout} className="text-red-400 flex items-center gap-1.5">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Banner */}
        <header className="h-16 border-b border-zinc-800/80 bg-[#111117] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-zinc-300">
              Florence Kitchen & Furniture Admin Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/products/new"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
