import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Direktori Usaha Kota Singkawang',
  description: 'Temukan usaha dan UMKM di Kota Singkawang. Cari warung makan, toko, restoran, UMKM, dan berbagai usaha lokal dengan mudah.',
  openGraph: {
    title: 'Direktori Usaha Kota Singkawang',
    description: 'Temukan usaha dan UMKM di Kota Singkawang. Cari warung makan, toko, restoran, UMKM, dan berbagai usaha lokal dengan mudah.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
