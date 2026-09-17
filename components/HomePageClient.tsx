'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, SiteSettings, TestimonialItem, TeamMemberItem } from '@/types';
import { DEFAULT_SITE_SETTINGS, DEFAULT_TESTIMONIALS, DEFAULT_TEAM_MEMBERS } from '@/lib/site-settings-service';

interface HomePageClientProps {
  initialProducts: Product[];
  initialSettings?: SiteSettings;
  initialTestimonials?: TestimonialItem[];
  initialTeam?: TeamMemberItem[];
}

export default function HomePageClient({ 
  initialProducts,
  initialSettings,
  initialTestimonials,
  initialTeam
}: HomePageClientProps) {
  const settings = initialSettings || DEFAULT_SITE_SETTINGS;
  const slides = settings.heroSlides && settings.heroSlides.length > 0 ? settings.heroSlides : DEFAULT_SITE_SETTINGS.heroSlides;
  const reviews = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : DEFAULT_TESTIMONIALS;
  const team = initialTeam && initialTeam.length > 0 ? initialTeam : DEFAULT_TEAM_MEMBERS;

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Projects Filter State
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const counts = useMemo(() => {
    return {
      all: initialProducts.length,
      kitchens: initialProducts.filter((p) => p.category === 'kitchens' || p.category === 'kitchen').length,
      dressing: initialProducts.filter((p) => p.category === 'dressing' || p.category === 'dressing-rooms').length,
      living: initialProducts.filter((p) => p.category === 'living-rooms' || p.category === 'living').length,
      furniture: initialProducts.filter((p) => p.category === 'furniture' || p.category === 'custom').length,
    };
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return initialProducts;
    if (activeFilter === 'kitchen' || activeFilter === 'kitchens') {
      return initialProducts.filter((p) => p.category === 'kitchens' || p.category === 'kitchen');
    }
    if (activeFilter === 'dressing' || activeFilter === 'dressing-rooms') {
      return initialProducts.filter((p) => p.category === 'dressing' || p.category === 'dressing-rooms');
    }
    if (activeFilter === 'living' || activeFilter === 'living-rooms') {
      return initialProducts.filter((p) => p.category === 'living-rooms' || p.category === 'living');
    }
    if (activeFilter === 'furniture' || activeFilter === 'custom') {
      return initialProducts.filter((p) => p.category === 'furniture' || p.category === 'custom');
    }
    return initialProducts.filter((p) => p.category === activeFilter);
  }, [initialProducts, activeFilter]);

  // Testimonials State
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <>
      {/* 1. Hero Carousel (Ultra-Smooth Cross-Fade Transition) */}
      <section className="container-fluid p-0 position-relative overflow-hidden bg-dark">
        <div className="position-relative" style={{ height: '78vh', minHeight: '580px', maxHeight: '780px' }}>
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className="position-absolute w-100 h-100"
                style={{
                  top: 0,
                  left: 0,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: isActive ? 2 : 1,
                }}
              >
                {/* Background Image with Smooth Ken-Burns Zoom */}
                <div
                  className="w-100 h-100 position-absolute"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 7s ease-out',
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  className="position-absolute w-100 h-100"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(37,37,49,0.5) 0%, rgba(24,24,24,0.85) 100%)',
                  }}
                />

                {/* Content Overlay */}
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                  <div
                    className="p-3 text-center"
                    style={{
                      maxWidth: '850px',
                      transform: isActive ? 'translateY(0)' : 'translateY(25px)',
                      opacity: isActive ? 1 : 0,
                      transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                    }}
                  >
                    <span
                      className="badge px-3 py-2 mb-3 text-uppercase font-weight-bold"
                      style={{
                        backgroundColor: 'rgba(223, 177, 99, 0.2)',
                        color: '#DFB163',
                        border: '1px solid rgba(223, 177, 99, 0.4)',
                        letterSpacing: '2px',
                        fontSize: '12px',
                      }}
                    >
                      {slide.badge}
                    </span>

                    <h5
                      className="text-primary text-uppercase font-weight-bold mb-2"
                      style={{ letterSpacing: '3px', fontSize: '15px' }}
                    >
                      {slide.subtitle}
                    </h5>

                    <h1
                      className="display-3 text-white mb-3 font-weight-bold"
                      style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)', letterSpacing: '1px' }}
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="text-light mb-4 lead font-weight-normal mx-auto"
                      style={{ maxWidth: '650px', fontSize: '18px', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
                    >
                      {slide.desc}
                    </p>

                    <div className="d-flex flex-wrap justify-content-center" style={{ gap: '12px' }}>
                      <Link
                        href={slide.btnLink || "/products"}
                        className="btn btn-primary py-3 px-5 font-weight-bold text-dark shadow"
                        style={{ borderRadius: '0', letterSpacing: '0.5px' }}
                      >
                        {slide.btnText || "Explore Our Projects"}
                      </Link>
                      <a
                        href={`https://wa.me/${settings.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-light py-3 px-4 font-weight-bold"
                        style={{ borderRadius: '0' }}
                      >
                        <i className="fab fa-whatsapp mr-2 text-success"></i> {slide.waBtnText || "Book Free Consultation"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Carousel Controls */}
          <button
            type="button"
            className="carousel-control-prev border-0 bg-transparent"
            onClick={prevSlide}
            style={{ width: '60px', left: '25px', zIndex: 10 }}
            aria-label="Previous slide"
          >
            <div
              className="d-flex align-items-center justify-content-center shadow-lg transition-all"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(24, 24, 24, 0.75)',
                border: '1px solid #DFB163',
                color: '#DFB163',
                backdropFilter: 'blur(4px)',
              }}
            >
              <i className="fa fa-chevron-left" style={{ fontSize: '18px' }}></i>
            </div>
          </button>
          <button
            type="button"
            className="carousel-control-next border-0 bg-transparent"
            onClick={nextSlide}
            style={{ width: '60px', right: '25px', zIndex: 10 }}
            aria-label="Next slide"
          >
            <div
              className="d-flex align-items-center justify-content-center shadow-lg transition-all"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(24, 24, 24, 0.75)',
                border: '1px solid #DFB163',
                color: '#DFB163',
                backdropFilter: 'blur(4px)',
              }}
            >
              <i className="fa fa-chevron-right" style={{ fontSize: '18px' }}></i>
            </div>
          </button>

          {/* Indicators */}
          <div
            className="position-absolute d-flex justify-content-center align-items-center w-100"
            style={{ bottom: '20px', zIndex: 10, gap: '10px' }}
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: idx === currentSlide ? '40px' : '15px',
                  height: '4px',
                  backgroundColor: idx === currentSlide ? '#DFB163' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  borderRadius: '2px',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  padding: 0,
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. About Section (40+ Years Experience) */}
      <section className="container-fluid bg-light py-5">
        <div className="container py-4">
          <div className="row align-items-stretch">
            <div className="col-lg-5 p-0 mb-4 mb-lg-0">
              <div
                className="d-flex flex-column align-items-center justify-content-center bg-primary h-100 py-5 px-4 text-center shadow-sm"
                style={{ minHeight: '380px' }}
              >
                <i className="flaticon-brickwall display-1 font-weight-normal text-secondary mb-3" style={{ fontSize: '75px' }}></i>
                <h2 className="display-3 mb-2 text-secondary font-weight-bold" style={{ letterSpacing: '1px' }}>
                  {settings.about.yearsExperience}
                </h2>
                <h3 className="m-0 text-secondary font-weight-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                  {settings.about.experienceSubtitle}
                </h3>
                <span className="text-secondary small mt-2 font-weight-bold">
                  {settings.about.tagline}
                </span>
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5 d-flex flex-column justify-content-center">
              <h6 className="text-primary font-weight-normal text-uppercase mb-2" style={{ letterSpacing: '2px' }}>
                {settings.about.experienceBadge}
              </h6>
              <h2 className="mb-4 section-title font-weight-bold text-secondary">
                {settings.about.title}
              </h2>
              <p className="mb-4 text-muted" style={{ lineHeight: '1.9', fontSize: '15.5px' }}>
                {settings.about.description}
              </p>
              <div className="row py-2">
                {settings.about.pillars.map((pillar, pIdx) => (
                  <div key={pIdx} className="col-sm-6 mb-3">
                    <div className="d-flex align-items-center bg-white p-3 border shadow-sm">
                      <h1 className={`${pillar.icon || 'flaticon-house'} font-weight-normal text-primary m-0 mr-3`} style={{ fontSize: '32px' }}></h1>
                      <div>
                        <h6 className="text-truncate m-0 font-weight-bold text-secondary">{pillar.title}</h6>
                        <small className="text-muted">{pillar.subtitle}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Offer at Florence Kitchen Section */}
      <section className="container-fluid py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <div
                className="d-inline-flex align-items-center mb-3 px-3 py-1 bg-light border"
                style={{ borderRadius: '20px', borderColor: '#DFB163' }}
              >
                <span
                  className="text-primary font-weight-bold small text-uppercase"
                  style={{ letterSpacing: '2px', fontSize: '11px' }}
                >
                  {settings.offerings.badge}
                </span>
              </div>
              <h2 className="mb-3 font-weight-bold text-secondary display-5" style={{ letterSpacing: '-0.5px' }}>
                {settings.offerings.title}
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '720px', lineHeight: '1.8', fontSize: '15px' }}>
                {settings.offerings.description}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {settings.offerings.items.map((offer, oIdx) => (
              <div key={offer.id || oIdx} className="col-lg-3 col-md-6 mb-4 d-flex">
                <div
                  className="card w-100 border-0 bg-light shadow-sm overflow-hidden flex-column justify-content-between transition-all"
                  style={{
                    borderRadius: '10px',
                    borderTop: `4px solid ${offer.tagColor || (oIdx % 2 === 0 ? '#DFB163' : '#252531')}`,
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 14px 28px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  }}
                >
                  <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="position-absolute" style={{ top: '12px', left: '12px', zIndex: 2 }}>
                      <span
                        className="badge px-2.5 py-1 font-weight-bold text-uppercase shadow-sm"
                        style={{
                          backgroundColor: offer.tagColor || '#DFB163',
                          color: offer.tagColor === '#252531' ? '#ffffff' : '#181818',
                          fontSize: '10px',
                          letterSpacing: '1px',
                        }}
                      >
                        {offer.badge}
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <h5 className="font-weight-bold text-secondary mb-2" style={{ fontSize: '16px' }}>
                        {offer.title}
                      </h5>
                      <p className="text-muted small mb-3" style={{ lineHeight: '1.6', fontSize: '13px' }}>
                        {offer.description}
                      </p>
                    </div>
                    <div className="pt-3 border-top">
                      <Link
                        href={offer.link || '/products'}
                        className="text-primary font-weight-bold small d-inline-flex align-items-center text-decoration-none"
                        style={{ letterSpacing: '0.5px' }}
                      >
                        Explore <i className="fa fa-arrow-right ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Video + Elevated Features) */}
      <section className="container-fluid bg-light py-5 border-top border-bottom">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-7 pr-lg-5 mb-4 mb-lg-0">
              <h6 className="text-primary font-weight-normal text-uppercase mb-2" style={{ letterSpacing: '2px' }}>
                {settings.whyChooseUs.badge}
              </h6>
              <h2 className="mb-4 section-title font-weight-bold text-secondary">
                {settings.whyChooseUs.title}
              </h2>
              <p className="mb-4 text-muted" style={{ lineHeight: '1.9' }}>
                {settings.whyChooseUs.description}
              </p>

              {/* Elevated Checklist */}
              <div className="row">
                {settings.whyChooseUs.features.map((feat, fIdx) => (
                  <div key={fIdx} className="col-12 mb-3">
                    <div className="d-flex align-items-start bg-white p-3 border">
                      <div
                        className="d-flex align-items-center justify-content-center bg-primary text-secondary mr-3 shrink-0"
                        style={{ width: '40px', height: '40px', fontWeight: 'bold' }}
                      >
                        <i className={fIdx === 0 ? 'fa fa-shield-alt' : fIdx === 1 ? 'fa fa-cube' : 'fa fa-smile'}></i>
                      </div>
                      <div>
                        <h6 className="font-weight-bold text-secondary mb-1">{feat.title}</h6>
                        <p className="text-muted small m-0">{feat.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Player Frame */}
            <div className="col-lg-5">
              <div
                className="position-relative overflow-hidden shadow-lg border"
                style={{
                  backgroundColor: '#181818',
                  borderColor: '#DFB163',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                }}
              >
                <video
                  src={settings.whyChooseUs.videoUrl}
                  controls
                  className="w-100 h-100"
                  style={{ minHeight: '360px', objectFit: 'cover', display: 'block' }}
                ></video>
                <div
                  className="p-3 bg-secondary text-white d-flex align-items-center justify-content-between border-top"
                  style={{ borderColor: 'rgba(223, 177, 99, 0.3)' }}
                >
                  <span className="small font-weight-bold text-primary">
                    <i className="fa fa-play-circle mr-2"></i> {settings.whyChooseUs.videoTitle}
                  </span>
                  <span className="badge badge-primary text-dark font-weight-bold px-2 py-1">HD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Projects Section */}
      <section className="container-fluid py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-4">
              <div
                className="d-inline-flex align-items-center mb-3 px-3 py-1 bg-light border"
                style={{ borderRadius: '20px', borderColor: '#DFB163' }}
              >
                <span
                  className="text-primary font-weight-bold small text-uppercase"
                  style={{ letterSpacing: '2px', fontSize: '11px' }}
                >
                  OUR PROJECTS
                </span>
              </div>
              <h2 className="mb-3 font-weight-bold text-secondary display-5" style={{ letterSpacing: '-0.5px' }}>
                Some Of Our Awesome Interior Designing Projects
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '680px', lineHeight: '1.8', fontSize: '15px' }}>
                Explore our verified delivered portfolio of bespoke kitchens, dressing suites, and modern living spaces. Handcrafted with precision Italian machinery and 10-year certified warranty.
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="row">
            <div className="col-12 text-center mb-4">
              <ul className="list-inline mb-4 d-flex flex-wrap justify-content-center" style={{ gap: '8px' }}>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    activeFilter === 'all' ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter('all')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  All Projects <span className="badge badge-light text-dark ml-1">{counts.all}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    activeFilter === 'kitchens' || activeFilter === 'kitchen' ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter('kitchens')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Kitchens <span className="badge badge-light text-dark ml-1">{counts.kitchens}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    activeFilter === 'dressing-rooms' || activeFilter === 'dressing' ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter('dressing-rooms')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Dressing Rooms <span className="badge badge-light text-dark ml-1">{counts.dressing}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    activeFilter === 'living-rooms' || activeFilter === 'living' ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter('living-rooms')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Living & Decor <span className="badge badge-light text-dark ml-1">{counts.living}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    activeFilter === 'furniture' ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter('furniture')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Custom Furniture <span className="badge badge-light text-dark ml-1">{counts.furniture}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="row mx-1 mb-4">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Consultation Reassurance Banner */}
          <div
            className="p-4 p-md-5 bg-light border d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-left mt-2"
            style={{
              borderLeft: '5px solid #DFB163',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
            }}
          >
            <div className="mb-3 mb-md-0 pr-md-4">
              <span
                className="badge px-2.5 py-1 mb-2 font-weight-bold text-uppercase"
                style={{ backgroundColor: '#DFB163', color: '#181818', fontSize: '10px', letterSpacing: '1px' }}
              >
                Free 3D Architectural Consultation
              </span>
              <h4 className="font-weight-bold text-secondary mb-1">
                Planning your kitchen or dressing room?
              </h4>
              <p className="text-muted small mb-0" style={{ maxWidth: '620px', lineHeight: '1.6' }}>
                Share your space dimensions or blueprints with our senior design team for a complimentary 3D photorealistic concept and comprehensive pricing breakdown.
              </p>
            </div>
            <div className="d-flex flex-wrap justify-content-center" style={{ gap: '10px' }}>
              <Link
                href="/products"
                className="btn btn-outline-secondary px-4 py-2.5 font-weight-bold text-uppercase small"
                style={{ borderRadius: '4px', letterSpacing: '0.5px' }}
              >
                Catalog ({counts.all})
              </Link>
              <a
                href="https://wa.me/201065772456?text=Hello%20Florence%20Kitchen%2C%20I%20would%20like%20to%20request%20a%20free%20design%20consultation%20and%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-4 py-2.5 font-weight-bold text-dark text-uppercase small shadow-sm"
                style={{ borderRadius: '4px', letterSpacing: '0.5px' }}
              >
                <i className="fab fa-whatsapp mr-1 text-success font-weight-bold"></i> Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section (100% English) */}
      <section className="container-fluid py-5 bg-light border-top">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-7 pr-md-5 mb-4 mb-md-0">
              <h6 className="text-primary font-weight-normal text-uppercase mb-2" style={{ letterSpacing: '2px' }}>
                Testimonial
              </h6>
              <h2 className="mb-4 section-title font-weight-bold text-secondary">
                What Our Clients Say
              </h2>

              {/* Review Card */}
              <div
                className="bg-white p-4 p-md-5 border shadow-sm position-relative"
                style={{ borderLeft: '4px solid #DFB163' }}
              >
                {/* 5 Stars */}
                <div className="mb-3 d-flex align-items-center">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <i key={i} className="fa fa-star text-primary mr-1" style={{ fontSize: '15px' }}></i>
                  ))}
                  <span className="badge badge-success ml-2 px-2 py-1 small">Verified 5/5 Rating</span>
                </div>

                <p
                  className="font-italic text-secondary mb-4"
                  style={{ lineHeight: '1.9', fontSize: '16.5px' }}
                >
                  "{reviews[currentReview].text}"
                </p>

                <div className="d-flex align-items-center justify-content-between border-top pt-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle mr-3 border"
                      src={reviews[currentReview].image}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderColor: '#DFB163',
                        borderWidth: '2px',
                      }}
                      alt={reviews[currentReview].name}
                    />
                    <div>
                      <h6 className="font-weight-bold m-0 text-secondary">
                        {reviews[currentReview].name}
                      </h6>
                      <small className="text-muted">{reviews[currentReview].title}</small>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      onClick={prevReview}
                      className="btn btn-outline-primary mr-2 d-inline-flex align-items-center justify-content-center"
                      style={{ width: '38px', height: '38px', borderRadius: '0' }}
                      aria-label="Previous testimonial"
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button
                      type="button"
                      onClick={nextReview}
                      className="btn btn-outline-primary d-inline-flex align-items-center justify-content-center"
                      style={{ width: '38px', height: '38px', borderRadius: '0' }}
                      aria-label="Next testimonial"
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Photo */}
            <div className="col-md-5">
              <div className="position-relative overflow-hidden border shadow-sm">
                <img
                  id="revie"
                  className="w-100"
                  src="/img/5.jpg"
                  alt="Florence kitchen client showcase"
                  style={{ minHeight: '380px', objectFit: 'cover', display: 'block' }}
                />
                <div
                  className="position-absolute p-3 bg-secondary text-white w-100 text-center"
                  style={{ bottom: 0, left: 0, opacity: 0.95 }}
                >
                  <p className="m-0 small font-weight-bold text-primary">
                    Certified craftsmanship trusted by discerning homeowners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Team Section */}
      <section className="container-fluid bg-white py-5">
        <div className="container py-4">
          <div className="row align-items-stretch">
            {/* Left Gold Box */}
            <div className="col-md-4 p-0 mb-4 mb-md-0">
              <div
                className="py-5 px-4 h-100 bg-primary d-flex flex-column align-items-center justify-content-center text-center shadow-sm"
                style={{ minHeight: '350px' }}
              >
                <span
                  className="badge px-3 py-1 mb-3 text-uppercase font-weight-bold"
                  style={{ backgroundColor: '#252531', color: '#DFB163' }}
                >
                  Our Team
                </span>
                <h2 className="mb-3 text-secondary font-weight-bold text-uppercase">
                  Meet Our Team Members
                </h2>
                <p className="text-secondary small font-weight-bold mb-0" style={{ maxWidth: '260px' }}>
                  A passionate team of master designers and engineers dedicated to realizing your interior vision.
                </p>
              </div>
            </div>

            {/* Team Cards */}
            <div className="col-md-8 p-0 pl-md-4">
              <div className="row">
                {team.map((member, mIdx) => (
                  <div key={member.id || mIdx} className="col-sm-6 mb-4 mb-sm-0">
                    <div className="team d-flex flex-column text-center border shadow-sm bg-white h-100">
                      <div className="position-relative overflow-hidden" style={{ height: '280px' }}>
                        <img
                          className="w-100 h-100"
                          src={member.image}
                          alt={member.name}
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                          {member.facebook && (
                            <a
                              className="btn btn-outline-primary text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px', borderRadius: '0' }}
                              href={member.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Facebook"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              className="btn btn-outline-primary text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px', borderRadius: '0' }}
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                            >
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          )}
                          {member.whatsapp && (
                            <a
                              className="btn btn-outline-primary text-center px-0 d-inline-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px', borderRadius: '0' }}
                              href={member.whatsapp.startsWith('http') ? member.whatsapp : `https://wa.me/${member.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="WhatsApp"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-column bg-secondary text-center py-3 px-2">
                        <h5 className="text-white font-weight-bold mb-1" style={{ letterSpacing: '0.5px' }}>
                          {member.name}
                        </h5>
                        <span className="text-primary small font-weight-bold text-uppercase">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
