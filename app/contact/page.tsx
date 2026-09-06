'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Florence, my name is ${formData.name} (Phone: ${formData.phone})\nSubject: ${formData.subject}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/201065772456?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-6 text-center text-md-left">
              <h1 className="mb-4 mb-md-0 text-primary text-uppercase font-weight-bold">
                Contact Us
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
                  Contact Us
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Contact Start */}
      <main className="container-fluid bg-white flex-grow">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 p-0">
              <div className="d-flex flex-column justify-content-center bg-primary h-100 p-5">
                <div className="d-inline-flex border border-secondary p-4 mb-4 align-items-center">
                  <h1 className="flaticon-office font-weight-normal text-secondary m-0 mr-3"></h1>
                  <div className="d-flex flex-column">
                    <h4 className="text-secondary font-weight-bold">Our Office</h4>
                    <p className="m-0 text-dark">
                      Obour City - Ninth District - Qatar Al Nada Street
                    </p>
                  </div>
                </div>
                <div className="d-inline-flex border border-secondary p-4 mb-4 align-items-center">
                  <h1 className="flaticon-email font-weight-normal text-secondary m-0 mr-3"></h1>
                  <div className="d-flex flex-column">
                    <h4 className="text-secondary font-weight-bold">Email Us</h4>
                    <p className="m-0 text-dark">florencenew2020@gmail.com</p>
                  </div>
                </div>
                <div className="d-inline-flex border border-secondary p-4 align-items-center">
                  <h1 className="flaticon-telephone font-weight-normal text-secondary m-0 mr-3"></h1>
                  <div className="d-flex flex-column">
                    <h4 className="text-secondary font-weight-bold">Call Us</h4>
                    <p className="m-0 text-dark">0106 577 2456</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 mb-5 my-lg-5 py-5 pl-lg-5">
              <div className="contact-form">
                <h6 className="text-primary font-weight-normal text-uppercase mb-2">Get In Touch</h6>
                <h2 className="font-weight-bold mb-4">Send Us A Message</h2>

                {submitted ? (
                  <div className="alert alert-success p-4">
                    <h5 className="font-weight-bold mb-2">
                      <i className="fa fa-check-circle mr-2"></i> Message Sent Successfully!
                    </h5>
                    <p className="m-0">
                      Our customer service team will reach out to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control p-4 border"
                        placeholder="Your Full Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ borderRadius: '0' }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="tel"
                        className="form-control p-4 border"
                        placeholder="Phone / WhatsApp Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ borderRadius: '0' }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control p-4 border"
                        placeholder="Subject (e.g. Kitchen Renovation, Dressing Room)"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        style={{ borderRadius: '0' }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <textarea
                        className="form-control p-4 border"
                        rows={5}
                        placeholder="Tell us about your room dimensions or any specific ideas..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{ borderRadius: '0' }}
                      ></textarea>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary py-3 px-5 font-weight-bold text-dark"
                        type="submit"
                        style={{ borderRadius: '0' }}
                      >
                        <i className="fab fa-whatsapp mr-2"></i> Send Inquiry via WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Contact End */}

      <Footer />
    </div>
  );
}
