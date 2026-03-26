import Link from 'next/link';
import Image from 'next/image';
import { Flame, Truck, Leaf, Timer, ArrowRight } from 'lucide-react';

const sg = 'font-[family-name:var(--font-space-grotesk)]';

const pizzas = [
  {
    name: 'MEAT LOVERS',
    desc: 'Pepperoni, bacon, ground beef, italian sausage',
    price: 'FROM $17.00',
    img: 'https://images.unsplash.com/photo-1602658015824-b49d35094837?w=600&q=80',
    bg: '#FFFFFF',
  },
  {
    name: 'HAWAIIAN',
    desc: 'Ham, pineapples',
    price: 'FROM $16.25',
    img: 'https://images.unsplash.com/photo-1692812472060-c15ca30af036?w=600&q=80',
    bg: '#FFFFFF',
  },
  {
    name: 'LA MARGHARITA',
    desc: 'Tomato sauce, fresh garlic, basil, oregano, black olives',
    price: 'FROM $17.00',
    img: 'https://images.unsplash.com/photo-1682989087146-70a0834c42c1?w=600&q=80',
    bg: '#FFFFFF',
  },
  {
    name: 'POGO BACON POUTINE',
    desc: 'Stuffed crust, Pogo, bacon, St-Albert curds, poutine sauce, fresh fries',
    price: 'FROM $19.95',
    img: 'https://images.unsplash.com/photo-1624900183034-338974e68033?w=600&q=80',
    bg: '#FFF8F0',
    badge: 'GOURMET',
  },
];

const deals = [
  'Medium Pizza + Deep Fried Pickles + 2 Drinks',
  'X-Large Pizza + 2 Drinks + 2 Dipping Sauces',
  'Medium Pizza + 10 Chicken Wings + 2 Drinks',
];

export default function HomePage() {
  return (
    <div className={sg}>
      {/* Feature Strip */}
      <section className="bg-[#FFD700] h-20 flex items-center justify-between px-20 max-[900px]:px-6 max-[900px]:flex-wrap max-[900px]:h-auto max-[900px]:py-4 max-[900px]:gap-4">
        {[
          { Icon: Flame, label: 'MADE FRESH DAILY' },
          { Icon: Truck, label: 'DELIVERY AVAILABLE' },
          { Icon: Leaf, label: 'VEGAN & GLUTEN FREE OPTIONS' },
          { Icon: Timer, label: 'OPEN 7 DAYS A WEEK' },
        ].map(({ Icon, label }, i) => (
          <div key={i} className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-[#1A1A1A]" strokeWidth={2} />
            <span className="text-[#1A1A1A] text-[11px] font-bold tracking-[2px]">{label}</span>
          </div>
        ))}
      </section>

      {/* Hero */}
      <section className="bg-[#FFF8F0] flex items-center justify-between gap-15 px-20 py-0 max-[900px]:flex-col max-[900px]:px-6 max-[900px]:py-10">
        {/* Left */}
        <div className="flex flex-col gap-7 max-w-[580px] py-8 shrink-0">
          {/* Badge */}
          <div className="flex items-center gap-2 bg-[#FFD70033] rounded-sm px-3.5 py-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] inline-block" />
            <span className="text-[#E04F2A] text-[10px] font-semibold tracking-[2px]">ROCKLAND&apos;S BIGGEST PIZZA</span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[#1A1A1A] text-[80px] font-bold leading-[0.92] tracking-[-2px] max-[1100px]:text-[60px] max-[700px]:text-[48px]">
              JUMBO SIZED PIZZA.
            </h1>
            <h1 className="text-[#FFD700] text-[80px] font-bold leading-[0.92] tracking-[-2px] max-[1100px]:text-[60px] max-[700px]:text-[48px]">
              JUMBO SIZE VALUE.
            </h1>
          </div>

          <p className="text-[#666666] text-base leading-[1.7] max-w-[500px]">
            Fresh-made daily. Delivered to Rockland, Clarence, Cumberland &amp; beyond. Dine in or take out — 11AM to 10PM.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/order"
              className="bg-[#FFD700] text-[#1A1A1A] text-sm font-bold tracking-[1.5px] px-9 py-[18px] hover:bg-[#FFE44D] transition-colors"
            >
              ORDER ONLINE
            </Link>
            <Link
              href="/menu"
              className="border border-[#1A1A1A33] bg-white text-[#1A1A1A] text-sm font-bold tracking-[1.5px] px-9 py-[17px] hover:bg-[#F5F5F5] transition-colors"
            >
              VIEW MENU
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pt-2">
            {[
              { num: '18"', label: 'BIGGEST SIZE' },
              { num: '10+', label: 'DELIVERY AREAS' },
              { num: '17+', label: 'PIZZA STYLES' },
            ].map(({ num, label }, i) => (
              <div key={i} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-10 bg-[#1A1A1A]/15" />}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#E04F2A] text-[28px] font-bold">{num}</span>
                  <span className="text-[#888888] text-[9px] font-semibold tracking-[2px]">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div className="relative w-[620px] h-[580px] shrink-0 max-[1100px]:w-[480px] max-[900px]:w-full max-[900px]:h-[320px]">
          <Image
            src="https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?w=1080&q=80"
            alt="Jumbo Pizza"
            fill
            className="object-cover"
            unoptimized
            priority
          />
          {/* left fade */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FFF8F0] to-transparent" />
          {/* overlay vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00000033]" />
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="bg-white px-20 py-20 max-[900px]:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E04F2A] rounded-full" />
              <span className="text-[#E04F2A] text-[10px] font-semibold tracking-[2px]">OUR MENU</span>
            </div>
            <h2 className="text-[#1A1A1A] text-[42px] font-bold leading-[1.05] max-w-[520px] max-[700px]:text-[32px]">
              The Classics That Made Us Famous
            </h2>
          </div>
          <Link href="/menu" className="flex items-center gap-1.5 text-[#E04F2A] text-[11px] font-semibold tracking-[2px] hover:opacity-80 transition-opacity shrink-0 mb-2">
            VIEW FULL MENU <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-0.5 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {pizzas.map((pizza) => (
            <div key={pizza.name} className="flex flex-col relative border border-[#E5E5E5]" style={{ background: pizza.bg }}>
              {pizza.badge && (
                <div className="absolute top-3 left-3 z-10 bg-[#FFD700] text-[#1A1A1A] text-[10px] font-bold tracking-[1.5px] px-2.5 py-1">
                  {pizza.badge}
                </div>
              )}
              <div className="relative h-[220px] w-full">
                <Image src={pizza.img} alt={pizza.name} fill className="object-cover" unoptimized />
              </div>
              <div className="flex flex-col gap-2 p-5 flex-1">
                <span className="text-[#1A1A1A] text-base font-bold tracking-[1px]">{pizza.name}</span>
                <p className="text-[#666666] text-[12px] leading-[1.5] flex-1">{pizza.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#E04F2A] text-[12px] font-bold tracking-[1px]">{pizza.price}</span>
                  <Link
                    href="/order"
                    className="bg-[#FFD700] text-[#1A1A1A] text-[10px] font-bold tracking-[1.5px] px-4 py-2 hover:bg-[#FFE44D] transition-colors"
                  >
                    ORDER
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="flex h-[420px] max-[900px]:flex-col max-[900px]:h-auto">
        {/* Text side */}
        <div className="bg-[#FFF4E6] w-[560px] shrink-0 flex flex-col justify-center gap-6 px-[60px] py-[60px] max-[900px]:w-full">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-3.5 bg-[#E04F2A]" />
            <span className="text-[#E04F2A] text-[10px] font-semibold tracking-[2px]">MON — WED SPECIALS</span>
          </div>
          <h2 className="text-[#1A1A1A] text-[56px] font-bold leading-[0.95] tracking-[-1px]">$33.95 DEALS</h2>
          <p className="text-[#666666] text-sm leading-[1.6] max-w-[380px]">
            Every Monday, Tuesday and Wednesday. Mix and match your favourites.
          </p>
          <div className="flex flex-col gap-2">
            {deals.map((deal) => (
              <div key={deal} className="flex items-center gap-2.5">
                <div className="w-1 h-1 bg-[#E04F2A] shrink-0" />
                <span className="text-[#1A1A1A] text-[13px]">{deal}</span>
              </div>
            ))}
          </div>
          <Link
            href="/deals"
            className="bg-[#FFD700] text-[#1A1A1A] text-[12px] font-bold tracking-[2px] px-7 py-3.5 w-fit hover:bg-[#FFE44D] transition-colors"
          >
            ORDER A DEAL
          </Link>
        </div>

        {/* Image side */}
        <div className="relative flex-1 min-h-[280px]">
          <Image
            src="https://images.unsplash.com/photo-1560717869-37296557a131?w=1080&q=80"
            alt="Pizza deals"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E04F2A] flex flex-col items-center justify-center gap-6 py-[60px] px-20 text-center max-[700px]:px-6">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-3.5 bg-white" />
          <span className="text-white text-[10px] font-semibold tracking-[2px]">CALL US ANYTIME</span>
        </div>
        <a href="tel:6134461291" className="text-white text-[48px] font-bold tracking-[-1px] hover:text-[#FFD700] transition-colors max-[700px]:text-[32px]">
          HUNGRY? CALL 613-446-1291
        </a>
        <p className="text-white/70 text-[13px]">
          Sun–Thu: 11AM–9PM &nbsp;·&nbsp; Fri–Sat: 11AM–10PM &nbsp;·&nbsp; Delivery to Clarence, Cumberland, Rockland &amp; more
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            href="/order"
            className="bg-[#FFD700] text-[#1A1A1A] text-[12px] font-bold tracking-[2px] px-8 py-3.5 hover:bg-[#FFE44D] transition-colors"
          >
            ORDER ONLINE
          </Link>
          <Link
            href="/menu"
            className="border border-white/40 bg-white text-[#E04F2A] text-[12px] font-bold tracking-[2px] px-8 py-3.5 hover:bg-white/90 transition-colors"
          >
            VIEW FULL MENU
          </Link>
        </div>
      </section>
    </div>
  );
}
