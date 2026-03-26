'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, MapPin, Package } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, calcTax } from '@/lib/utils';

export default function OrderPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = total();
  const tax = calcTax(subtotal);
  const grandTotal = subtotal + tax;

  // Redirect if cart is empty (client-side only)
  useEffect(() => {
    if (items.length === 0) {
      router.push('/menu');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }
    if (orderType === 'delivery' && !form.address.trim()) {
      setError('Please provide your delivery address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          subtotal,
          tax,
          total: grandTotal,
          orderType,
          customerName: form.name,
          phone: form.phone,
          address: form.address || undefined,
          instructions: form.instructions || undefined,
          status: 'pending',
          createdAt: new Date().toISOString(),
          source: 'web',
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error('Order failed');

      clearCart();
      router.push(`/order/confirmation/${data.orderId}`);
    } catch {
      setError('Something went wrong. Please try again or call us at 613-446-1291.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-[#FFD700] mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Order Type */}
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-[#FFD700] mb-4">Order Type</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    orderType === 'pickup'
                      ? 'border-[#FFD700] bg-[#3B0A0A]'
                      : 'border-[#5c1010] hover:border-[#7a1515]'
                  }`}
                >
                  <Package className={`w-6 h-6 ${orderType === 'pickup' ? 'text-[#FFD700]' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${orderType === 'pickup' ? 'text-[#FFD700]' : 'text-gray-300'}`}>
                    Pickup
                  </span>
                  <span className="text-xs text-gray-400">20–30 min</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    orderType === 'delivery'
                      ? 'border-[#FFD700] bg-[#3B0A0A]'
                      : 'border-[#5c1010] hover:border-[#7a1515]'
                  }`}
                >
                  <MapPin className={`w-6 h-6 ${orderType === 'delivery' ? 'text-[#FFD700]' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${orderType === 'delivery' ? 'text-[#FFD700]' : 'text-gray-300'}`}>
                    Delivery
                  </span>
                  <span className="text-xs text-gray-400">30–45 min</span>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6 space-y-4">
                <h2 className="font-display text-lg font-semibold text-[#FFD700]">Your Information</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-200 mb-1.5 block">Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Your full name"
                      required
                      className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-200 mb-1.5 block">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="613-xxx-xxxx"
                      required
                      className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
                    />
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <Label htmlFor="address" className="text-gray-200 mb-1.5 block">Delivery Address *</Label>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={(e) => updateForm('address', e.target.value)}
                      placeholder="Street address, city"
                      required={orderType === 'delivery'}
                      className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="instructions" className="text-gray-200 mb-1.5 block">
                    Special Instructions <span className="text-gray-500">(optional)</span>
                  </Label>
                  <Textarea
                    id="instructions"
                    value={form.instructions}
                    onChange={(e) => updateForm('instructions', e.target.value)}
                    placeholder="Allergies, special requests, delivery notes..."
                    className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
                    rows={3}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold py-6 text-lg"
              >
                {loading ? 'Placing Order...' : `Place Order — ${formatPrice(grandTotal)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-[#FFD700]" />
                <h2 className="font-display text-lg font-semibold text-[#FFD700]">Order Summary</h2>
              </div>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2 text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {[item.size, item.crust, item.stuffedCrust].filter(Boolean).join(' • ')}
                        {item.sauces && item.sauces.length > 0 && ` • ${item.sauces.join(', ')}`}
                      </p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[#FFD700] font-semibold flex-shrink-0">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="bg-[#5c1010] mb-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>HST (13%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator className="bg-[#5c1010]" />
                <div className="flex justify-between text-white font-bold text-base">
                  <span>Total</span>
                  <span className="text-[#FFD700]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#5c1010]">
                <Link
                  href="/menu"
                  className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors"
                >
                  + Add more items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
