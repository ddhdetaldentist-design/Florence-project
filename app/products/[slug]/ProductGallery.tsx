'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<string>(images[0] || '/img/1.jpg');

  return (
    <div className="space-y-4">
      {/* Main Showcase Image */}
      <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative h-20 w-24 sm:h-24 sm:w-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                activeImage === img
                  ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                  : 'border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${title} - صورة ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
