'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createProduct, uploadProductImage } from '@/lib/products-service';
import { ProductFormData } from '@/types';
import { generateSlug } from '@/lib/utils';
import { 
  ArrowRight, 
  Upload, 
  X, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Layers,
  ImagePlus
} from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('kitchens');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft'>('published');

  // Specs
  const [material, setMaterial] = useState('');
  const [accessories, setAccessories] = useState('مفصلات ومجاري بلوم نمساوي Soft-Close');
  const [countertop, setCountertop] = useState('');
  const [lighting, setLighting] = useState('شريط LED Profile مخفي');
  const [warranty, setWarranty] = useState('ضمان شامل 10 سنوات');
  const [location, setLocation] = useState('القاهرة');
  const [color, setColor] = useState('');

  // Images state
  const [images, setImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  // Handle uploading files
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await uploadProductImage(file);
      if (res.url) {
        newUrls.push(res.url);
      } else if (res.error) {
        setError('تعذر رفع بعض الصور: ' + res.error);
      }
    }

    if (newUrls.length > 0) {
      setImages((prev) => [...prev, ...newUrls]);
      if (!thumbnail) {
        setThumbnail(newUrls[0]);
      }
    }

    setUploading(false);
  };

  const removeImage = (urlToRemove: string) => {
    const nextImages = images.filter((img) => img !== urlToRemove);
    setImages(nextImages);
    if (thumbnail === urlToRemove) {
      setThumbnail(nextImages[0] || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('يرجى كتابة عنوان أو اسم المنتج');
      return;
    }

    const currentThumbnail = thumbnail || images[0] || '/img/1.jpg';
    const currentImages = images.length > 0 ? images : [currentThumbnail];

    const productPayload: ProductFormData = {
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      category,
      description: description.trim(),
      thumbnail: currentThumbnail,
      images: currentImages,
      price: price ? parseFloat(price) : null,
      featured,
      status,
      specs: {
        material: material.trim(),
        accessories: accessories.trim(),
        countertop: countertop.trim(),
        lighting: lighting.trim(),
        warranty: warranty.trim(),
        location: location.trim(),
        color: color.trim(),
      },
    };

    setSaving(true);
    const res = await createProduct(productPayload);
    setSaving(false);

    if (res.product) {
      router.push('/dashboard/products');
      router.refresh();
    } else {
      setError(res.error || 'حدث خطأ أثناء حفظ المنتج');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">إضافة منتج أو مشروع جديد</h1>
          <p className="text-xs text-zinc-400 mt-1">
            أضف عملاً جديداً إلى معرض ومشاريع فلورنس مع الصور والمواصفات الفنية.
          </p>
        </div>

        <Link
          href="/dashboard/products"
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>رجوع للمنتجات</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-4 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Layers className="w-4 h-4 text-primary" />
            <span>المعلومات الأساسية للمنتج</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                اسم المنتج / العمل *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="مثال: مطبخ أكريليك تركي رمادي مودرن"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                رابط الـ URL (Slug)
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="modern-acrylic-kitchen"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-zinc-300 text-xs rounded-xl p-3 outline-none"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                التصنيف *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              >
                <option value="kitchens">مطابخ مودرن وكلاسيك</option>
                <option value="dressing-rooms">غرف ملابس (Dressing Rooms)</option>
                <option value="living-rooms">وحدات تلفزيون وغرف معيشة</option>
                <option value="bedrooms">غرف نوم</option>
                <option value="furniture">أثاث مخصص</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                حالة النشر
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              >
                <option value="published">منشور في الموقع الآن</option>
                <option value="draft">حفظ كمسودة فقط</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <span>عرض في الصفحة الرئيسية (عمل مميز)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              الوصف والشرح التفصيلي *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب نبذة عن فكرة التصميم، استغلال المساحات، المميزات، ونوع الخامات المستخدمة..."
              className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Photo Uploader (Supabase Storage) */}
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-primary" />
              <span>صور المنتج والمشروع (Supabase Storage)</span>
            </h2>
            <span className="text-xs text-zinc-400">
              {images.length} صور مضافة
            </span>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-zinc-700 hover:border-primary rounded-2xl p-6 text-center cursor-pointer transition-colors relative bg-[#121217]/50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <Upload className="w-8 h-8 text-primary mx-auto animate-bounce" />
              <p className="text-sm font-bold text-white">
                {uploading ? 'جاري رفع الصور إلى Supabase Storage...' : 'اسحب الصور وأفلتها هنا، أو اضغط للتصفح'}
              </p>
              <p className="text-xs text-zinc-500">
                يدعم JPG, PNG, WEBP بجودة عالية
              </p>
            </div>
          </div>

          {/* Uploaded Images Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative h-28 rounded-xl overflow-hidden border-2 bg-zinc-900 group ${
                    thumbnail === img ? 'border-primary' : 'border-zinc-800'
                  }`}
                >
                  <Image src={img} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                  
                  {/* Delete overlay button */}
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute top-1.5 left-1.5 p-1 bg-red-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="حذف الصورة"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Set as thumbnail button */}
                  <button
                    type="button"
                    onClick={() => setThumbnail(img)}
                    className={`absolute bottom-1.5 right-1.5 text-[10px] px-2 py-0.5 rounded font-bold ${
                      thumbnail === img
                        ? 'bg-primary text-zinc-950'
                        : 'bg-black/70 text-zinc-300 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {thumbnail === img ? 'الرئيسية' : 'تعيين كرئيسية'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Technical Specifications */}
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>المواصفات الفنية وخامات التنفيذ</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                الخامة الرئيسية
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="مثال: أكريليك تركي عالي اللمعان، بولي لاك، أو خشب زان"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                المفصلات والإكسسوارات
              </label>
              <input
                type="text"
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
                placeholder="مثال: بلوم نمساوي Soft-Close، سلات إيطالية"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                السطح / القرصة
              </label>
              <input
                type="text"
                value={countertop}
                onChange={(e) => setCountertop(e.target.value)}
                placeholder="مثال: كوارتز إسباني، رخام كارارا، أو جرانيت دبل بلاك"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                نظام الإضاءة
              </label>
              <input
                type="text"
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                placeholder="مثال: LED Profile مخفي مع مستشعرات حركة"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                الألوان والتشطيب
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="مثال: رمادي كشمير مع خشب بلوط دافئ"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                مدة الضمان
              </label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="مثال: ضمان شامل 10 سنوات معتمد"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/dashboard/products"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            إلغاء
          </Link>

          <button
            type="submit"
            disabled={saving || uploading}
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-zinc-950 text-xs font-black rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{saving ? 'جاري حفظ العمل...' : 'نشر العمل وحفظ التغييرات'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
