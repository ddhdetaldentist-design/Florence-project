'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({ whatsappNumber }: { whatsappNumber?: string }) {
  const phoneNumber = whatsappNumber || '201065772456';
  const defaultMessage = encodeURIComponent(
    'Hello Florence, I would like to inquire about kitchen designs and custom projects.'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl shadow-green-900/40 hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-sm group"
      style={{ textDecoration: 'none' }}
      aria-label="Contact via WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      </div>
      <span className="hidden sm:inline font-semibold">Chat with Design Consultant</span>
    </a>
  );
}
