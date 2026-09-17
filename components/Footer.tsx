import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings } from '@/types';
import { DEFAULT_SITE_SETTINGS } from '@/lib/site-settings-service';

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const currentSettings = settings || DEFAULT_SITE_SETTINGS;
  const { contact, social } = currentSettings;

  return (
    <>
      <footer id="flex" className="container-fluid bg-dark text-white py-5 px-sm-3 px-md-5">
        <div className="container">
          <div className="row pt-5">
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-primary mb-4">Get In Touch</h4>
              <p>
                <i className="fa fa-map-marker-alt mr-2 text-primary"></i>
                {contact.address}
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2 text-primary"></i>
                {contact.phoneDisplay || contact.phone}
              </p>
              <p>
                <i className="fa fa-envelope mr-2 text-primary"></i>
                {contact.email}
              </p>
              <div className="d-flex justify-content-start mt-4">
                {social.facebook && (
                  <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.facebook}
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {social.linkedin && (
                  <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.linkedin}
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                )}
                {social.instagram && (
                  <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.instagram}
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                {social.youtube && social.youtube !== '#' && (
                  <a
                    className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.youtube}
                    aria-label="YouTube"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                )}
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-primary mb-4">Quick Links</h4>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-white mb-2" href="/">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Home
                </Link>
                <Link className="text-white mb-2" href="/about">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>About Us
                </Link>
                <Link className="text-white mb-2" href="/service">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Our Services
                </Link>
                <Link className="text-white mb-2" href="/products">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Our Projects
                </Link>
                <Link className="text-white" href="/contact">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Contact Us
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-primary mb-4">Our Specialities</h4>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-white mb-2" href="/products?category=kitchens">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Modern Kitchens
                </Link>
                <Link className="text-white mb-2" href="/products?category=dressing">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Dressing Rooms
                </Link>
                <Link className="text-white mb-2" href="/products?category=furniture">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Modern Furniture
                </Link>
                <Link className="text-white mb-2" href="/service">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>3D Interior Design
                </Link>
                <Link className="text-white" href="/contact">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Contact Us
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-primary mb-4">About Florence</h4>
              <p className="text-white-50">
                Pioneers in designing and manufacturing high-end modern kitchens, dressing rooms, and bespoke furniture with Austrian Blum hardware and 10-year warranty.
              </p>
              <div className="mt-3">
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-dark font-weight-bold px-3 py-2"
                  style={{ borderRadius: '0' }}
                >
                  <i className="fab fa-whatsapp mr-1"></i> WhatsApp: {contact.phoneDisplay || contact.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="container border-top border-secondary pt-4 mt-2">
            <p className="m-0 text-center text-white d-flex align-items-center justify-content-center flex-wrap" style={{ gap: '0.4rem' }}>
              <span>&copy;</span>
              <Link
                className="text-white font-weight-bold d-inline-flex align-items-center"
                href="/"
                style={{ gap: '0.45rem', textDecoration: 'none' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '3px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
                    alt="Florence Kitchen Logo"
                    width={22}
                    height={22}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  />
                </span>
                <span>florence-kitchen</span>
              </Link>
              <span>. All Rights Reserved. Designed by</span>
              <a
                className="text-white font-weight-bold"
                href="https://hassansamhan.site/"
                target="_blank"
                rel="noopener noreferrer"
              >
                hassan-samhan
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-lg btn-primary back-to-top"
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '85px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '45px',
          height: '45px',
          zIndex: 99,
          borderRadius: '0',
        }}
        aria-label="Back to top"
      >
        <i className="fa fa-angle-double-up text-dark"></i>
      </a>
    </>
  );
}
