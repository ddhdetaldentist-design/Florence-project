'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<string>(images[0] || '/img/1.jpg');

  return (
    <div className="mb-4">
      {/* Main Showcase Image */}
      <div
        className="w-100 overflow-hidden mb-3 border bg-light shadow-sm"
        style={{ height: '440px' }}
      >
        <img
          src={activeImage}
          alt={title}
          className="img-fluid w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="d-flex align-items-center gap-2 overflow-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className="btn p-0 border mr-2"
              style={{
                width: '90px',
                height: '70px',
                overflow: 'hidden',
                borderColor: activeImage === img ? '#DFB163' : '#dee2e6',
                borderWidth: activeImage === img ? '2px' : '1px',
                borderRadius: '0',
                opacity: activeImage === img ? 1 : 0.7,
              }}
            >
              <img
                src={img}
                alt={`${title} - ${idx + 1}`}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
