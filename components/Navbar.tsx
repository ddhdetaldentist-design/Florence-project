'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteSettings } from '@/types';
import { DEFAULT_SITE_SETTINGS } from '@/lib/site-settings-service';

export default function Navbar({ settings }: { settings?: SiteSettings }) {
  const currentSettings = settings || DEFAULT_SITE_SETTINGS;
  const { contact, social } = currentSettings;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-dark py-2 text-white border-bottom border-secondary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left mb-2 mb-md-0">
              <div className="d-inline-flex align-items-center text-sm">
                <Link className="text-white-50 hover-text-primary pr-3" href="/#faq" style={{ textDecoration: 'none' }}>
                  FAQs
                </Link>
                <span className="text-white-50">|</span>
                <Link className="text-white-50 hover-text-primary px-3" href="/contact" style={{ textDecoration: 'none' }}>
                  Help
                </Link>
                <span className="text-white-50">|</span>
                <Link className="text-white-50 hover-text-primary pl-3" href="/contact" style={{ textDecoration: 'none' }}>
                  Support
                </Link>
              </div>
            </div>
            <div className="col-md-6 text-center text-md-right">
              <div className="d-inline-flex align-items-center">
                {social.facebook && (
                  <a
                    className="text-white px-2 hover-text-primary"
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {social.twitter && (
                  <a className="text-white px-2 hover-text-primary" href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                )}
                {social.linkedin && (
                  <a
                    className="text-white px-2 hover-text-primary"
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                )}
                {social.instagram && (
                  <a
                    className="text-white px-2 hover-text-primary"
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                {social.youtube && social.youtube !== '#' && (
                  <a className="text-white pl-2 hover-text-primary" href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <i className="fab fa-youtube"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Sticky Smooth Floating Navbar */}
      <header
        className="container-fluid p-0"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          backgroundColor: isScrolled ? 'rgba(37, 37, 49, 0.98)' : '#252531',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled
            ? '0 10px 30px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(223, 177, 99, 0.3)'
            : 'none',
          borderBottom: isScrolled ? '2px solid #DFB163' : '1px solid transparent',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="container">
          <nav
            className="navbar navbar-expand-lg navbar-dark px-0 d-flex align-items-center justify-content-between"
            style={{
              paddingTop: isScrolled ? '6px' : '12px',
              paddingBottom: isScrolled ? '6px' : '12px',
              transition: 'all 0.35s ease',
            }}
          >
            {/* Logo with Smooth Dynamic Resize */}
            <Link href="/" className="navbar-brand py-0 m-0">
              <img
                id="florene"
                src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
                alt="florence-kitchen"
                style={{
                  height: isScrolled ? '62px' : '85px',
                  width: 'auto',
                  objectFit: 'contain',
                  transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </Link>

            {/* Mobile Menu Toggler Button */}
            <button
              type="button"
              className="navbar-toggler d-lg-none border-0 text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              style={{ fontSize: '24px', padding: '8px 12px' }}
            >
              <i className={isOpen ? 'fa fa-times text-primary' : 'fa fa-bars text-white'}></i>
            </button>

            {/* Desktop Navigation Links */}
            <div className="d-none d-lg-flex align-items-center ml-auto">
              <div className="navbar-nav d-flex flex-row align-items-center">
                <Link
                  href="/"
                  className={`nav-item nav-link px-3 font-weight-bold ${
                    isActive('/') ? 'active text-primary' : 'text-white'
                  }`}
                  style={{
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    paddingTop: isScrolled ? '18px' : '28px',
                    paddingBottom: isScrolled ? '18px' : '28px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`nav-item nav-link px-3 font-weight-bold ${
                    isActive('/about') ? 'active text-primary' : 'text-white'
                  }`}
                  style={{
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    paddingTop: isScrolled ? '18px' : '28px',
                    paddingBottom: isScrolled ? '18px' : '28px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  About
                </Link>
                <Link
                  href="/service"
                  className={`nav-item nav-link px-3 font-weight-bold ${
                    isActive('/service') ? 'active text-primary' : 'text-white'
                  }`}
                  style={{
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    paddingTop: isScrolled ? '18px' : '28px',
                    paddingBottom: isScrolled ? '18px' : '28px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Service
                </Link>
                <Link
                  href="/products"
                  className={`nav-item nav-link px-3 font-weight-bold ${
                    isActive('/products') ? 'active text-primary' : 'text-white'
                  }`}
                  style={{
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    paddingTop: isScrolled ? '18px' : '28px',
                    paddingBottom: isScrolled ? '18px' : '28px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Project
                </Link>
                <Link
                  href="/contact"
                  className={`nav-item nav-link px-3 font-weight-bold ${
                    isActive('/contact') ? 'active text-primary' : 'text-white'
                  }`}
                  style={{
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    paddingTop: isScrolled ? '18px' : '28px',
                    paddingBottom: isScrolled ? '18px' : '28px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact
                </Link>
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="d-lg-none bg-dark p-4 border-top border-secondary animate-fadeIn">
              <div className="navbar-nav d-flex flex-column">
                <Link
                  href="/"
                  className={`nav-item nav-link py-2 font-weight-bold ${isActive('/') ? 'text-primary' : 'text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`nav-item nav-link py-2 font-weight-bold ${isActive('/about') ? 'text-primary' : 'text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/service"
                  className={`nav-item nav-link py-2 font-weight-bold ${isActive('/service') ? 'text-primary' : 'text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  Service
                </Link>
                <Link
                  href="/products"
                  className={`nav-item nav-link py-2 font-weight-bold ${isActive('/products') ? 'text-primary' : 'text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  Project
                </Link>
                <Link
                  href="/contact"
                  className={`nav-item nav-link py-2 font-weight-bold ${isActive('/contact') ? 'text-primary' : 'text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Sticky Navbar End */}

      {/* Under Nav Start */}
      <div className="container-fluid bg-white py-3 border-bottom shadow-sm">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-left mb-3 mb-lg-0">
              <div className="d-inline-flex text-left align-items-center">
                <h1 className="flaticon-office font-weight-normal text-primary m-0 mr-3" style={{ fontSize: '38px' }}></h1>
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold mb-1 text-secondary">Our Office</h6>
                  <p className="m-0 text-muted small">
                    {contact.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-left text-lg-center mb-3 mb-lg-0">
              <div className="d-inline-flex text-left align-items-center">
                <h1 className="flaticon-email font-weight-normal text-primary m-0 mr-3" style={{ fontSize: '38px' }}></h1>
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold mb-1 text-secondary">Email Us</h6>
                  <a href={`mailto:${contact.email}`} className="m-0 text-muted small" style={{ textDecoration: 'none' }}>
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-left text-lg-right">
              <div className="d-inline-flex text-left align-items-center">
                <h1 className="flaticon-telephone font-weight-normal text-primary m-0 mr-3" style={{ fontSize: '38px' }}></h1>
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold mb-1 text-secondary">Call Us</h6>
                  <a href={`tel:${contact.phone}`} className="m-0 text-primary font-weight-bold" style={{ textDecoration: 'none' }}>
                    {contact.phoneDisplay || contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Under Nav End */}
    </>
  );
}
