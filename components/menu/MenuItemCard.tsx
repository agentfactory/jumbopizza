'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import type { MenuItem } from '@/lib/menu-data';
import { PizzaCustomizer } from './PizzaCustomizer';
import { WingsCustomizer } from './WingsCustomizer';

interface MenuItemCardProps {
  item: MenuItem;
}

const PIZZA_CATEGORIES = ['signature-pizzas', 'gourmet-pizzas'];
const WINGS_CATEGORIES = ['wings'];

function getLowestPrice(prices: Record<string, number>) {
  return Math.min(...Object.values(prices));
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [showPizzaCustomizer, setShowPizzaCustomizer] = useState(false);
  const [showWingsCustomizer, setShowWingsCustomizer] = useState(false);
  const { addItem, openCart } = useCartStore();

  const isPizza = PIZZA_CATEGORIES.includes(item.category);
  const isWings = WINGS_CATEGORIES.includes(item.category);
  const hasSizes = Object.keys(item.prices).length > 1;
  const lowestPrice = getLowestPrice(item.prices);
  const sizes = Object.keys(item.prices);

  function handleAdd() {
    if (isPizza) {
      setShowPizzaCustomizer(true);
      return;
    }
    if (isWings) {
      setShowWingsCustomizer(true);
      return;
    }
    // Fixed price item — add directly
    addItem({
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: lowestPrice,
    });
    openCart();
  }

  return (
    <>
      <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-4 flex flex-col gap-3 hover:border-[#7a1515] transition-colors group">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm leading-tight mb-1 group-hover:text-[#FFE44D] transition-colors">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{item.description}</p>
          )}
        </div>

        {/* Prices */}
        <div className="flex flex-wrap gap-1.5">
          {hasSizes ? (
            sizes.map((size) => (
              <Badge
                key={size}
                variant="secondary"
                className="bg-[#3B0A0A] text-[#FFD700] border border-[#5c1010] text-xs px-2 py-0.5"
              >
                {size}: {formatPrice(item.prices[size])}
              </Badge>
            ))
          ) : (
            <Badge
              variant="secondary"
              className="bg-[#3B0A0A] text-[#FFD700] border border-[#5c1010] text-xs px-2 py-0.5"
            >
              {formatPrice(lowestPrice)}
            </Badge>
          )}
        </div>

        <Button
          onClick={handleAdd}
          size="sm"
          className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold text-xs py-2"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          {isPizza || isWings ? 'Customize & Add' : 'Add to Cart'}
        </Button>
      </div>

      {isPizza && (
        <PizzaCustomizer
          item={item}
          open={showPizzaCustomizer}
          onClose={() => setShowPizzaCustomizer(false)}
        />
      )}

      {isWings && (
        <WingsCustomizer
          item={item}
          open={showWingsCustomizer}
          onClose={() => setShowWingsCustomizer(false)}
        />
      )}
    </>
  );
}
