'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import { CRUST_OPTIONS, STUFFED_CRUST_OPTIONS, type MenuItem } from '@/lib/menu-data';
import { cn } from '@/lib/utils';

interface PizzaCustomizerProps {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}

const SIZE_LABELS: Record<string, string> = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
  XL: 'X-Large',
};

export function PizzaCustomizer({ item, open, onClose }: PizzaCustomizerProps) {
  const sizes = Object.keys(item.prices);
  const [selectedSize, setSelectedSize] = useState(sizes[1] ?? sizes[0]);
  const [selectedCrust, setSelectedCrust] = useState('Natural');
  const [stuffedCrust, setStuffedCrust] = useState('None');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { addItem, openCart } = useCartStore();

  const basePrice = item.prices[selectedSize] ?? 0;
  const stuffedCrustOption = STUFFED_CRUST_OPTIONS.find((o) => o.name === stuffedCrust);
  const stuffedCrustPrice = stuffedCrustOption
    ? stuffedCrustOption.prices[selectedSize as keyof typeof stuffedCrustOption.prices] ?? 0
    : 0;
  const unitPrice = basePrice + stuffedCrustPrice;
  const totalPrice = unitPrice * quantity;

  function handleAdd() {
    addItem({
      id: `${item.id}-${selectedSize}-${selectedCrust}-${stuffedCrust}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      size: SIZE_LABELS[selectedSize] ?? selectedSize,
      crust: selectedCrust,
      stuffedCrust: stuffedCrust !== 'None' ? stuffedCrust : undefined,
      stuffedCrustPrice: stuffedCrust !== 'None' ? stuffedCrustPrice : undefined,
      quantity,
      unitPrice,
      notes: notes.trim() || undefined,
    });
    openCart();
    onClose();
    setQuantity(1);
    setNotes('');
    setStuffedCrust('None');
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[#240808] border-[#5c1010] text-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-[#FFD700]">{item.name}</DialogTitle>
          {item.description && (
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          )}
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Size */}
          <div>
            <Label className="text-sm font-semibold text-gray-200 mb-3 block">Size</Label>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'flex flex-col items-center p-3 rounded-lg border-2 transition-all',
                    selectedSize === size
                      ? 'border-[#FFD700] bg-[#3B0A0A]'
                      : 'border-[#5c1010] hover:border-[#7a1515]'
                  )}
                >
                  <span className="font-semibold text-sm">{SIZE_LABELS[size] ?? size}</span>
                  <span className="text-[#FFD700] text-sm">{formatPrice(item.prices[size])}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Crust */}
          <div>
            <Label className="text-sm font-semibold text-gray-200 mb-3 block">Crust Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {CRUST_OPTIONS.map((crust) => (
                <button
                  key={crust}
                  onClick={() => setSelectedCrust(crust)}
                  className={cn(
                    'p-2.5 rounded-lg border-2 text-sm transition-all',
                    selectedCrust === crust
                      ? 'border-[#FFD700] bg-[#3B0A0A] text-[#FFD700]'
                      : 'border-[#5c1010] hover:border-[#7a1515] text-gray-300'
                  )}
                >
                  {crust}
                </button>
              ))}
            </div>
          </div>

          {/* Stuffed Crust */}
          <div>
            <Label className="text-sm font-semibold text-gray-200 mb-3 block">
              Stuffed Crust <span className="text-gray-400 font-normal">(optional)</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStuffedCrust('None')}
                className={cn(
                  'p-2.5 rounded-lg border-2 text-sm transition-all',
                  stuffedCrust === 'None'
                    ? 'border-[#FFD700] bg-[#3B0A0A] text-[#FFD700]'
                    : 'border-[#5c1010] hover:border-[#7a1515] text-gray-300'
                )}
              >
                None
              </button>
              {STUFFED_CRUST_OPTIONS.map((option) => {
                const price = option.prices[selectedSize as keyof typeof option.prices] ?? 0;
                return (
                  <button
                    key={option.name}
                    onClick={() => setStuffedCrust(option.name)}
                    className={cn(
                      'flex flex-col items-center p-2.5 rounded-lg border-2 text-sm transition-all',
                      stuffedCrust === option.name
                        ? 'border-[#FFD700] bg-[#3B0A0A]'
                        : 'border-[#5c1010] hover:border-[#7a1515]'
                    )}
                  >
                    <span className={stuffedCrust === option.name ? 'text-[#FFD700]' : 'text-gray-300'}>
                      {option.name}
                    </span>
                    <span className="text-xs text-gray-400">+{formatPrice(price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <Label className="text-sm font-semibold text-gray-200 mb-3 block">Quantity</Label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full border-2 border-[#5c1010] flex items-center justify-center hover:border-[#FFD700] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full border-2 border-[#5c1010] flex items-center justify-center hover:border-[#FFD700] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="pizza-notes" className="text-sm font-semibold text-gray-200 mb-2 block">
              Special Instructions <span className="text-gray-400 font-normal">(optional)</span>
            </Label>
            <Textarea
              id="pizza-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
              className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
              rows={2}
            />
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAdd}
            className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold py-6 text-base"
          >
            Add to Cart — {formatPrice(totalPrice)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
