import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Services | florence-kitchen',
  description: 'Awesome Interior Designing Services For Your Home - Kitchens, Dressing Rooms & Furniture.',
};

export default function ServicePage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-6 text-center text-md-left">
              <h1 className="mb-4 mb-md-0 text-primary text-uppercase font-weight-bold">
                Our Services
              </h1>
            </div>
            <div className="col-md-6 text-center text-md-right">
              <div className="d-inline-flex align-items-center">
                <Link className="btn btn-outline-primary" href="/" style={{ borderRadius: '0' }}>
                  Home
                </Link>
                <i className="fas fa-angle-double-right text-primary mx-2"></i>
                <span
                  className="btn btn-outline-primary active"
                  style={{ borderRadius: '0', cursor: 'default' }}
                >
                  Our Services
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Services Start */}
      <main className="container-fluid py-5 flex-grow">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-6 pr-lg-5 mb-5 mb-lg-0">
              <h6 className="text-primary font-weight-normal text-uppercase mb-3">
                Our Awesome Services
              </h6>
              <h1 className="mb-4 section-title font-weight-bold">
                Awesome Interior Designing Services For Your Home
              </h1>
              <p className="mb-4" style={{ lineHeight: '1.8' }}>
                At Florence, we account for every millimeter of your floor plan. We provide interactive 3D architectural simulations before production starts, utilizing authentic European soft-close systems to ensure durability and aesthetic refinement.
              </p>
              <div className="mt-4">
                <a
                  href="https://wa.me/201065772456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary py-3 px-4 font-weight-bold"
                  style={{ borderRadius: '0' }}
                >
                  <i className="fab fa-whatsapp mr-2 text-dark"></i> Book Free Consultation
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="d-flex flex-column text-center bg-light p-4 h-100">
                    <h3 className="flaticon-bedroom display-3 font-weight-normal text-primary mb-3"></h3>
                    <h5 className="mb-3 font-weight-bold">Bedroom Design</h5>
                    <p className="m-0 text-muted">
                      Master bedrooms and suites with built-in storage, calming color palettes, and ambient lighting.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex flex-column text-center bg-light p-4 h-100">
                    <h3 className="flaticon-kitchen display-3 font-weight-normal text-primary mb-3"></h3>
                    <h5 className="mb-3 font-weight-bold">Kitchen Design</h5>
                    <p className="m-0 text-muted">
                      Contemporary and classic kitchens utilizing Acrylic, PolyLac, and German HPL boards.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex flex-column text-center bg-light p-4 h-100">
                    <h3 className="flaticon-living-room display-3 font-weight-normal text-primary mb-3"></h3>
                    <h5 className="mb-3 font-weight-bold">Dressing Rooms</h5>
                    <p className="m-0 text-muted">
                      Bespoke walk-in dressing rooms with reflective glass, sensor LED bars, and custom compartments.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex flex-column text-center bg-light p-4 h-100">
                    <h3 className="flaticon-bathroom display-3 font-weight-normal text-primary mb-3"></h3>
                    <h5 className="mb-3 font-weight-bold">Bathroom Units</h5>
                    <p className="m-0 text-muted">
                      100% moisture and water-resistant vanity units with premium finishes and clean joinery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Services End */}

      <Footer />
    </div>
  );
}
