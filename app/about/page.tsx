import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Star, Leaf } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Family-owned pizza restaurant in Rockland, Ontario. Learn about Jumbo Pizza and our commitment to quality.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-[#FFD700] mb-4">About Jumbo Pizza</h1>
          <p className="text-xl text-gray-300 font-display">
            Jumbo Sized Pizza with Jumbo Size Value!
          </p>
        </div>

        {/* Story */}
        <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-[#FFD700]" />
            <h2 className="font-display text-2xl font-bold text-[#FFD700]">Our Story</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Welcome to Jumbo Pizza Rockland — your local, family-owned pizza restaurant right in
              the heart of Rockland, Ontario. We&apos;ve been proudly serving the Rockland community
              and surrounding areas with generous portions, fresh ingredients, and a menu that
              has something for everyone.
            </p>
            <p>
              At Jumbo Pizza, we live by our motto: <span className="text-[#FFD700] font-semibold">
                &quot;Jumbo Sized Pizza with Jumbo Size Value!&quot;
              </span> Every pizza we make is crafted with care using fresh, quality ingredients — and
              our XL pizza truly is the <em>biggest pizza in Rockland</em>!
            </p>
            <p>
              Being family-owned means we treat every customer like family. Whether you&apos;re
              picking up on your way home or having us deliver right to your door, we&apos;re
              committed to making your experience delicious every single time.
            </p>
          </div>
        </div>

        {/* Community */}
        <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-[#FFD700]" />
            <h2 className="font-display text-2xl font-bold text-[#FFD700]">Rockland Community</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Rockland is a vibrant, bilingual community in Ontario with a strong Franco-Ontarian
              heritage. We&apos;re proud to be a part of this community and serve our neighbours
              from Rockland, Clarence, Cumberland, Plantagenet, and all surrounding areas.
            </p>
            <p>
              Our delivery area covers a wide region — from Clarence Creek to Wendover, from
              Sarsfield to Pendleton, and even to surrounding camping grounds and ferries. We
              want everyone in the area to enjoy Jumbo Pizza!
            </p>
          </div>
        </div>

        {/* Crust Options */}
        <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-6 h-6 text-[#FFD700]" />
            <h2 className="font-display text-2xl font-bold text-[#FFD700]">Options for Everyone</h2>
          </div>
          <p className="text-gray-300 mb-6">
            We believe everyone deserves great pizza. That&apos;s why we offer multiple crust options
            and dietary accommodations:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'Natural Crust', desc: 'Our classic, traditional pizza dough' },
              { name: 'Cauliflower Crust', desc: 'Light and healthy cauliflower-based crust' },
              { name: 'Keto Crust', desc: 'Low-carb crust for keto dieters' },
              { name: 'Gluten Free Crust', desc: 'Great for those with gluten sensitivities' },
            ].map((option) => (
              <div
                key={option.name}
                className="bg-[#3B0A0A] border border-[#5c1010] rounded-xl p-4"
              >
                <h3 className="font-semibold text-[#FFD700] mb-1">{option.name}</h3>
                <p className="text-sm text-gray-400">{option.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#FFD700] mt-4 font-semibold">
            Vegan cheese available on request!
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-[#FFD700]" />
            <h2 className="font-display text-2xl font-bold text-[#FFD700]">Why Choose Jumbo Pizza?</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Biggest pizza in Rockland — our XL is truly XL!',
              'Family-owned and operated with care and pride',
              'Fresh ingredients prepared daily',
              'Wide variety: Signature, Gourmet, Dessert pizzas and more',
              'Poutine, wings, apps, salads — a full menu',
              'Delivery across Rockland and surrounding communities',
              'Crust options for every diet and lifestyle',
              'Monday–Wednesday special deals',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#FFD700] mt-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold px-10"
          >
            <Link href="/menu">Explore Our Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
