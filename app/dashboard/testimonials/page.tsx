'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '@/lib/site-settings-service';
import { uploadProductImage } from '@/lib/products-service';
import { TestimonialItem } from '@/types';
import { 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  X, 
  AlertCircle 
} from 'lucide-react';

export default function TestimonialsManagementPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState('/img/1-1.jpg');
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setTitle('Verified Client - Modern Kitchen');
    setText('');
    setRating(5);
    setImage('/img/1-1.jpg');
    setIsModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name);
    setTitle(item.title);
    setText(item.text);
    setRating(item.rating);
    setImage(item.image);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);
    try {
      const res = await uploadProductImage(file);
      if (res.url) {
        setImage(res.url);
      } else {
        setError('Image upload failed: ' + res.error);
      }
    } catch (err: any) {
      setError('Upload error: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError('Please provide client name and review text');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editingItem) {
        const res = await updateTestimonial(editingItem.id, {
          name,
          title,
          text,
          rating,
          image,
        });
        if (res.item) {
          setItems((prev) => prev.map((t) => (t.id === editingItem.id ? res.item! : t)));
          setIsModalOpen(false);
        } else {
          setError(res.error || 'Update failed');
        }
      } else {
        const res = await createTestimonial({
          name,
          title,
          text,
          rating,
          image,
        });
        if (res.item) {
          setItems((prev) => [res.item!, ...prev]);
          setIsModalOpen(false);
        } else {
          setError(res.error || 'Creation failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    const res = await deleteTestimonial(id);
    if (res.success) {
      setItems((prev) => prev.filter((t) => t.id !== id));
    } else {
      alert('Delete failed: ' + res.error);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Client Testimonials & Reviews</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Showcase verified client feedback and 5-star ratings on the homepage.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Reviews Grid */}
      {loading ? (
        <div className="p-12 text-center text-zinc-400 text-sm">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading reviews...
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center text-zinc-400 text-xs bg-[#181822] rounded-2xl border border-zinc-800">
          No testimonials found. Click &quot;Add New Testimonial&quot; to add your first client review.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-[#181822] p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-primary hover:text-zinc-950 text-zinc-300 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  &quot;{item.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-primary/40 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[10px] text-zinc-400">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181822] border border-zinc-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Testimonial' : 'Add Client Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Afaf Abdelmoneam"
                    className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Client Role / Project Type</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Verified Client - Acrylic Kitchen"
                    className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Photo and Star Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0">
                    <Image src={image} alt="Client avatar" fill className="object-cover" />
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <span className="text-[11px] text-primary hover:underline font-semibold block">
                      {uploadingImage ? 'Uploading...' : 'Upload Client Photo'}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-primary focus:outline-none"
                      >
                        <Star className={`w-5 h-5 ${star <= rating ? 'fill-primary' : 'text-zinc-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Review Text *</label>
                <textarea
                  rows={4}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share what the client said about materials, punctuality, and quality..."
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 text-xs font-bold shadow-lg shadow-primary/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
