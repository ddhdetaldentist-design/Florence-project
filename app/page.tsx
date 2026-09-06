import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products-service';
import { 
  Sparkles, 
  ShieldCheck, 
  Wrench, 
  Ruler, 
  CheckCircle2, 
  ArrowLeft, 
  PhoneCall, 
  MessageCircle, 
  Layers, 
  Cpu, 
  HeartHandshake 
} from 'lucide-react';

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true, status: 'published' });

  return (
    <div className="min-h-screen flex flex-col bg-[#121217]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/1.jpg"
            alt="Florence Kitchen Hero"
            fill
            className="object-cover object-center brightness-40 scale-105 animate-pulse-slow"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/70 to-[#121217]/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-primary/40 text-primary text-sm font-semibold mb-6 shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>شركة فلورنس للمطابخ والديكور الراقي</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            نبتكر الفخامة في كل تفصيلة، <br />
            <span className="text-primary underline decoration-primary/40 underline-offset-8">
              لمطبخ يعيش معك عمراً
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10">
            رواد تصميم وتصنيع المطابخ الحديثة (أكريليك، بولي لاك، HPL) والدريسنج روم والأثاث الفاخر في مصر بخامات أوروبية أصلية وضمان معتمد لمدة 10 سنوات.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-zinc-950 font-bold text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>تصفح كتالوج المشاريع والمنتجات</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/201065772456?text=مرحبا،%20أريد%20طلب%20معاينة%20وتصميم%203D%20لمطبخي"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold text-base border border-zinc-700 hover:border-primary transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>طلب معاينة وتصميم 3D مجاناً</span>
            </a>
          </div>
        </div>

        {/* Floating Quick Badges */}
        <div className="absolute bottom-6 left-0 right-0 z-10 px-4 hidden lg:block">
          <div className="max-w-5xl mx-auto grid grid-cols-4 gap-4">
            <div className="bg-[#181822]/80 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">ضمان 10 سنوات</p>
                <p className="text-zinc-400 text-xs">شامل الخامات والمفصلات</p>
              </div>
            </div>
            <div className="bg-[#181822]/80 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <Ruler className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">تصميم 3D قبل التنفيذ</p>
                <p className="text-zinc-400 text-xs">شاهد مطبخك قبل أن يُصنع</p>
              </div>
            </div>
            <div className="bg-[#181822]/80 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <Layers className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">خامات أوروبية 100%</p>
                <p className="text-zinc-400 text-xs">أكريليك، بولي لاك، كوريان</p>
              </div>
            </div>
            <div className="bg-[#181822]/80 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <HeartHandshake className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">التزام بالمواعيد</p>
                <p className="text-zinc-400 text-xs">تسليم وتركيب بدقة تامة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products / Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>إبداعات فلورنس للمطابخ والأثاث</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              أحدث المنتجات والمشاريع المنفذة
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary hover:text-primary-hover font-bold transition-colors"
          >
            <span>مشاهدة كافة الأعمال والكتالوج</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Showcase Banner */}
      <section className="py-16 bg-[#16161f] border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              ماذا نقدم في فلورنس كيتشن؟
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              حلول متكاملة للمنزل العصري تجمع بين الأناقة والوظيفة العملية، مصنعة بأحدث ماكينات الـ CNC الإيطالية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/products?category=kitchens"
              className="group relative h-72 rounded-2xl overflow-hidden border border-zinc-800 hover:border-primary transition-all duration-300 flex flex-col justify-end p-6"
            >
              <Image
                src="/img/1.jpg"
                alt="مطابخ حديثة"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-50 group-hover:brightness-60"
              />
              <div className="relative z-10">
                <span className="text-xs font-bold text-primary bg-zinc-900/80 px-2.5 py-1 rounded-md mb-2 inline-block">
                  أعلى طلب
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  مطابخ مودرن وكلاسيك
                </h3>
                <p className="text-xs text-zinc-300 mt-1">أكريليك، بولي لاك، HPL، خشب طبيعي</p>
              </div>
            </Link>

            <Link
              href="/products?category=dressing-rooms"
              className="group relative h-72 rounded-2xl overflow-hidden border border-zinc-800 hover:border-primary transition-all duration-300 flex flex-col justify-end p-6"
            >
              <Image
                src="/img/3.jpg"
                alt="دريسنج روم"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-50 group-hover:brightness-60"
              />
              <div className="relative z-10">
                <span className="text-xs font-bold text-primary bg-zinc-900/80 px-2.5 py-1 rounded-md mb-2 inline-block">
                  تنظيم ذكي
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  غرف ملابس (Dressing)
                </h3>
                <p className="text-xs text-zinc-300 mt-1">تقسيمات ذكية وإضاءات ليد مسنفرة</p>
              </div>
            </Link>

            <Link
              href="/products?category=living-rooms"
              className="group relative h-72 rounded-2xl overflow-hidden border border-zinc-800 hover:border-primary transition-all duration-300 flex flex-col justify-end p-6"
            >
              <Image
                src="/img/img-6.jpg"
                alt="وحدات تلفزيون وليفنج"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-50 group-hover:brightness-60"
              />
              <div className="relative z-10">
                <span className="text-xs font-bold text-primary bg-zinc-900/80 px-2.5 py-1 rounded-md mb-2 inline-block">
                  ديكور عصري
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  وحدات تلفزيون وديكور
                </h3>
                <p className="text-xs text-zinc-300 mt-1">بديل رخام وبديل خشب مضيء</p>
              </div>
            </Link>

            <Link
              href="/products?category=furniture"
              className="group relative h-72 rounded-2xl overflow-hidden border border-zinc-800 hover:border-primary transition-all duration-300 flex flex-col justify-end p-6"
            >
              <Image
                src="/img/portfolio-4.jpg"
                alt="أثاث مخصص"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-50 group-hover:brightness-60"
              />
              <div className="relative z-10">
                <span className="text-xs font-bold text-primary bg-zinc-900/80 px-2.5 py-1 rounded-md mb-2 inline-block">
                  تفصيل كامل
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  أثاث وغرف نوم مخصصة
                </h3>
                <p className="text-xs text-zinc-300 mt-1">حسب المقاس والمساحة المتاحة</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Florence Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[480px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <Image
              src="/img/2.jpg"
              alt="Florence Kitchen Craftsmanship"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 right-6 bg-[#181822]/95 border border-primary/30 backdrop-blur-md p-6 rounded-2xl max-w-xs shadow-2xl">
              <span className="text-3xl font-extrabold text-primary block mb-1">10 سنوات</span>
              <p className="text-sm font-bold text-white">ضمان فعلي على جميع منتجاتنا ومشاريعنا</p>
              <p className="text-xs text-zinc-400 mt-1">صيانة دورية وخدمة ما بعد البيع</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>لماذا تختار فلورنس؟</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              أعلى معايير الجودة الألمانية والإيطالية في قلب بيتك
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              في فلورنس، نحن لا نبيع مجرد وحدات مطبخ، بل نخلق تجربة مريحة ومبتكرة لربة المنزل تدوم لسنوات. نعتمد على أدق معايير هندسة المساحات واستغلال كل ركن، مع إكسسوارات بلوم النمساوية الأصلية Soft-Close.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">معاينة ورفع مقاسات دقيقة</h4>
                  <p className="text-zinc-400 text-sm">يقوم مهندسونا بزيارة موقعك ورفع المقاسات بالليزر لضمان مطابقة 100%.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">تصنيع متطور بالـ CNC</h4>
                  <p className="text-zinc-400 text-sm">قطع وتقفيل حواف بأحدث خطوط الإنتاج المقاومة تماماً للماء والرطوبة والحرارة.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">خدمة عملاء ودعم مستمر</h4>
                  <p className="text-zinc-400 text-sm">فريق دعم فني وصيانة متاح دائماً لخدمتك بعد التركيب والتسليم.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry / Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#16161f] to-[#121217] border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">
            دعنا نبدأ في تصميم مطبخ أحلامك
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            جاهز لتحويل منزلك إلى تحفة فنية؟
          </h2>
          <p className="text-zinc-300 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            تواصل معنا الآن مباشرة واحجز موعداً للمعاينة المجانية واستلم تصميم 3D مخصص لمنزلك قبل اتخاذ أي قرار.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:01065772456"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-5 h-5" />
              <span>اتصل بنا: 0106 577 2456</span>
            </a>

            <a
              href="https://wa.me/201065772456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل عبر الواتساب مباشرة</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
