import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePageClient from '@/components/HomePageClient';
import { getProducts } from '@/lib/products-service';

export const revalidate = 0; // Ensure fresh data from Supabase/store

export default async function HomePage() {
  const products = await getProducts({ status: 'published' });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HomePageClient initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
