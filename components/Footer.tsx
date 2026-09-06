import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, ShieldCheck, Clock, Award, ArrowUpLeft } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0f] text-zinc-400 border-t border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="relative h-14 w-44">
              <Image
                src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
                alt="Florence Kitchen Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              شركة فلورنس للمطابخ والدريسنج روم والأثاث المودرن. نبتكر تصاميم فريدة وعصرية تناسب ذوقك وتلبي احتياجات منزلك مع ضمان معتمد لمدة 10 سنوات على جميع الأعمال.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/Florencekitchenandfurniture"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-primary hover:border-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/florence_new_2020/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-primary hover:border-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>روابط سريعة</span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>الصفحة الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>معرض المنتجات والمشاريع</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>خدمات التصميم والتركيب</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>عن فلورنس كيتشن</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-primary/90 hover:text-primary font-semibold transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>لوحة تحكم الإدارة</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>تخصصاتنا</span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products?category=kitchens" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>مطابخ أكريليك وبولي لاك</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=kitchens" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>مطابخ كلاسيك وخشب زان</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=dressing-rooms" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>غرف ملابس (Dressing Rooms)</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=living-rooms" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>وحدات تلفزيون وليفنج روم</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=furniture" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-primary" />
                  <span>أثاث مخصص للمنازل والفيلات</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>تواصل مع الفرع الرئيسي</span>
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>مدينة العبور - الحي التاسع - شارع قطر الندى، القاهرة</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:01065772456" dir="ltr" className="hover:text-primary font-bold text-white transition-colors">
                  0106 577 2456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:florencenew2020@gmail.com" className="hover:text-primary transition-colors">
                  florencenew2020@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>يومياً من 11 صباحاً حتى 10 مساءً</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>
            © {new Date().getFullYear()} فلورنس للمطابخ والأثاث (Florence Kitchen). تم التطوير بواسطة{' '}
            <a
              href="https://www.linkedin.com/in/hassan-samhan-194889247/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-bold"
            >
              Hassan Samhan
            </a>
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>ضمان 10 سنوات معتمد</span>
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-primary" />
              <span>خامات أوروبية أصلية 100%</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
