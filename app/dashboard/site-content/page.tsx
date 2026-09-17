'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getSiteSettings, updateSiteSettings } from '@/lib/site-settings-service';
import { uploadProductImage } from '@/lib/products-service';
import { SiteSettings, HeroSlide } from '@/types';
import { 
  Sliders, 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle,
  Film,
  Building,
  Layers,
  Palette,
  Info
} from 'lucide-react';

export default function SiteContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'offerings' | 'whyUs'>('hero');
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Uploading state
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (err: any) {
        setError('Failed to load settings: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const res = await updateSiteSettings(settings);
      if (res.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        setError(res.error || 'Failed to save settings');
      }
    } catch (err: any) {
      setError(err.message || 'Save error');
    } finally {
      setSaving(false);
    }
  };

  // Generic image upload handler for any setting property
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetCallback: (url: string) => void, fieldKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldKey);
    try {
      const res = await uploadProductImage(file);
      if (res.url) {
        targetCallback(res.url);
      } else {
        setError('Upload failed: ' + res.error);
      }
    } catch (err: any) {
      setError('Upload error: ' + err.message);
    } finally {
      setUploadingField(null);
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-12 text-center text-zinc-400 text-sm">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        Loading website configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Website Content & Sections</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Customize the live homepage: Hero Carousel, About Story, Offerings, and Why Choose Us video.
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Website content updated successfully! Changes are immediately live.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'hero' ? 'bg-primary text-zinc-950' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          1. Hero Carousel (السلايدر)
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'about' ? 'bg-primary text-zinc-950' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          2. About Us & Stats (من نحن)
        </button>
        <button
          onClick={() => setActiveTab('offerings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'offerings' ? 'bg-primary text-zinc-950' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          3. What We Offer (ما نقدمه)
        </button>
        <button
          onClick={() => setActiveTab('whyUs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'whyUs' ? 'bg-primary text-zinc-950' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          4. Why Choose Us & Video (لماذا تختارنا والفيديو)
        </button>
      </div>

      {/* Tab 1: Hero Carousel */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Hero Slider Slides ({settings.heroSlides.length})</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                const newSlide: HeroSlide = {
                  id: `slide-${Date.now()}`,
                  image: '/img/1.jpg',
                  badge: 'FLORENCE KITCHEN',
                  subtitle: 'Premium Craftsmanship',
                  title: 'New Luxury Showcase',
                  desc: 'Handcrafted with European Blum hardware and certified 10-year warranty.',
                  btnText: 'Explore Our Projects',
                  btnLink: '/products',
                  waBtnText: 'Book Free Consultation',
                };
                setSettings({
                  ...settings,
                  heroSlides: [...settings.heroSlides, newSlide],
                });
              }}
              className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slide</span>
            </button>
          </div>

          <div className="space-y-6">
            {settings.heroSlides.map((slide, idx) => (
              <div key={slide.id || idx} className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Slide #{idx + 1}
                  </span>
                  {settings.heroSlides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          heroSlides: settings.heroSlides.filter((_, i) => i !== idx),
                        });
                      }}
                      className="text-zinc-500 hover:text-red-400 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Slide</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  {/* Slide Image Preview & Upload */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300">Background Image</label>
                    <div className="relative h-44 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700">
                      <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                    </div>
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            (url) => {
                              const updated = [...settings.heroSlides];
                              updated[idx].image = url;
                              setSettings({ ...settings, heroSlides: updated });
                            },
                            `slide-${idx}`
                          )
                        }
                      />
                      <div className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 flex items-center justify-center gap-2 transition-colors border border-zinc-700">
                        <Upload className="w-3.5 h-3.5 text-primary" />
                        <span>{uploadingField === `slide-${idx}` ? 'Uploading...' : 'Replace Slide Image'}</span>
                      </div>
                    </label>
                  </div>

                  {/* Slide Details */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Badge</label>
                        <input
                          type="text"
                          value={slide.badge}
                          onChange={(e) => {
                            const updated = [...settings.heroSlides];
                            updated[idx].badge = e.target.value;
                            setSettings({ ...settings, heroSlides: updated });
                          }}
                          className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={slide.subtitle}
                          onChange={(e) => {
                            const updated = [...settings.heroSlides];
                            updated[idx].subtitle = e.target.value;
                            setSettings({ ...settings, heroSlides: updated });
                          }}
                          className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Slide Title (Main Heading)</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const updated = [...settings.heroSlides];
                          updated[idx].title = e.target.value;
                          setSettings({ ...settings, heroSlides: updated });
                        }}
                        className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Slide Description</label>
                      <textarea
                        rows={2}
                        value={slide.desc}
                        onChange={(e) => {
                          const updated = [...settings.heroSlides];
                          updated[idx].desc = e.target.value;
                          setSettings({ ...settings, heroSlides: updated });
                        }}
                        className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Primary Button Text</label>
                        <input
                          type="text"
                          value={slide.btnText || ''}
                          onChange={(e) => {
                            const updated = [...settings.heroSlides];
                            updated[idx].btnText = e.target.value;
                            setSettings({ ...settings, heroSlides: updated });
                          }}
                          className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">WhatsApp Button Text</label>
                        <input
                          type="text"
                          value={slide.waBtnText || ''}
                          onChange={(e) => {
                            const updated = [...settings.heroSlides];
                            updated[idx].waBtnText = e.target.value;
                            setSettings({ ...settings, heroSlides: updated });
                          }}
                          className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: About Us & Stats */}
      {activeTab === 'about' && (
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Building className="w-4 h-4 text-primary" />
            <span>About Us Section & Experience Counter</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Years of Experience</label>
              <input
                type="text"
                value={settings.about.yearsExperience}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, yearsExperience: e.target.value },
                  })
                }
                placeholder="40+"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary font-bold text-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Experience Subtitle</label>
              <input
                type="text"
                value={settings.about.experienceSubtitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, experienceSubtitle: e.target.value },
                  })
                }
                placeholder="Years Experience"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Badge Text</label>
              <input
                type="text"
                value={settings.about.experienceBadge}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, experienceBadge: e.target.value },
                  })
                }
                placeholder="Learn About Us"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Main Section Heading</label>
            <input
              type="text"
              value={settings.about.title}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  about: { ...settings.about, title: e.target.value },
                })
              }
              className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">About Us Description</label>
            <textarea
              rows={4}
              value={settings.about.description}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  about: { ...settings.about, description: e.target.value },
                })
              }
              className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary leading-relaxed"
            />
          </div>

          {/* 4 Pillars */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <label className="block text-xs font-bold text-white">4 Core Pillars & Features</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.about.pillars.map((pillar, idx) => (
                <div key={idx} className="p-3.5 bg-[#121217] rounded-xl border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-bold text-primary">Pillar #{idx + 1}</span>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => {
                      const updated = [...settings.about.pillars];
                      updated[idx].title = e.target.value;
                      setSettings({
                        ...settings,
                        about: { ...settings.about, pillars: updated },
                      });
                    }}
                    placeholder="Title"
                    className="w-full bg-[#181822] border border-zinc-700 text-white text-xs rounded-lg p-2 outline-none focus:border-primary font-semibold"
                  />
                  <input
                    type="text"
                    value={pillar.subtitle}
                    onChange={(e) => {
                      const updated = [...settings.about.pillars];
                      updated[idx].subtitle = e.target.value;
                      setSettings({
                        ...settings,
                        about: { ...settings.about, pillars: updated },
                      });
                    }}
                    placeholder="Subtitle"
                    className="w-full bg-[#181822] border border-zinc-700 text-zinc-300 text-xs rounded-lg p-2 outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: What We Offer */}
      {activeTab === 'offerings' && (
        <div className="space-y-6">
          <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
              <Layers className="w-4 h-4 text-primary" />
              <span>Section Titles</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Section Badge</label>
                <input
                  type="text"
                  value={settings.offerings.badge}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      offerings: { ...settings.offerings, badge: e.target.value },
                    })
                  }
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Main Title</label>
                <input
                  type="text"
                  value={settings.offerings.title}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      offerings: { ...settings.offerings, title: e.target.value },
                    })
                  }
                  className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Section Subtitle / Description</label>
              <textarea
                rows={2}
                value={settings.offerings.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    offerings: { ...settings.offerings, description: e.target.value },
                  })
                }
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settings.offerings.items.map((item, idx) => (
              <div key={item.id || idx} className="bg-[#181822] p-5 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-xs font-bold text-primary">Card #{idx + 1}</span>
                  <span className="text-[10px] text-zinc-500 uppercase">{item.badge}</span>
                </div>

                <div className="flex gap-4">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            (url) => {
                              const updated = [...settings.offerings.items];
                              updated[idx].image = url;
                              setSettings({
                                ...settings,
                                offerings: { ...settings.offerings, items: updated },
                              });
                            },
                            `offer-${idx}`
                          )
                        }
                      />
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary hover:underline">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingField === `offer-${idx}` ? 'Uploading...' : 'Change Photo'}</span>
                      </div>
                    </label>

                    <input
                      type="text"
                      value={item.badge}
                      onChange={(e) => {
                        const updated = [...settings.offerings.items];
                        updated[idx].badge = e.target.value;
                        setSettings({
                          ...settings,
                          offerings: { ...settings.offerings, items: updated },
                        });
                      }}
                      placeholder="Badge"
                      className="w-full bg-[#121217] border border-zinc-700 text-xs text-white rounded-lg p-1.5 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...settings.offerings.items];
                      updated[idx].title = e.target.value;
                      setSettings({
                        ...settings,
                        offerings: { ...settings.offerings, items: updated },
                      });
                    }}
                    className="w-full bg-[#121217] border border-zinc-700 text-xs text-white font-bold rounded-lg p-2 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...settings.offerings.items];
                      updated[idx].description = e.target.value;
                      setSettings({
                        ...settings,
                        offerings: { ...settings.offerings, items: updated },
                      });
                    }}
                    className="w-full bg-[#121217] border border-zinc-700 text-xs text-zinc-300 rounded-lg p-2 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1">Target Link URL</label>
                  <input
                    type="text"
                    value={item.link}
                    onChange={(e) => {
                      const updated = [...settings.offerings.items];
                      updated[idx].link = e.target.value;
                      setSettings({
                        ...settings,
                        offerings: { ...settings.offerings, items: updated },
                      });
                    }}
                    className="w-full bg-[#121217] border border-zinc-700 text-xs text-zinc-400 rounded-lg p-2 outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Why Choose Us & Video */}
      {activeTab === 'whyUs' && (
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Film className="w-4 h-4 text-primary" />
            <span>Why Choose Us & Showroom Tour Video</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Section Badge</label>
              <input
                type="text"
                value={settings.whyChooseUs.badge}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whyChooseUs: { ...settings.whyChooseUs, badge: e.target.value },
                  })
                }
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Section Title</label>
              <input
                type="text"
                value={settings.whyChooseUs.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whyChooseUs: { ...settings.whyChooseUs, title: e.target.value },
                  })
                }
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Section Description</label>
            <textarea
              rows={3}
              value={settings.whyChooseUs.description}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  whyChooseUs: { ...settings.whyChooseUs, description: e.target.value },
                })
              }
              className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Video File URL or Path</label>
              <input
                type="text"
                value={settings.whyChooseUs.videoUrl}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whyChooseUs: { ...settings.whyChooseUs, videoUrl: e.target.value },
                  })
                }
                placeholder="/video/VE Project 2-2.mp4 or CDN link"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1">Accepts local video file paths or direct MP4 links.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Video Tour Title</label>
              <input
                type="text"
                value={settings.whyChooseUs.videoTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whyChooseUs: { ...settings.whyChooseUs, videoTitle: e.target.value },
                  })
                }
                placeholder="Florence Factory & Showroom Tour"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Features checklist */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <label className="block text-xs font-bold text-white">3 Guarantee Highlights</label>
            {settings.whyChooseUs.features.map((feat, idx) => (
              <div key={idx} className="p-3 bg-[#121217] rounded-xl border border-zinc-800 space-y-2">
                <input
                  type="text"
                  value={feat.title}
                  onChange={(e) => {
                    const updated = [...settings.whyChooseUs.features];
                    updated[idx].title = e.target.value;
                    setSettings({
                      ...settings,
                      whyChooseUs: { ...settings.whyChooseUs, features: updated },
                    });
                  }}
                  className="w-full bg-[#181822] border border-zinc-700 text-xs text-white font-bold rounded-lg p-2 outline-none focus:border-primary"
                />
                <input
                  type="text"
                  value={feat.desc}
                  onChange={(e) => {
                    const updated = [...settings.whyChooseUs.features];
                    updated[idx].desc = e.target.value;
                    setSettings({
                      ...settings,
                      whyChooseUs: { ...settings.whyChooseUs, features: updated },
                    });
                  }}
                  className="w-full bg-[#181822] border border-zinc-700 text-xs text-zinc-400 rounded-lg p-2 outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving changes...' : 'Save All Changes'}</span>
        </button>
      </div>
    </div>
  );
}
