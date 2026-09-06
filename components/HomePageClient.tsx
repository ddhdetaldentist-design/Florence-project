'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface HomePageClientProps {
  initialProducts: Product[];
}

export default function HomePageClient({ initialProducts }: HomePageClientProps) {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/img/1.jpg',
      badge: 'FLORENCE KITCHEN & FURNITURE',
      subtitle: 'Creative Interior Design',
      title: 'Make Your Home Better',
      desc: 'Top-tier modern kitchen designs with premium Acrylic & HPL materials, Austrian hardware, and a 10-year certified warranty.',
    },
    {
      image: '/img/2.jpg',
      badge: 'LUXURY LIVING & DRESSING',
      subtitle: 'Creative Interior Design',
      title: 'Stay At Home In Peace',
      desc: 'Bespoke dressing rooms and contemporary furniture combining daily comfort with flawless architectural aesthetics.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));

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

  // Testimonials State (100% English)
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = [
    {
      name: 'Afaf Abdelmoneam',
      image: '/img/1-1.jpg',
      title: 'Verified Client - Acrylic Kitchen',
      text: 'Thank you so much Eng. Mohamed for the excellent kitchen design and high-quality materials exactly as requested. You truly cared about delivering the best outcome and were strictly on time.',
      rating: 5,
    },
    {
      name: 'Yomna Osama',
      image: '/img/1-2.jpg',
      title: 'Verified Client - Kitchen & Dressing Room',
      text: 'An exceptional company with great dedication to quality. The materials are top European grade, prices are fair, and Eng. Mohamed Atef is very professional and respectful. Delivery was right on schedule.',
      rating: 5,
    },
    {
      name: 'Mando Kamal',
      image: '/img/1-3.jpg',
      title: 'Verified Client - Furniture & Interior Decor',
      text: 'I would like to thank everyone at Florence for product quality, adherence to specs, easy handling of modifications, and sticking to agreed pricing. Outstanding work and best wishes.',
      rating: 5,
    },
  ];

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
                        href="/products"
                        className="btn btn-primary py-3 px-5 font-weight-bold text-dark shadow"
                        style={{ borderRadius: '0', letterSpacing: '0.5px' }}
                      >
                        Explore Our Projects
                      </Link>
                      <a
                        href="https://wa.me/201065772456"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-light py-3 px-4 font-weight-bold"
                        style={{ borderRadius: '0' }}
                      >
                        <i className="fab fa-whatsapp mr-2 text-success"></i> Book Free Consultation
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
                  40+
                </h2>
                <h3 className="m-0 text-secondary font-weight-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                  Years Experience
                </h3>
                <span className="text-secondary small mt-2 font-weight-bold">
                  In Kitchen Manufacturing & Modern Furniture
                </span>
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5 d-flex flex-column justify-content-center">
              <h6 className="text-primary font-weight-normal text-uppercase mb-2" style={{ letterSpacing: '2px' }}>
                Learn About Us
              </h6>
              <h2 className="mb-4 section-title font-weight-bold text-secondary">
                We Are The Best Furniture and kitchen design In Your City
              </h2>
              <p className="mb-4 text-muted" style={{ lineHeight: '1.9', fontSize: '15.5px' }}>
                <strong>Florence</strong> is a premier manufacturer and designer of custom modern kitchens, dressing rooms, and architectural furniture based in Obour City. We fuse European design aesthetics with authentic waterproof, heat-resistant materials and original Blum soft-close fittings backed by a 10-year warranty.
              </p>
              <div className="row py-2">
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center bg-white p-3 border shadow-sm">
                    <h1 className="flaticon-house font-weight-normal text-primary m-0 mr-3" style={{ fontSize: '32px' }}></h1>
                    <div>
                      <h6 className="text-truncate m-0 font-weight-bold text-secondary">Project Planning</h6>
                      <small className="text-muted">Precise engineering</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center bg-white p-3 border shadow-sm">
                    <h1 className="flaticon-stairs font-weight-normal text-primary m-0 mr-3" style={{ fontSize: '32px' }}></h1>
                    <div>
                      <h6 className="text-truncate m-0 font-weight-bold text-secondary">Interior Design</h6>
                      <small className="text-muted">Realistic 3D preview</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center bg-white p-3 border shadow-sm">
                    <h1 className="flaticon-office font-weight-normal text-primary m-0 mr-3" style={{ fontSize: '32px' }}></h1>
                    <div>
                      <h6 className="text-truncate m-0 font-weight-bold text-secondary">Best Price & Value</h6>
                      <small className="text-muted">Direct factory pricing</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center bg-white p-3 border shadow-sm">
                    <h1 className="flaticon-living-room font-weight-normal text-primary m-0 mr-3" style={{ fontSize: '32px' }}></h1>
                    <div>
                      <h6 className="text-truncate m-0 font-weight-bold text-secondary">Furniture Design</h6>
                      <small className="text-muted">Custom built to order</small>
                    </div>
                  </div>
                </div>
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
                  WHAT WE OFFER AT FLORENCE KITCHEN
                </span>
              </div>
              <h2 className="mb-3 font-weight-bold text-secondary display-5" style={{ letterSpacing: '-0.5px' }}>
                What We Offer at Florence Kitchen
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '720px', lineHeight: '1.8', fontSize: '15px' }}>
                Integrated solutions for the modern home blending elegance with practical functionality, manufactured with state-of-the-art Italian CNC machinery.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {/* Offering Card 1: Top Demand */}
            <div className="col-lg-3 col-md-6 mb-4 d-flex">
              <div
                className="card w-100 border-0 bg-light shadow-sm overflow-hidden flex-column justify-content-between transition-all"
                style={{
                  borderRadius: '10px',
                  borderTop: '4px solid #DFB163',
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
                    src="/img/1.jpg"
                    alt="Modern & Classic Kitchens"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute" style={{ top: '12px', left: '12px', zIndex: 2 }}>
                    <span
                      className="badge px-2.5 py-1 font-weight-bold text-uppercase shadow-sm"
                      style={{ backgroundColor: '#DFB163', color: '#181818', fontSize: '10px', letterSpacing: '1px' }}
                    >
                      Top Demand
                    </span>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5 className="font-weight-bold text-secondary mb-2" style={{ fontSize: '16px' }}>
                      Modern & Classic Kitchens
                    </h5>
                    <p className="text-muted small mb-3" style={{ lineHeight: '1.6', fontSize: '13px' }}>
                      Acrylic, PolyLac, HPL, and natural wood engineered with Austrian soft-close hardware and ergonomic storage workflows.
                    </p>
                  </div>
                  <div className="pt-3 border-top">
                    <Link
                      href="/products?category=kitchens"
                      className="text-primary font-weight-bold small d-inline-flex align-items-center text-decoration-none"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Explore Kitchens <i className="fa fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Offering Card 2: Smart Organization */}
            <div className="col-lg-3 col-md-6 mb-4 d-flex">
              <div
                className="card w-100 border-0 bg-light shadow-sm overflow-hidden flex-column justify-content-between transition-all"
                style={{
                  borderRadius: '10px',
                  borderTop: '4px solid #252531',
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
                    src="/img/3.jpg"
                    alt="Dressing Rooms"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute" style={{ top: '12px', left: '12px', zIndex: 2 }}>
                    <span
                      className="badge px-2.5 py-1 font-weight-bold text-uppercase shadow-sm text-white"
                      style={{ backgroundColor: '#252531', fontSize: '10px', letterSpacing: '1px' }}
                    >
                      Smart Organization
                    </span>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5 className="font-weight-bold text-secondary mb-2" style={{ fontSize: '16px' }}>
                      Dressing Rooms (Walk-In)
                    </h5>
                    <p className="text-muted small mb-3" style={{ lineHeight: '1.6', fontSize: '13px' }}>
                      Intelligent compartmentalization, tinted securit glass doors, and frosted LED profile illumination for apparel & luxury accessories.
                    </p>
                  </div>
                  <div className="pt-3 border-top">
                    <Link
                      href="/products?category=dressing-rooms"
                      className="text-primary font-weight-bold small d-inline-flex align-items-center text-decoration-none"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Explore Dressing Rooms <i className="fa fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Offering Card 3: Modern Decor */}
            <div className="col-lg-3 col-md-6 mb-4 d-flex">
              <div
                className="card w-100 border-0 bg-light shadow-sm overflow-hidden flex-column justify-content-between transition-all"
                style={{
                  borderRadius: '10px',
                  borderTop: '4px solid #DFB163',
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
                    src="/img/img-6.jpg"
                    alt="TV Units & Decor"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute" style={{ top: '12px', left: '12px', zIndex: 2 }}>
                    <span
                      className="badge px-2.5 py-1 font-weight-bold text-uppercase shadow-sm"
                      style={{ backgroundColor: '#DFB163', color: '#181818', fontSize: '10px', letterSpacing: '1px' }}
                    >
                      Modern Decor
                    </span>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5 className="font-weight-bold text-secondary mb-2" style={{ fontSize: '16px' }}>
                      TV Units & Feature Walls
                    </h5>
                    <p className="text-muted small mb-3" style={{ lineHeight: '1.6', fontSize: '13px' }}>
                      UV marble alternative cladding, warm fluted wood panels, concealed cable conduits, and floating console storage.
                    </p>
                  </div>
                  <div className="pt-3 border-top">
                    <Link
                      href="/products?category=living-rooms"
                      className="text-primary font-weight-bold small d-inline-flex align-items-center text-decoration-none"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Explore TV Units <i className="fa fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Offering Card 4: Full Bespoke */}
            <div className="col-lg-3 col-md-6 mb-4 d-flex">
              <div
                className="card w-100 border-0 bg-light shadow-sm overflow-hidden flex-column justify-content-between transition-all"
                style={{
                  borderRadius: '10px',
                  borderTop: '4px solid #252531',
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
                    src="/img/portfolio-4.jpg"
                    alt="Custom Furniture & Fitouts"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute" style={{ top: '12px', left: '12px', zIndex: 2 }}>
                    <span
                      className="badge px-2.5 py-1 font-weight-bold text-uppercase shadow-sm text-white"
                      style={{ backgroundColor: '#252531', fontSize: '10px', letterSpacing: '1px' }}
                    >
                      Full Bespoke
                    </span>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5 className="font-weight-bold text-secondary mb-2" style={{ fontSize: '16px' }}>
                      Custom Furniture & Fitouts
                    </h5>
                    <p className="text-muted small mb-3" style={{ lineHeight: '1.6', fontSize: '13px' }}>
                      Comprehensive architectural woodwork, bespoke dining buffets, entrance consoles, and full interior manufacturing.
                    </p>
                  </div>
                  <div className="pt-3 border-top">
                    <Link
                      href="/products?category=furniture"
                      className="text-primary font-weight-bold small d-inline-flex align-items-center text-decoration-none"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Explore Custom Fitouts <i className="fa fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Video + Elevated Features) */}
      <section className="container-fluid bg-light py-5 border-top border-bottom">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-7 pr-lg-5 mb-4 mb-lg-0">
              <h6 className="text-primary font-weight-normal text-uppercase mb-2" style={{ letterSpacing: '2px' }}>
                Why Choose Us?
              </h6>
              <h2 className="mb-4 section-title font-weight-bold text-secondary">
                40+ Years Experience In Furniture and kitchen design
              </h2>
              <p className="mb-4 text-muted" style={{ lineHeight: '1.9' }}>
                At Florence, we prioritize long-term durability and client peace of mind. Every project is executed strictly on schedule using certified materials with dedicated after-sales support.
              </p>

              {/* Elevated Checklist */}
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-start bg-white p-3 border">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary text-secondary mr-3 shrink-0"
                      style={{ width: '40px', height: '40px', fontWeight: 'bold' }}
                    >
                      <i className="fa fa-shield-alt"></i>
                    </div>
                    <div>
                      <h6 className="font-weight-bold text-secondary mb-1">40+ Years Experience & Real 10-Year Warranty</h6>
                      <p className="text-muted small m-0">Comprehensive coverage on wood boards, finishes, and movement hardware.</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="d-flex align-items-start bg-white p-3 border">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary text-secondary mr-3 shrink-0"
                      style={{ width: '40px', height: '40px', fontWeight: 'bold' }}
                    >
                      <i className="fa fa-cube"></i>
                    </div>
                    <div>
                      <h6 className="font-weight-bold text-secondary mb-1">Best Interior 3D Design & Virtual Preview</h6>
                      <p className="text-muted small m-0">Photorealistic rendering before manufacturing so you see your space in advance.</p>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-start bg-white p-3 border">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary text-secondary mr-3 shrink-0"
                      style={{ width: '40px', height: '40px', fontWeight: 'bold' }}
                    >
                      <i className="fa fa-smile"></i>
                    </div>
                    <div>
                      <h6 className="font-weight-bold text-secondary mb-1">100% Customer Satisfaction & Strict Punctuality</h6>
                      <p className="text-muted small m-0">On-time delivery commitment backed by our long-standing industry reputation.</p>
                    </div>
                  </div>
                </div>
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
                  src="/video/VE Project 2-2.mp4"
                  controls
                  className="w-100 h-100"
                  style={{ minHeight: '360px', objectFit: 'cover', display: 'block' }}
                ></video>
                <div
                  className="p-3 bg-secondary text-white d-flex align-items-center justify-content-between border-top"
                  style={{ borderColor: 'rgba(223, 177, 99, 0.3)' }}
                >
                  <span className="small font-weight-bold text-primary">
                    <i className="fa fa-play-circle mr-2"></i> Florence Factory & Showroom Tour
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
                {/* Member 1: Eng. Mohamed Atef */}
                <div className="col-sm-6 mb-4 mb-sm-0">
                  <div className="team d-flex flex-column text-center border shadow-sm bg-white h-100">
                    <div className="position-relative overflow-hidden" style={{ height: '280px' }}>
                      <img
                        className="w-100 h-100"
                        src="/img/prof.jpg"
                        alt="eng-mohamed atef"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                        <a
                          className="btn btn-outline-primary text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px', borderRadius: '0' }}
                          href="https://www.facebook.com/Florencekitchenandfurniture"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          className="btn btn-outline-primary text-center px-0 d-inline-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px', borderRadius: '0' }}
                          href="https://wa.me/201065772456"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                    <div className="d-flex flex-column bg-secondary text-center py-3 px-2">
                      <h5 className="text-white font-weight-bold mb-1" style={{ letterSpacing: '0.5px' }}>
                        Eng. Mohamed Atef
                      </h5>
                      <span className="text-primary small font-weight-bold text-uppercase">
                        Owner & General Manager
                      </span>
                    </div>
                  </div>
                </div>

                {/* Member 2: Hassan Samhan */}
                <div className="col-sm-6">
                  <div className="team d-flex flex-column text-center border shadow-sm bg-white h-100">
                    <div className="position-relative overflow-hidden" style={{ height: '280px' }}>
                      <img
                        className="w-100 h-100"
                        src="/img/prof.jpg"
                        alt="hassan samhan"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                        <a
                          className="btn btn-outline-primary text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px', borderRadius: '0' }}
                          href="https://www.linkedin.com/in/hassan-samhan-194889247/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a
                          className="btn btn-outline-primary text-center px-0 d-inline-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px', borderRadius: '0' }}
                          href="https://wa.me/201065772456"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                    <div className="d-flex flex-column bg-secondary text-center py-3 px-2">
                      <h5 className="text-white font-weight-bold mb-1" style={{ letterSpacing: '0.5px' }}>
                        Hassan Samhan
                      </h5>
                      <span className="text-primary small font-weight-bold text-uppercase">
                        Sales & Design Consultant
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
