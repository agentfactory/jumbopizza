'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, calcTax } from '@/lib/utils';

interface CartSummaryProps {
  onClose?: () => void;
}

export function CartSummary({ onClose }: CartSummaryProps) {
  const { total } = useCartStore();
  const subtotal = total();
  const tax = calcTax(subtotal);
  const grandTotal = subtotal + tax;

  return (
    <div className="space-y-3">
      <Separator className="bg-[#5c1010]" />
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

      <Button
        asChild
        className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold py-6"
        onClick={onClose}
      >
        <Link href="/order">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}
