import Link from 'next/link';
import Image from 'next/image';
import { Phone, Clock, MapPin, Star, Truck, Users, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    icon: Pizza,
    title: '18" XL Pizza',
    description: 'Massive XL pizzas perfect for the whole family',
  },
  {
    icon: Star,
    title: 'Fresh Daily',
    description: 'Made fresh every day with quality ingredients',
  },
  {
    icon: Truck,
    title: 'Delivery Available',
    description: 'We deliver to Rockland and surrounding areas',
  },
  {
    icon: Users,
    title: 'Family Owned',
    description: 'Proudly family-owned and operated in Rockland',
  },
];

const featuredDeals = [
  {
    name: 'Pizza & Pickles',
    description: 'Pizza + our famous deep fried pickles',
    price: '$33.95',
  },
  {
    name: 'Pizza & Wings',
    description: 'Pizza + 10 wings of your choice',
    price: '$33.95',
  },
  {
    name: 'Pizza & Curly Poutine',
    description: 'Pizza + a delicious curly poutine',
    price: '$33.95',
  },
];

const deliveryAreas = [
  'Clarence', 'Clarence Creek', 'Cumberland', 'Plantagenet',
  'Rockland', 'Sarsfield', 'Treadwell', 'Wendover',
  'Pendleton', 'Surrounding camping grounds & ferries',
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80"
          alt="Delicious pizza"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505]/80 via-[#1a0505]/70 to-[#1a0505]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-[#FFD700] mb-4 tracking-wide">
            JUMBO PIZZA
          </h1>
          <p className="text-2xl sm:text-3xl font-display font-semibold text-white mb-2">
            Biggest Pizza in Rockland!
          </p>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Jumbo Sized Pizza with Jumbo Size Value. Fresh, delicious, and delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold text-lg px-8 py-6"
            >
              <Link href="/menu">Order Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#3B0A0A] font-bold text-lg px-8 py-6 bg-transparent"
            >
              <a href="tel:6134461291">
                <Phone className="w-5 h-5 mr-2" />
                613-446-1291
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6 text-center hover:border-[#FFD700] transition-colors"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-[#3B0A0A] rounded-full">
                  <h.icon className="w-8 h-8 text-[#FFD700]" />
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold text-[#FFD700] mb-1">{h.title}</h3>
              <p className="text-sm text-gray-400">{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hours */}
      <section className="py-12 px-4 bg-[#240808]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-[#FFD700] mb-8">Hours of Operation</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#FFD700]" />
                <span className="font-semibold text-[#FFD700]">Sun – Thursday</span>
              </div>
              <p className="text-white text-lg font-bold">11 AM – 9 PM</p>
            </div>
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#FFD700]" />
                <span className="font-semibold text-[#FFD700]">Fri – Saturday</span>
              </div>
              <p className="text-white text-lg font-bold">11 AM – 10 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-[#FFD700] mb-2">
            Monday – Wednesday Deals
          </h2>
          <p className="text-gray-400">Save big on these incredible combo deals</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {featuredDeals.map((deal) => (
            <div
              key={deal.name}
              className="bg-[#2d0a0a] border-2 border-[#FFD700]/30 rounded-xl p-6 text-center hover:border-[#FFD700] transition-colors"
            >
              <div className="inline-block bg-[#FFD700] text-[#1a0505] text-xs font-bold px-2 py-1 rounded-full mb-3">
                MON–WED ONLY
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-1">{deal.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{deal.description}</p>
              <p className="text-2xl font-bold text-[#FFD700]">{deal.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold">
            <Link href="/deals">View All Deals</Link>
          </Button>
        </div>
      </section>

      {/* Crust Options Notice */}
      <section className="py-10 px-4 bg-[#240808]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#FFD700] font-semibold text-lg mb-2">Crust Options Available</p>
          <p className="text-gray-300">
            Natural &bull; Cauliflower &bull; Keto &bull; Gluten Free &nbsp;|&nbsp; Vegan Cheese Available
          </p>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-[#FFD700] mb-2">Delivery Areas</h2>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>We deliver to all these locations and more</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {deliveryAreas.map((area) => (
            <span
              key={area}
              className="bg-[#2d0a0a] border border-[#5c1010] rounded-full px-4 py-2 text-sm text-gray-300"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#3B0A0A] text-center">
        <h2 className="font-display text-4xl font-bold text-[#FFD700] mb-4">Ready to Order?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          Order online or give us a call. We&apos;ll have your food ready fresh and hot!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold text-lg px-8"
          >
            <Link href="/menu">Order Online</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-[#5c1010] font-bold text-lg px-8 bg-transparent"
          >
            <a href="tel:6134461291">
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
