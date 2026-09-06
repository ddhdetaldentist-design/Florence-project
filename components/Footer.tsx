import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer id="flex" className="container-fluid bg-dark text-white py-5 px-sm-3 px-md-5">
        <div className="container">
          <div className="row pt-5">
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-primary mb-4">Get In Touch</h4>
              <p>
                <i className="fa fa-map-marker-alt mr-2 text-primary"></i>
                Obour City - Ninth District - Qatar Al Nada Street
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2 text-primary"></i>
                0106 577 2456
              </p>
              <p>
                <i className="fa fa-envelope mr-2 text-primary"></i>
                florencenew2020@gmail.com
              </p>
              <div className="d-flex justify-content-start mt-4">
                <a
                  className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/Florencekitchenandfurniture"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/hassan-samhan-194889247/"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  className="btn btn-outline-light rounded-circle text-center mr-2 px-0 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/florence_new_2020/"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
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
                <Link className="text-white" href="/dashboard">
                  <i className="fa fa-angle-right mr-2 text-primary"></i>Admin Dashboard
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
                  href="https://wa.me/201065772456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-dark font-weight-bold px-3 py-2"
                  style={{ borderRadius: '0' }}
                >
                  <i className="fab fa-whatsapp mr-1"></i> WhatsApp: 0106 577 2456
                </a>
              </div>
            </div>
          </div>

          <div className="container border-top border-secondary pt-4 mt-2">
            <p className="m-0 text-center text-white">
              &copy;{' '}
              <Link className="text-white font-weight-bold" href="/">
                florence-kitchen
              </Link>
              . All Rights Reserved. Designed by{' '}
              <a
                className="text-white font-weight-bold"
                href="https://www.linkedin.com/in/hassan-samhan-194889247/"
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
