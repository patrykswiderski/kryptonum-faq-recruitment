import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/global.scss';
import { SanityLive } from '@/sanity-config/lib/live';

const PoppinsFont = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kryptonum',
  description: 'Kryptonum',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={PoppinsFont.variable}>{children}</body>
      <SanityLive />
    </html>
  );
}
