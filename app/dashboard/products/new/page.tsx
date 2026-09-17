'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createProduct, uploadProductImage } from '@/lib/products-service';
import { ProductFormData } from '@/types';
import { generateSlug } from '@/lib/utils';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Wrench, 
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
  const [accessories, setAccessories] = useState('Austrian Blum Soft-Close Hinges & Runners');
  const [countertop, setCountertop] = useState('');
  const [lighting, setLighting] = useState('Concealed Warm LED Profile');
  const [warranty, setWarranty] = useState('10-Year Certified Warranty');
  const [location, setLocation] = useState('Cairo, Egypt');
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
      } else {
        console.warn('Image upload failed, fallback URL used', res.error);
        const fallbackUrl = URL.createObjectURL(file);
        newUrls.push(fallbackUrl);
      }
    }

    setImages((prev) => {
      const updated = [...prev, ...newUrls];
      if (!thumbnail && updated.length > 0) {
        setThumbnail(updated[0]);
      }
      return updated;
    });

    setUploading(false);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => {
      const removedUrl = prev[indexToRemove];
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (thumbnail === removedUrl) {
        setThumbnail(updated[0] || '');
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please provide a project title');
      return;
    }

    setSaving(true);
    setError(null);

    const formData: ProductFormData = {
      title,
      slug: slug || generateSlug(title),
      category,
      description,
      price: price ? parseFloat(price) : null,
      featured,
      status,
      thumbnail: thumbnail || images[0] || '/img/1.jpg',
      images: images.length > 0 ? images : ['/img/1.jpg'],
      specs: {
        material: material || undefined,
        accessories: accessories || undefined,
        countertop: countertop || undefined,
        lighting: lighting || undefined,
        warranty: warranty || undefined,
        location: location || undefined,
        color: color || undefined,
      },
    };

    const res = await createProduct(formData);

    if (res.product) {
      router.push('/dashboard/products');
      router.refresh();
    } else {
      setError(res.error || 'Failed to save project');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Add New Product / Project</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Fill in the specifications and upload photos to showcase your craftsmanship.
          </p>
        </div>

        <Link
          href="/dashboard/products"
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
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
            <span>Basic Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Modern Acrylic Kitchen - Matte Grey"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="modern-acrylic-kitchen"
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-zinc-300 text-xs rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              >
                <option value="kitchens">Modern & Classic Kitchens</option>
                <option value="dressing-rooms">Dressing Rooms</option>
                <option value="living-rooms">Living & TV Units</option>
                <option value="bedrooms">Bedrooms</option>
                <option value="furniture">Bespoke Furniture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none"
              >
                <option value="published">Published Live</option>
                <option value="draft">Save as Draft</option>
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
                <span>Show on Homepage (Featured)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Description & Craftsmanship Details *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe materials, internal organization, and unique design features..."
              className="w-full bg-[#121217] border border-zinc-700 focus:border-primary text-white text-xs rounded-xl p-3 outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Photo Uploads */}
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-primary" />
              <span>Project Photos & Showcase Gallery</span>
            </h2>
            <span className="text-xs text-zinc-400">{images.length} photos</span>
          </div>

          {/* Upload Area */}
          <label className="border-2 border-dashed border-zinc-700 hover:border-primary rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#121217]/50 group">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
            <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-primary/20 text-zinc-400 group-hover:text-primary flex items-center justify-center transition-colors mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-zinc-300">
              {uploading ? 'Uploading images...' : 'Click or drop photos here'}
            </p>
            <p className="text-xs text-zinc-500">Supports JPG, PNG, WEBP</p>
          </label>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative group rounded-xl overflow-hidden border-2 aspect-video bg-zinc-900 ${
                    thumbnail === img ? 'border-primary' : 'border-zinc-800'
                  }`}
                >
                  <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="p-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-500"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setThumbnail(img)}
                      className="p-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-white hover:bg-zinc-700"
                      title="Set as Main Cover"
                    >
                      ★
                    </button>
                  </div>
                  {thumbnail === img && (
                    <span className="absolute bottom-1 left-1 bg-primary text-zinc-950 text-[10px] font-black px-1.5 py-0.5 rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Technical Specifications */}
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Wrench className="w-4 h-4 text-primary" />
            <span>Technical Specifications</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Primary Material
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. High-Gloss Turkish Acrylic"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Fittings & Movement Hardware
              </label>
              <input
                type="text"
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
                placeholder="e.g. Austrian Blum Soft-Close"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Countertop / Top Surface
              </label>
              <input
                type="text"
                value={countertop}
                onChange={(e) => setCountertop(e.target.value)}
                placeholder="e.g. Carrara Natural Marble"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Lighting System
              </label>
              <input
                type="text"
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                placeholder="e.g. Motion Sensor Profile LED"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Color & Finish
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Royal White & Natural Oak"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Warranty Period
              </label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="e.g. 10-Year Certified Warranty"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/dashboard/products"
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{saving ? 'Publishing Project...' : 'Publish Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
