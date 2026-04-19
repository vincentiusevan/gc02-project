import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import Footer from '@/components/Footer';
import { getUserLogin } from '@/server/helpers/auth';
import Image from 'next/image';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'VKEA Home Living',
    template: '%s | VKEA',
  },
  description: 'Furniture sederhana untuk rumah yang nyaman.',
  openGraph: {
    title: 'VKEA Home Living',
    description: 'Furniture sederhana untuk rumah yang nyaman.',
    siteName: 'VKEA',
    images: ['/images/vkea-logo.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserLogin();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#f7f7f2] text-neutral-950">
        <nav className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/vkea-logo.svg"
                alt="VKEA"
                width={260}
                height={96}
                className="h-16 w-44 sm:h-20 sm:w-56"
                priority
              />
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm font-bold sm:gap-6 sm:text-base">
              <Link href="/" className="hover:text-blue-700">
                Home
              </Link>
              <Link href="/products" className="hover:text-blue-700">
                Products
              </Link>
              <Link href="/wishlist" className="hover:text-blue-700">
                Wishlist
              </Link>
              {user ? (
                <LogoutButton />
              ) : (
                <>
                  <Link href="/login" className="hover:text-blue-700">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-md bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-neutral-100">
            <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-4 py-3 text-sm font-semibold text-neutral-600 sm:px-6">
              <Link href="/products" className="whitespace-nowrap hover:text-blue-700">
                Ruang tamu
              </Link>
              <Link href="/products" className="whitespace-nowrap hover:text-blue-700">
                Kamar tidur
              </Link>
              <Link href="/products" className="whitespace-nowrap hover:text-blue-700">
                Ruang kerja
              </Link>
              <Link href="/products" className="whitespace-nowrap hover:text-blue-700">
                Penyimpanan
              </Link>
              <Link href="/products" className="whitespace-nowrap hover:text-blue-700">
                Dekorasi
              </Link>
              <Link href="/products" className="whitespace-nowrap hover:text-blue-700">
                Promo
              </Link>
            </div>
          </div>
        </nav>

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
