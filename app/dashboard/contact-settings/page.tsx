'use client';

import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/site-settings-service';
import { ContactInfo, SocialLinks } from '@/types';
import { 
  PhoneCall, 
  Save, 
  Check, 
  AlertCircle, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Share2,
  Globe
} from 'lucide-react';

export default function ContactSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [contact, setContact] = useState<ContactInfo>({
    phone: '01065772456',
    phoneDisplay: '0106 577 2456',
    whatsapp: '201065772456',
    email: 'florencenew2020@gmail.com',
    address: 'Obour City - Ninth District - Qatar Al Nada Street',
  });

  const [social, setSocial] = useState<SocialLinks>({
    facebook: 'https://www.facebook.com/Florencekitchenandfurniture',
    instagram: 'https://www.instagram.com/florence_new_2020/',
    linkedin: 'https://www.linkedin.com/in/hassan-samhan-194889247/',
    youtube: '#',
    twitter: '#',
    tiktok: '',
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getSiteSettings();
        if (data.contact) setContact(data.contact);
        if (data.social) setSocial(data.social);
      } catch (err: any) {
        setError('Failed to load contact settings: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await updateSiteSettings({ contact, social });
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(res.error || 'Failed to save contact settings');
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400 text-sm">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        Loading contact settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Contact Info & WhatsApp Settings</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Update phone numbers, floating WhatsApp button, showroom location, and official social channels.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Contact details and social links updated! The changes reflect across all pages.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Phone & WhatsApp */}
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
            <PhoneCall className="w-4 h-4 text-primary" />
            <span>Direct Communication & WhatsApp Integration</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                <span>WhatsApp Number (International format without +) *</span>
              </label>
              <input
                type="text"
                required
                value={contact.whatsapp}
                onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                placeholder="201065772456"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Controls the floating WhatsApp widget, hero booking buttons, and product inquiry buttons.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-primary" />
                <span>Display Phone Number *</span>
              </label>
              <input
                type="text"
                required
                value={contact.phoneDisplay}
                onChange={(e) => setContact({ ...contact, phoneDisplay: e.target.value })}
                placeholder="0106 577 2456"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Displayed in the navbar topbar, footer, and contact page.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>Official Email Address *</span>
              </label>
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="florencenew2020@gmail.com"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Showroom & Factory Physical Address *</span>
              </label>
              <input
                type="text"
                required
                value={contact.address}
                onChange={(e) => setContact({ ...contact, address: e.target.value })}
                placeholder="Obour City - Ninth District - Qatar Al Nada Street"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Media Links */}
        <div className="bg-[#181822] p-6 rounded-2xl border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Share2 className="w-4 h-4 text-primary" />
            <span>Social Media & Official Channels</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Facebook Page URL</label>
              <input
                type="url"
                value={social.facebook}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                placeholder="https://facebook.com/Florencekitchenandfurniture"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Instagram Profile URL</label>
              <input
                type="url"
                value={social.instagram}
                onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                placeholder="https://instagram.com/florence_new_2020/"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">LinkedIn Page URL</label>
              <input
                type="url"
                value={social.linkedin}
                onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">YouTube Channel URL</label>
              <input
                type="text"
                value={social.youtube}
                onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">TikTok Profile URL (Optional)</label>
              <input
                type="text"
                value={social.tiktok || ''}
                onChange={(e) => setSocial({ ...social, tiktok: e.target.value })}
                placeholder="https://tiktok.com/@florence"
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Twitter / X URL (Optional)</label>
              <input
                type="text"
                value={social.twitter || ''}
                onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                placeholder="https://x.com/..."
                className="w-full bg-[#121217] border border-zinc-700 text-white text-xs rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving changes...' : 'Save Contact & Social Details'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
