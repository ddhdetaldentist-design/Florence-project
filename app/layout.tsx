import type { Metadata } from 'next';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'florence-kitchen',
  description: 'We Are The Best Furniture and kitchen design In Your City - Obour City, Egypt.',
  icons: {
    icon: [
      { url: '/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png' },
    ],
    shortcut: '/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/img/WhatsApp_Image_2022-09-26_at_10.58.16_PM-removebg-preview.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/lib/flaticon/font/flaticon.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
        <link href="/css/newstyle.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
