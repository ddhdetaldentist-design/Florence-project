import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-6 text-center text-md-left">
              <h1 className="mb-4 mb-md-0 text-primary text-uppercase font-weight-bold">
                Page Not Found
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
                  404 Error
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container py-5 my-5 flex-grow text-center">
        <h1 className="display-1 text-primary font-weight-bold">404</h1>
        <h2 className="mb-4 font-weight-bold">Sorry, Page Not Found</h2>
        <p className="lead text-muted mb-5">
          The link you requested is unavailable or has been moved. You can return to the homepage or explore our projects portfolio.
        </p>
        <div>
          <Link
            href="/"
            className="btn btn-secondary py-3 px-5 mr-3 font-weight-bold"
            style={{ borderRadius: '0' }}
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="btn btn-primary py-3 px-5 font-weight-bold text-dark"
            style={{ borderRadius: '0' }}
          >
            Browse Projects
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
