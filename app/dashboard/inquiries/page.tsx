'use client';

import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/site-settings-service';
import { Inquiry } from '@/types';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: 'new' | 'contacted' | 'closed') => {
    const res = await updateInquiryStatus(id, status);
    if (res.success) {
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } else {
      alert('Failed to update status: ' + res.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    const res = await deleteInquiry(id);
    if (res.success) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } else {
      alert('Failed to delete inquiry: ' + res.error);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesFilter = filter === 'all' || inq.status === filter;
    const matchesSearch =
      search.trim() === '' ||
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search) ||
      inq.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Client Inquiries & Messages</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Incoming consultation requests and design inquiries sent by customers.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter & Search */}
      <div className="bg-[#181822] p-4 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by client name, phone, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121217] border border-zinc-700 text-white rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-primary placeholder:text-zinc-500"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['all', 'new', 'contacted', 'closed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                filter === st
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="p-12 text-center text-zinc-400 text-sm">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading inquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-zinc-400 text-xs bg-[#181822] rounded-2xl border border-zinc-800 space-y-2">
          <MessageSquare className="w-8 h-8 mx-auto text-zinc-600" />
          <p className="font-semibold text-white">No inquiries found</p>
          <p className="text-zinc-500">Messages sent via the website contact form will appear right here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => {
            // Clean phone for WhatsApp
            const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
            const waNumber = cleanPhone.startsWith('0') ? `2${cleanPhone}` : cleanPhone;
            const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
              `Hello ${inq.name}, thank you for contacting Florence Kitchen. Regarding your inquiry: "${inq.message.slice(0, 50)}..."`
            )}`;

            return (
              <div
                key={inq.id}
                className={`p-6 rounded-2xl border transition-all ${
                  inq.status === 'new'
                    ? 'bg-[#1a1a26] border-primary/40 shadow-lg shadow-primary/5'
                    : 'bg-[#181822] border-zinc-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{inq.name}</h3>
                      {inq.status === 'new' && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-extrabold uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        <span className="font-mono">{inq.phone}</span>
                      </span>
                      {inq.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{inq.email}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-zinc-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(inq.created_at).toLocaleString('en-US')}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status selector */}
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className="bg-[#121217] border border-zinc-700 text-xs text-zinc-200 rounded-lg py-1.5 px-3 outline-none focus:border-primary font-semibold"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>

                    {/* Direct WhatsApp button */}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-colors"
                      title="Reply via WhatsApp"
                    >
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-xs text-zinc-300 leading-relaxed bg-[#121217] p-3.5 rounded-xl border border-zinc-800 font-mono whitespace-pre-wrap">
                    {inq.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
