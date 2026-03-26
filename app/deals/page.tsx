import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deals & Specials',
  description: 'Incredible pizza deals at Jumbo Pizza Rockland. Monday–Wednesday specials and platter deals.',
};

const pizzaDeals = [
  {
    name: 'Pizza & Pickles',
    description: 'Your choice of pizza + deep fried pickles (10 pcs)',
    price: '$33.95',
    badge: 'MON–WED',
  },
  {
    name: 'Pizza & Curds',
    description: 'Your choice of pizza + deep fried cheese curds',
    price: '$33.95',
    badge: 'MON–WED',
  },
  {
    name: 'X-Large Deal',
    description: 'An XL pizza at a special deal price',
    price: '$33.95',
    badge: 'MON–WED',
  },
  {
    name: 'Pizza & Wings',
    description: 'Your choice of pizza + 10 wings with your choice of sauce',
    price: '$33.95',
    badge: 'MON–WED',
  },
  {
    name: 'Medium Deal',
    description: 'A medium pizza combo deal',
    price: '$33.95',
    badge: 'MON–WED',
  },
  {
    name: 'Pizza & Curly Poutine',
    description: 'Your choice of pizza + a large curly poutine',
    price: '$33.95',
    badge: 'MON–WED',
  },
];

const platterDeals = [
  {
    name: 'Munchies Platter',
    description: 'A hearty combo platter for snacking',
    price: '$38.95',
  },
  {
    name: 'Game Time Platter',
    description: 'The ultimate platter for game night',
    price: '$38.95',
  },
  {
    name: 'Holiday Platter',
    description: 'A festive platter for celebrations',
    price: '$38.95',
  },
  {
    name: 'Snack Attack Platter',
    description: 'The perfect snack platter for any occasion',
    price: '$38.95',
  },
];

export default function DealsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-[#FFD700] mb-3">Deals & Specials</h1>
          <p className="text-gray-400 text-lg">Big savings on Jumbo-sized value</p>
        </div>

        {/* Pizza Deals */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#5c1010]" />
            <h2 className="font-display text-2xl font-bold text-[#FFD700] whitespace-nowrap">
              Monday – Wednesday Pizza Deals
            </h2>
            <div className="h-px flex-1 bg-[#5c1010]" />
          </div>

          <div className="bg-[#3B0A0A] border border-[#FFD700]/30 rounded-xl p-4 mb-6 text-center">
            <p className="text-[#FFD700] font-semibold">
              Available Monday, Tuesday & Wednesday only. Call or order online to claim!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzaDeals.map((deal) => (
              <div
                key={deal.name}
                className="bg-[#2d0a0a] border-2 border-[#5c1010] hover:border-[#FFD700] rounded-xl p-6 transition-colors flex flex-col"
              >
                <div className="mb-4">
                  <Badge className="bg-[#FFD700] text-[#1a0505] font-bold text-xs mb-3">
                    {deal.badge}
                  </Badge>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{deal.name}</h3>
                  <p className="text-gray-400 text-sm flex-1">{deal.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#5c1010]">
                  <p className="text-3xl font-bold text-[#FFD700] mb-4">{deal.price}</p>
                  <Button
                    asChild
                    className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold"
                  >
                    <Link href="/menu">Order This Deal</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platter Deals */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#5c1010]" />
            <h2 className="font-display text-2xl font-bold text-[#FFD700] whitespace-nowrap">
              Platter Deals
            </h2>
            <div className="h-px flex-1 bg-[#5c1010]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platterDeals.map((deal) => (
              <div
                key={deal.name}
                className="bg-[#2d0a0a] border-2 border-[#5c1010] hover:border-[#FFD700] rounded-xl p-6 transition-colors flex flex-col"
              >
                <div className="mb-4 flex-1">
                  <h3 className="font-display text-lg font-bold text-white mb-2">{deal.name}</h3>
                  <p className="text-gray-400 text-sm">{deal.description}</p>
                </div>
                <div className="pt-4 border-t border-[#5c1010]">
                  <p className="text-2xl font-bold text-[#FFD700] mb-3">{deal.price}</p>
                  <Button
                    asChild
                    className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold text-sm"
                  >
                    <Link href="/menu">Order Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#3B0A0A] border border-[#5c1010] rounded-xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-[#FFD700] mb-2">
            Ready to Save Big?
          </h3>
          <p className="text-gray-400 mb-6">
            Browse our full menu and find your perfect combo
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold px-8"
          >
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
