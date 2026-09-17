import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePageClient from '@/components/HomePageClient';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProducts } from '@/lib/products-service';
import { getSiteSettings, getTestimonials, getTeamMembers } from '@/lib/site-settings-service';

export const revalidate = 0; // Ensure fresh data from Supabase/store

export default async function HomePage() {
  const [products, settings, testimonials, team] = await Promise.all([
    getProducts({ status: 'published' }),
    getSiteSettings(),
    getTestimonials(),
    getTeamMembers(),
  ]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <main className="flex-grow">
        <HomePageClient 
          initialProducts={products} 
          initialSettings={settings}
          initialTestimonials={testimonials}
          initialTeam={team}
        />
      </main>
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.contact.whatsapp} />
    </div>
  );
}
