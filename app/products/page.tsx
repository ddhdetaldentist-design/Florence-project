'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products-service';
import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getProducts({ status: 'published' });
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        ((selectedCategory === 'kitchen' || selectedCategory === 'kitchens') &&
          (p.category === 'kitchens' || p.category === 'kitchen')) ||
        ((selectedCategory === 'dressing' || selectedCategory === 'dressing-rooms') &&
          (p.category === 'dressing' || p.category === 'dressing-rooms')) ||
        ((selectedCategory === 'living' || selectedCategory === 'living-rooms') &&
          (p.category === 'living-rooms' || p.category === 'living')) ||
        ((selectedCategory === 'furniture' || selectedCategory === 'custom') &&
          (p.category === 'furniture' || p.category === 'custom')) ||
        p.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.specs?.material && p.specs.material.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: products.length,
      kitchens: products.filter((p) => p.category === 'kitchens' || p.category === 'kitchen').length,
      dressing: products.filter((p) => p.category === 'dressing' || p.category === 'dressing-rooms').length,
      living: products.filter((p) => p.category === 'living-rooms' || p.category === 'living').length,
      furniture: products.filter((p) => p.category === 'furniture' || p.category === 'custom').length,
    };
  }, [products]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-6 text-center text-md-left">
              <h1 className="mb-4 mb-md-0 text-primary text-uppercase font-weight-bold">
                Our Projects
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
                  Our Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Projects Section */}
      <main className="container-fluid py-5 flex-grow">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 text-center mb-4">
              <h6 className="text-primary font-weight-normal text-uppercase mb-3">Our Projects</h6>
              <h1 className="mb-4 font-weight-bold">
                Some Of Our Awesome Interior Designing Projects
              </h1>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="row mb-4">
            <div className="col-md-6 mx-auto mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by model, material, or design style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: '0', height: '48px' }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary px-4 font-weight-bold"
                    type="button"
                    style={{ borderRadius: '0' }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 text-center">
              <ul className="list-inline mb-4 d-flex flex-wrap justify-content-center" style={{ gap: '8px' }}>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    selectedCategory === 'all' ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory('all')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  All Projects <span className="badge badge-light text-dark ml-1">{counts.all}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    selectedCategory === 'kitchen' || selectedCategory === 'kitchens' ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory('kitchens')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Kitchens <span className="badge badge-light text-dark ml-1">{counts.kitchens}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    selectedCategory === 'dressing' || selectedCategory === 'dressing-rooms' ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory('dressing-rooms')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Dressing Rooms <span className="badge badge-light text-dark ml-1">{counts.dressing}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    selectedCategory === 'living' || selectedCategory === 'living-rooms' ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory('living-rooms')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Living & Decor <span className="badge badge-light text-dark ml-1">{counts.living}</span>
                </li>
                <li
                  className={`btn btn-outline-primary m-1 px-3 py-2 font-weight-bold ${
                    selectedCategory === 'furniture' || selectedCategory === 'custom' ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory('furniture')}
                  style={{ borderRadius: '4px', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px' }}
                >
                  Custom Furniture <span className="badge badge-light text-dark ml-1">{counts.furniture}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading projects catalog...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="row mx-1">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fa fa-folder-open display-4 text-muted mb-3"></i>
              <h4>No projects found matching your search</h4>
              <p className="text-muted">Try searching with other keywords or select a different category.</p>
              <button
                className="btn btn-primary mt-2 font-weight-bold px-4 py-2"
                style={{ borderRadius: '0' }}
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
