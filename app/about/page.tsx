import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us | florence-kitchen',
  description: '40+ Years Experience In Furniture and kitchen design - Obour City.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container py-5">
          <div className="row align-items-center py-4">
            <div className="col-md-6 text-center text-md-left">
              <h1 className="mb-4 mb-md-0 text-primary text-uppercase font-weight-bold">
                About Us
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
                  About Us
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* About Start */}
      <div className="container-fluid bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 p-0">
              <div className="d-flex flex-column align-items-center justify-content-center bg-primary h-100 py-5 px-3 text-center">
                <i className="flaticon-brickwall display-1 font-weight-normal text-secondary mb-3"></i>
                <h4 className="display-3 mb-3 text-secondary font-weight-bold">40+</h4>
                <h1 className="m-0 text-secondary font-weight-bold">Years Experience</h1>
              </div>
            </div>
            <div className="col-lg-7 m-0 my-lg-5 pt-5 pb-5 pb-lg-2 pl-lg-5">
              <h6 className="text-primary font-weight-normal text-uppercase mb-3">
                Learn About Us
              </h6>
              <h1 className="mb-4 section-title font-weight-bold">
                We Are The Best Furniture and kitchen design In Your City
              </h1>
              <p className="mb-4" style={{ lineHeight: '1.8' }}>
                Florence specializes in designing and manufacturing top-tier modern kitchens (Acrylic, PolyLac, HPL, and natural wood veneer), architectural dressing rooms, and modern residential furniture. We leverage modern machinery and experienced craftsmen to deliver products combining timeless elegance, durability, and practical utility.
              </p>
              <div className="row py-2">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-house font-weight-normal text-primary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0 font-weight-bold">Project Planning</h5>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-stairs font-weight-normal text-primary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0 font-weight-bold">Interior design</h5>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-office font-weight-normal text-primary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0 font-weight-bold">best price</h5>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="flaticon-living-room font-weight-normal text-primary m-0 mr-3"></h1>
                    <h5 className="text-truncate m-0 font-weight-bold">furniture design</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Features Start */}
      <div className="container-fluid bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mt-5 py-5 pr-lg-5">
              <h6 className="text-primary font-weight-normal text-uppercase mb-3">
                Why Choose Us?
              </h6>
              <h1 className="mb-4 section-title font-weight-bold">
                40+ Years Experience In Furniture and kitchen design
              </h1>
              <p className="mb-4" style={{ lineHeight: '1.8' }}>
                We guarantee a smooth and seamless execution process starting with on-site inspection, accurate 3D preview rendering, and on-time installation with a certified 10-year warranty.
              </p>
              <ul className="list-inline">
                <li className="mb-2">
                  <h5>
                    <i className="far fa-check-square text-primary mr-3"></i>
                    40+ Years Experience
                  </h5>
                </li>
                <li className="mb-2">
                  <h5>
                    <i className="far fa-check-square text-primary mr-3"></i>
                    Best Interior Design & Quality Materials
                  </h5>
                </li>
                <li className="mb-2">
                  <h5>
                    <i className="far fa-check-square text-primary mr-3"></i>
                    Customer Satisfaction & Reliable Warranty
                  </h5>
                </li>
              </ul>
            </div>
            <div className="col-lg-5 p-0">
              <div className="d-flex flex-column align-items-center justify-content-center h-100 overflow-hidden bg-dark">
                <video
                  src="/video/VE Project 2-2.mp4"
                  controls
                  className="w-100 h-100"
                  style={{ minHeight: '340px', objectFit: 'cover' }}
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features End */}

      {/* Team Start */}
      <div className="container-fluid bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 p-0">
              <div className="py-5 px-4 h-100 bg-primary d-flex flex-column align-items-center justify-content-center text-center">
                <h6 className="text-secondary font-weight-normal text-uppercase mb-3">Our Team</h6>
                <h1 className="mb-0 text-secondary font-weight-bold">Meet Our Team Members</h1>
              </div>
            </div>
            <div className="col-md-8 col-sm-6 p-0 py-sm-5">
              <div className="row mx-0 py-sm-3">
                <div className="col-md-6 mb-4 mb-md-0">
                  <div className="team d-flex flex-column text-center mx-3 shadow-sm bg-white">
                    <div className="position-relative">
                      <img className="img-fluid w-100" src="/img/prof.jpg" alt="eng-mohamed atef" />
                    </div>
                    <div className="d-flex flex-column bg-secondary text-center py-3">
                      <h5 className="text-white font-weight-bold mb-1">Eng. Mohamed Atef</h5>
                      <p className="m-0 text-primary small text-uppercase">Owner & General Manager</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="team d-flex flex-column text-center mx-3 shadow-sm bg-white">
                    <div className="position-relative">
                      <img className="img-fluid w-100" src="/img/prof.jpg" alt="mr-hassan samhan" />
                    </div>
                    <div className="d-flex flex-column bg-secondary text-center py-3">
                      <h5 className="text-white font-weight-bold mb-1">Hassan Samhan</h5>
                      <p className="m-0 text-primary small text-uppercase">Sales & Design Consultant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

      <Footer />
    </div>
  );
}
