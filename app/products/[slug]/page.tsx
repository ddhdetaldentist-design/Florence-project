import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductBySlug, getProducts } from '@/lib/products-service';
import ProductGallery from './ProductGallery';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Get related products in same category
  const allInCat = await getProducts({ category: product.category, status: 'published' });
  const relatedProducts = allInCat.filter((p) => p.id !== product.id).slice(0, 3);

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail || '/img/1.jpg'];

  const whatsappMessage = encodeURIComponent(
    `Hello Florence Kitchen, I would like to inquire about details and pricing for design: "${product.title}"`
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-8 text-center text-md-left">
              <h1 className="mb-4 mb-md-0 text-primary text-uppercase font-weight-bold">
                {product.title}
              </h1>
            </div>
            <div className="col-md-4 text-center text-md-right">
              <div className="d-inline-flex align-items-center">
                <Link className="btn btn-outline-primary" href="/" style={{ borderRadius: '0' }}>
                  Home
                </Link>
                <i className="fas fa-angle-double-right text-primary mx-2"></i>
                <Link
                  className="btn btn-outline-primary"
                  href="/products"
                  style={{ borderRadius: '0' }}
                >
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Detail Content Start */}
      <main className="container py-5 flex-grow">
        <div className="row pt-4">
          {/* Main Column */}
          <div className="col-lg-8">
            <div className="d-flex flex-column text-left mb-4">
              <span className="text-primary font-weight-bold text-uppercase mb-2">
                {product.category === 'kitchens'
                  ? 'Kitchen Design'
                  : product.category === 'dressing'
                  ? 'Dressing Room'
                  : 'Interior Furniture'}
              </span>
              <h1 className="mb-4 section-title font-weight-bold">{product.title}</h1>
              <div className="d-flex flex-wrap align-items-center text-muted mb-3" style={{ gap: '15px' }}>
                <span>
                  <i className="fa fa-shield-alt text-primary mr-1"></i> 10-Year Certified Warranty
                </span>
                <span>
                  <i className="fa fa-map-marker-alt text-primary mr-1"></i> Obour City
                </span>
                <span>
                  <i className="fa fa-check-circle text-primary mr-1"></i> 100% European Materials
                </span>
              </div>
            </div>

            {/* Gallery */}
            <ProductGallery images={imagesList} title={product.title} />

            {/* Description */}
            <div className="mb-5">
              <h4 className="font-weight-bold mb-3">Project Description & Specifications:</h4>
              <p className="lead" style={{ lineHeight: '1.9', color: '#555' }}>
                {product.description}
              </p>

              {/* Specs Table */}
              {product.specs && (
                <div className="mt-4 border bg-light p-4">
                  <h5 className="font-weight-bold text-secondary mb-3">
                    <i className="fa fa-list-alt text-primary mr-2"></i> Technical Specifications
                  </h5>
                  <div className="row">
                    {product.specs.material && (
                      <div className="col-sm-6 mb-3">
                        <strong className="d-block text-secondary">Materials:</strong>
                        <span className="text-muted">{product.specs.material}</span>
                      </div>
                    )}
                    {product.specs.accessories && (
                      <div className="col-sm-6 mb-3">
                        <strong className="d-block text-secondary">Fittings & Movement:</strong>
                        <span className="text-muted">{product.specs.accessories}</span>
                      </div>
                    )}
                    {product.specs.warranty && (
                      <div className="col-sm-6 mb-3">
                        <strong className="d-block text-secondary">Warranty:</strong>
                        <span className="text-muted">{product.specs.warranty}</span>
                      </div>
                    )}
                    {product.specs.color && (
                      <div className="col-sm-6 mb-3">
                        <strong className="d-block text-secondary">Color & Finish:</strong>
                        <span className="text-muted">{product.specs.color}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Booking CTA */}
            <div className="p-4 bg-secondary text-white mb-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
              <div>
                <h4 className="text-primary font-weight-bold mb-1">
                  Interested in this design for your space?
                </h4>
                <p className="m-0 text-white-50">
                  Contact us for free site measurements and custom 3D design rendering.
                </p>
              </div>
              <a
                href={`https://wa.me/201065772456?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary font-weight-bold px-4 py-3 mt-3 mt-md-0 d-inline-flex align-items-center text-nowrap"
                style={{ borderRadius: '0' }}
              >
                <i className="fab fa-whatsapp mr-2 text-dark font-weight-bold" style={{ fontSize: '18px' }}></i>
                Inquire & Book Consultation
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 mt-5 mt-lg-0">
            {/* Direct Contact Card */}
            <div className="bg-light p-4 mb-4 border">
              <h5 className="text-secondary font-weight-bold mb-3">
                <i className="fa fa-phone-alt text-primary mr-2"></i> Direct Management Contact
              </h5>
              <p className="text-muted small mb-3">
                Eng. Mohamed Atef and our engineering team are available to answer your technical questions and organize your consultation.
              </p>
              <div className="mb-2">
                <strong>Phone: </strong>
                <a href="tel:01065772456" className="text-primary font-weight-bold">
                  0106 577 2456
                </a>
              </div>
              <div className="mb-3">
                <strong>Showroom: </strong>
                <span className="text-muted">Obour City - 9th District - Qatar Al Nada St.</span>
              </div>
              <a
                href={`https://wa.me/201065772456?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block font-weight-bold py-2 text-dark"
                style={{ borderRadius: '0' }}
              >
                <i className="fab fa-whatsapp mr-1"></i> WhatsApp Message
              </a>
            </div>

            {/* Related Projects */}
            {relatedProducts.length > 0 && (
              <div className="border bg-white p-4">
                <h5 className="text-secondary font-weight-bold mb-4 border-bottom pb-2">
                  Related Projects
                </h5>
                {relatedProducts.map((rel) => (
                  <div key={rel.id} className="d-flex mb-3 align-items-center">
                    <img
                      src={rel.thumbnail || rel.images?.[0] || '/img/1.jpg'}
                      alt={rel.title}
                      style={{ width: '75px', height: '65px', objectFit: 'cover' }}
                      className="mr-3 border"
                    />
                    <div>
                      <Link
                        href={`/products/${rel.slug}`}
                        className="text-dark font-weight-bold d-block small"
                        style={{ textDecoration: 'none' }}
                      >
                        {rel.title}
                      </Link>
                      <span className="text-primary small font-weight-bold">
                        {rel.specs?.warranty || '10-Year Warranty'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
