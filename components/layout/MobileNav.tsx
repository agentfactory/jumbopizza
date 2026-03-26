'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order Online' },
  { href: '/deals', label: 'Deals' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 text-white hover:text-[#FFD700] transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute right-0 top-0 h-full w-72 bg-[#2a0707] flex flex-col shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-[#5c1010]">
              <span className="font-display text-xl font-bold text-[#FFD700]">JUMBO PIZZA</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-[#FFD700] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-1 p-4 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-white hover:text-[#FFD700] hover:bg-[#3B0A0A] rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-[#5c1010]">
              <a
                href="tel:6134461291"
                className="flex items-center gap-2 text-[#FFD700] font-semibold"
              >
                <Phone className="w-4 h-4" />
                613-446-1291
              </a>
              <p className="text-xs text-gray-400 mt-1">Sun–Thur 11AM–9PM | Fri–Sat 11AM–10PM</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
