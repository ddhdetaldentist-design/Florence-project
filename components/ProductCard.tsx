import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayImage = product.thumbnail || product.images?.[0] || '/img/3.jpg';

  const categoryLabel =
    product.category === 'kitchens' || product.category === 'kitchen'
      ? 'Modern Kitchen'
      : product.category === 'dressing' || product.category === 'dressing-rooms'
      ? 'Dressing Room'
      : product.category === 'living-rooms' || product.category === 'living'
      ? 'Living & Decor'
      : 'Bespoke Furniture';

  const whatsappMsg = encodeURIComponent(
    `Hello Florence Kitchen, I would like to inquire about details and pricing for design: "${product.title}"`
  );

  return (
    <div className="col-lg-4 col-md-6 mb-4 d-flex">
      <div
        className="card w-100 border-0 bg-white shadow-sm overflow-hidden flex-column justify-content-between transition-all"
        style={{
          borderRadius: '10px',
          border: '1px solid #e9ecef',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 16px 36px rgba(37, 37, 49, 0.12)';
          e.currentTarget.style.borderColor = '#DFB163';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.borderColor = '#e9ecef';
        }}
      >
        {/* Top Image Showcase */}
        <div className="position-relative overflow-hidden group" style={{ height: '270px' }}>
          <Link href={`/products/${product.slug}`} className="d-block w-100 h-100 overflow-hidden">
            <img
              src={displayImage}
              alt={product.title}
              className="w-100 h-100"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </Link>

          {/* Subtle Dark Gradient Overlay */}
          <div
            className="position-absolute w-100 h-100 pointer-events-none"
            style={{
              top: 0,
              left: 0,
              background: 'linear-gradient(to top, rgba(24, 24, 24, 0.8) 0%, rgba(24, 24, 24, 0.1) 50%, rgba(24, 24, 24, 0.5) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Badges */}
          <div
            className="position-absolute d-flex justify-content-between align-items-center w-100 p-3"
            style={{ top: 0, left: 0, zIndex: 2 }}
          >
            <span
              className="badge px-3 py-1 font-weight-bold text-uppercase shadow-sm"
              style={{
                backgroundColor: '#DFB163',
                color: '#181818',
                fontSize: '11px',
                letterSpacing: '1px',
                borderRadius: '4px',
              }}
            >
              {categoryLabel}
            </span>

            <span
              className="badge px-2.5 py-1 font-weight-bold shadow-sm"
              style={{
                backgroundColor: 'rgba(24, 24, 24, 0.85)',
                color: '#ffffff',
                backdropFilter: 'blur(8px)',
                fontSize: '11px',
                border: '1px solid rgba(223, 177, 99, 0.5)',
                borderRadius: '4px',
              }}
            >
              <i className="fa fa-shield-alt text-primary mr-1"></i> {product.specs?.warranty || '10Y Warranty'}
            </span>
          </div>

          {/* Bottom of Image Info */}
          <div
            className="position-absolute w-100 p-3 d-flex justify-content-between align-items-end"
            style={{ bottom: 0, left: 0, zIndex: 2 }}
          >
            <span
              className="text-white small font-weight-bold px-2 py-1"
              style={{
                backgroundColor: 'rgba(24, 24, 24, 0.65)',
                backdropFilter: 'blur(4px)',
                borderRadius: '4px',
                fontSize: '11px',
              }}
            >
              <i className="fa fa-map-marker-alt text-primary mr-1"></i> {product.specs?.location || 'Obour Showroom'}
            </span>

            <Link
              href={`/products/${product.slug}`}
              className="btn btn-sm btn-primary px-3 py-1 font-weight-bold text-dark shadow"
              style={{ borderRadius: '4px', fontSize: '11px', letterSpacing: '0.5px' }}
            >
              <i className="fa fa-eye mr-1"></i> View Specs
            </Link>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <div className="d-flex align-items-center mb-1">
              <span className="text-primary font-weight-bold small text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                Florence Bespoke
              </span>
            </div>

            <h5
              className="card-title font-weight-bold mb-2 text-secondary"
              style={{ fontSize: '17px', lineHeight: '1.4' }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="text-secondary text-decoration-none"
                style={{ textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#DFB163')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#252531')}
              >
                {product.title}
              </Link>
            </h5>

            <p
              className="card-text text-muted small mb-3"
              style={{
                lineHeight: '1.6',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: '13px',
              }}
            >
              {product.description}
            </p>

            {/* Quick Specs Chips */}
            <div className="d-flex flex-wrap mb-3" style={{ gap: '6px' }}>
              {product.specs?.material && (
                <span
                  className="badge px-2 py-1 font-weight-normal text-secondary bg-light border"
                  style={{ fontSize: '11px' }}
                  title={`Material: ${product.specs.material}`}
                >
                  <i className="fa fa-layer-group text-primary mr-1"></i>
                  {product.specs.material.length > 28
                    ? product.specs.material.substring(0, 26) + '...'
                    : product.specs.material}
                </span>
              )}
              {product.specs?.color && (
                <span
                  className="badge px-2 py-1 font-weight-normal text-secondary bg-light border"
                  style={{ fontSize: '11px' }}
                >
                  <i className="fa fa-palette text-primary mr-1"></i>
                  {product.specs.color}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="border-top pt-3 d-flex align-items-center justify-content-between">
            <Link
              href={`/products/${product.slug}`}
              className="text-primary font-weight-bold small text-decoration-none d-inline-flex align-items-center"
              style={{ textDecoration: 'none', fontSize: '12px', letterSpacing: '0.5px' }}
            >
              Details & Blueprints <i className="fa fa-arrow-right ml-1"></i>
            </Link>

            <a
              href={`https://wa.me/201065772456?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-primary d-inline-flex align-items-center font-weight-bold px-3 py-1.5"
              style={{
                borderRadius: '4px',
                fontSize: '12px',
                borderColor: '#DFB163',
                letterSpacing: '0.5px',
              }}
              title="Instant WhatsApp Price Inquiry"
            >
              <i className="fab fa-whatsapp mr-1 text-success font-weight-bold" style={{ fontSize: '14px' }}></i>
              Quote Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
