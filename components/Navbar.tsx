'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Menu, X, LayoutDashboard, Sparkles, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'كتالوج المنتجات والمشاريع', href: '/products' },
    { name: 'خدماتنا', href: '/#services' },
    { name: 'من نحن', href: '/#about' },
    { name: 'اتصل بنا', href: '/#contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-2xl">
      {/* Top Bar with Florence Kitchen details */}
      <div className="bg-[#0e0e12] border-b border-zinc-800 text-xs text-zinc-400 py-2.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>مدينة العبور - الحي التاسع - شارع قطر الندى</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <a href="mailto:florencenew2020@gmail.com" className="hover:text-primary transition-colors">
                florencenew2020@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <a href="tel:01065772456" dir="ltr" className="hover:text-primary transition-colors font-semibold">
                0106 577 2456
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/Florencekitchenandfurniture"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>فيسبوك</span>
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href="https://www.instagram.com/florence_new_2020/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>إنستجرام</span>
            </a>
            <span className="text-zinc-700">|</span>
            <Link
              href="/dashboard"
              className="text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>لوحة التحكم</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#181822]/95 backdrop-blur-md border-b border-primary/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-14 w-40">
              <Image
                src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
                alt="Florence Kitchen & Furniture"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 hover:text-primary ${
                  isActive(link.href) ? 'text-primary font-bold' : 'text-zinc-300'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_#DFB163]"></span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/201065772456?text=مرحبا%20فلورنس،%20أود%20الاستفسار%20عن%20تصميم%20مطبخ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-zinc-950 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب معاينة مجانية</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 text-primary hover:bg-zinc-800 rounded-lg"
              title="لوحة التحكم"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-zinc-800 space-y-2 pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 px-3">
              <a
                href="https://wa.me/201065772456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-zinc-950 font-bold py-2.5 rounded-lg shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل عبر الواتساب</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
