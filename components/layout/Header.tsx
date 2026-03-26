'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Phone, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order' },
  { href: '/deals', label: 'Deals' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

  return (
    <header className="sticky top-0 z-50 bg-[#3B0A0A] border-b border-[#5c1010] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-[#FFD700] tracking-wide">
              JUMBO PIZZA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#FFD700] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:6134461291"
              className="hidden sm:flex items-center gap-1.5 text-[#FFD700] hover:text-[#FFE44D] transition-colors font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">613-446-1291</span>
            </a>

            <button
              onClick={openCart}
              className="relative p-2 text-white hover:text-[#FFD700] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {count > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#FFD700] text-[#1a0505] text-xs font-bold rounded-full">
                  {count}
                </Badge>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white hover:text-[#FFD700] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#5c1010] py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-2 text-white hover:text-[#FFD700] hover:bg-[#5c1010] rounded transition-colors font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:6134461291"
                className="flex items-center gap-1.5 px-2 py-2 text-[#FFD700] font-semibold"
              >
                <Phone className="w-4 h-4" />
                613-446-1291
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
