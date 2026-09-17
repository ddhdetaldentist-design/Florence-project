import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getSiteSettings, getTeamMembers } from '@/lib/site-settings-service';

export const revalidate = 0;

export const metadata = {
  title: 'About Us | florence-kitchen',
  description: '40+ Years Experience In Furniture and kitchen design - Obour City.',
};

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar settings={settings} />

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
                <h4 className="display-3 mb-3 text-secondary font-weight-bold">
                  {settings.about.yearsExperience}
                </h4>
                <h1 className="m-0 text-secondary font-weight-bold">
                  {settings.about.experienceSubtitle}
                </h1>
                <p className="small text-secondary font-weight-bold mt-2 mb-0">
                  {settings.about.tagline}
                </p>
              </div>
            </div>
            <div className="col-lg-7 m-0 my-lg-5 pt-5 pb-5 pb-lg-2 pl-lg-5">
              <h6 className="text-primary font-weight-normal text-uppercase mb-3">
                {settings.about.experienceBadge}
              </h6>
              <h1 className="mb-4 section-title font-weight-bold">
                {settings.about.title}
              </h1>
              <p className="mb-4" style={{ lineHeight: '1.8' }}>
                {settings.about.description}
              </p>
              <div className="row py-2">
                {settings.about.pillars.map((pillar, idx) => (
                  <div key={idx} className="col-sm-6 mb-3">
                    <div className="d-flex align-items-center bg-white p-3 border shadow-sm">
                      <h1 className={`${pillar.icon || 'flaticon-house'} font-weight-normal text-primary m-0 mr-3`} style={{ fontSize: '32px' }}></h1>
                      <div>
                        <h5 className="text-truncate m-0 font-weight-bold">{pillar.title}</h5>
                        <small className="text-muted">{pillar.subtitle}</small>
                      </div>
                    </div>
                  </div>
                ))}
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
                {settings.whyChooseUs.badge}
              </h6>
              <h1 className="mb-4 section-title font-weight-bold">
                {settings.whyChooseUs.title}
              </h1>
              <p className="mb-4" style={{ lineHeight: '1.8' }}>
                {settings.whyChooseUs.description}
              </p>
              <ul className="list-inline">
                {settings.whyChooseUs.features.map((feat, idx) => (
                  <li key={idx} className="mb-2">
                    <h5>
                      <i className="far fa-check-square text-primary mr-3"></i>
                      {feat.title}
                    </h5>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5 p-0">
              <div className="d-flex flex-column align-items-center justify-content-center h-100 overflow-hidden bg-dark">
                <video
                  src={settings.whyChooseUs.videoUrl}
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
                {team.map((member, idx) => (
                  <div key={member.id || idx} className="col-md-6 mb-4 mb-md-0">
                    <div className="team d-flex flex-column text-center mx-3 shadow-sm bg-white">
                      <div className="position-relative">
                        <img className="img-fluid w-100" src={member.image} alt={member.name} />
                      </div>
                      <div className="d-flex flex-column bg-secondary text-center py-3">
                        <h5 className="text-white font-weight-bold mb-1">{member.name}</h5>
                        <p className="m-0 text-primary small text-uppercase">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.contact.whatsapp} />
    </div>
  );
}
