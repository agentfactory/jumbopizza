import Link from 'next/link';
import { Phone, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const deliveryAreas = [
  'Clarence', 'Clarence Creek', 'Cumberland', 'Plantagenet',
  'Rockland', 'Sarsfield', 'Treadwell', 'Wendover',
  'Pendleton', 'Surrounding camping grounds & ferries',
];

export function Footer() {
  return (
    <footer className="bg-[#3B0A0A] border-t border-[#5c1010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-bold text-[#FFD700] mb-2">
              JUMBO PIZZA
            </h2>
            <p className="text-[#FFE44D] font-semibold mb-3">Biggest Pizza in Rockland!</p>
            <p className="text-gray-300 text-sm">
              Jumbo Sized Pizza with Jumbo Size Value! Family-owned and operated in Rockland, Ontario.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors flex items-center gap-1"
                aria-label="Facebook"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-xs">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors flex items-center gap-1"
                aria-label="Instagram"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-xs">Instagram</span>
              </a>
            </div>
          </div>

          {/* Hours & Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-[#FFD700] mb-4">Hours & Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <div>
                  <p>Sun–Thur: 11AM – 9PM</p>
                  <p>Fri–Sat: 11AM – 10PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                <a href="tel:6134461291" className="hover:text-[#FFD700] transition-colors font-semibold">
                  613-446-1291
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <span>Rockland, Ontario</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-[#FFD700] mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              {[
                { href: '/menu', label: 'View Menu' },
                { href: '/order', label: 'Order Online' },
                { href: '/deals', label: 'Deals & Specials' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#FFD700] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Delivery Areas */}
          <div>
            <h3 className="font-display text-lg font-semibold text-[#FFD700] mb-4">Delivery Areas</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              {deliveryAreas.map((area) => (
                <li key={area} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-[#5c1010]" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Jumbo Pizza Rockland. All rights reserved.</p>
          <p>Taxes extra &bull; Prices subject to change without notice</p>
        </div>
      </div>
    </footer>
  );
}
