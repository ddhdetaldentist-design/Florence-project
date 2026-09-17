'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { uploadProductImage } from '@/lib/products-service';
import { 
  ImagePlus, 
  Upload, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertCircle 
} from 'lucide-react';

export default function MediaLibraryPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/img-6.jpg',
    '/img/portfolio-1.jpg',
  ]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setError('Upload failed: ' + res.error);
      }
    }

    setUploadedImages((prev) => [...newUrls, ...prev]);
    setUploading(false);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white">Media Library & Storage</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Upload images directly to Supabase Storage and copy CDN links to use across your website and catalog.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Box */}
      <label className="border-2 border-dashed border-zinc-700 hover:border-primary rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#181822]/80 group">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
        <div className="w-14 h-14 rounded-2xl bg-zinc-800 group-hover:bg-primary/20 text-zinc-400 group-hover:text-primary flex items-center justify-center transition-colors mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-white mb-1">
          {uploading ? 'Uploading to Supabase Storage...' : 'Click or Drop Photos to Upload'}
        </h3>
        <p className="text-xs text-zinc-500">Supports JPG, PNG, WEBP, AVIF up to 10MB per file</p>
      </label>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ImagePlus className="w-4 h-4 text-primary" />
            <span>Uploaded Assets ({uploadedImages.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedImages.map((url, idx) => (
            <div
              key={idx}
              className="bg-[#181822] rounded-2xl border border-zinc-800 overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-zinc-900">
                <Image src={url} alt={`Media asset ${idx + 1}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                    title="Open Full Image"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(url)}
                    className="p-2 rounded-xl bg-primary text-zinc-950 font-bold transition-transform hover:scale-105"
                    title="Copy URL"
                  >
                    {copiedUrl === url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#14141c] flex items-center justify-between gap-2 border-t border-zinc-800/80">
                <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[140px]">
                  {url.split('/').pop()}
                </span>
                <button
                  onClick={() => copyToClipboard(url)}
                  className="text-[11px] font-bold text-primary hover:underline shrink-0"
                >
                  {copiedUrl === url ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
