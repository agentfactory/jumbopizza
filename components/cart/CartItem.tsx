'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/lib/types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 py-4 border-b border-[#5c1010] last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-white truncate">{item.name}</p>
        <div className="text-xs text-gray-400 mt-0.5 space-y-0.5">
          {item.size && <span className="block">{item.size}</span>}
          {item.crust && <span className="block">Crust: {item.crust}</span>}
          {item.stuffedCrust && (
            <span className="block text-[#FFD700]">
              Stuffed Crust: {item.stuffedCrust}
              {item.stuffedCrustPrice ? ` (+${formatPrice(item.stuffedCrustPrice)})` : ''}
            </span>
          )}
          {item.sauces && item.sauces.length > 0 && (
            <span className="block">Sauces: {item.sauces.join(', ')}</span>
          )}
          {item.notes && <span className="block italic">"{item.notes}"</span>}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p className="text-[#FFD700] font-bold text-sm">
          {formatPrice(item.unitPrice * item.quantity)}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 rounded border border-[#5c1010] flex items-center justify-center hover:border-[#FFD700] text-gray-300 hover:text-[#FFD700] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded border border-[#5c1010] flex items-center justify-center hover:border-[#FFD700] text-gray-300 hover:text-[#FFD700] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => removeItem(item.id)}
            className="w-6 h-6 rounded border border-[#5c1010] flex items-center justify-center hover:border-red-500 text-gray-400 hover:text-red-400 transition-colors ml-1"
            aria-label="Remove item"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
