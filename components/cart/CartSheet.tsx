'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { CartItemRow } from './CartItem';
import { CartSummary } from './CartSummary';

export function CartSheet() {
  const { items, isOpen, closeCart, clearCart } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && closeCart()}>
      <SheetContent
        side="right"
        className="bg-[#1a0505] border-l border-[#5c1010] text-white w-full sm:max-w-md flex flex-col"
      >
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex items-center justify-between text-[#FFD700] font-display text-xl">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Order
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors font-normal"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="w-16 h-16 text-[#5c1010]" />
            <div>
              <p className="text-lg font-semibold text-gray-300">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-1">Add some delicious items to get started!</p>
            </div>
            <Button
              asChild
              className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold"
              onClick={closeCart}
            >
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-2">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <div className="flex-shrink-0 pb-4">
              <CartSummary onClose={closeCart} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
