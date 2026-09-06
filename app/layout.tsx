import type { Metadata } from 'next';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'فلورنس للمطابخ والأثاث الراقي | Florence Kitchen & Furniture',
  description: 'تصميم وتنفيذ أرقى المطابخ المودرن والكلاسيك وغرف الملابس (Dressing Rooms) ووحدات الديكور بأعلى معايير الجودة وخامات مستوردة وضمان 10 سنوات - مدينة العبور، مصر.',
  keywords: ['مطابخ فلورنس', 'مطبخ مودرن', 'مطابخ اكريليك', 'دريسنج روم', 'فلورنس كيتشن', 'مطابخ مدينة العبور', 'مطابخ مصر'],
  openGraph: {
    title: 'Florence Kitchen & Furniture | فلورنس للمطابخ',
    description: 'أرقى تصاميم وتنفيذات المطابخ والدريسنج روم والأثاث المودرن في مصر.',
    images: ['/img/1.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#121217] text-gray-200 antialiased selection:bg-primary selection:text-black">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
