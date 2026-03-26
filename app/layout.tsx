import type { Metadata } from 'next';
import { Inter, Oswald, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartSheet } from '@/components/cart/CartSheet';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Jumbo Pizza Rockland | Biggest Pizza in Rockland!',
    template: '%s | Jumbo Pizza Rockland',
  },
  description:
    'Jumbo Sized Pizza with Jumbo Size Value! Family-owned pizza restaurant in Rockland, Ontario. Online ordering, delivery available.',
  keywords: ['pizza', 'Rockland', 'Ontario', 'delivery', 'poutine', 'wings', 'pizza deals'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#1a0505] text-white font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartSheet />
      </body>
    </html>
  );
}
