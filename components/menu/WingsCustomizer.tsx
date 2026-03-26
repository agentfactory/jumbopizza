'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import { WING_SAUCES, type MenuItem } from '@/lib/menu-data';
import { cn } from '@/lib/utils';

interface WingsCustomizerProps {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}

export function WingsCustomizer({ item, open, onClose }: WingsCustomizerProps) {
  const sizes = Object.keys(item.prices);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { addItem, openCart } = useCartStore();

  const unitPrice = item.prices[selectedSize] ?? 0;
  const totalPrice = unitPrice * quantity;

  function toggleSauce(sauce: string) {
    setSelectedSauces((prev) =>
      prev.includes(sauce) ? prev.filter((s) => s !== sauce) : [...prev, sauce]
    );
  }

  function handleAdd() {
    if (selectedSauces.length === 0) {
      alert('Please select at least one sauce.');
      return;
    }
    addItem({
      id: `${item.id}-${selectedSize}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      size: `${selectedSize} pcs`,
      sauces: selectedSauces,
      quantity,
      unitPrice,
      notes: notes.trim() || undefined,
    });
    openCart();
    onClose();
    setQuantity(1);
    setNotes('');
    setSelectedSauces([]);
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
            <Label className="text-sm font-semibold text-gray-200 mb-3 block">Serving Size</Label>
            <div className="grid grid-cols-3 gap-2">
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
                  <span className={cn('font-semibold text-sm', selectedSize === size ? 'text-[#FFD700]' : '')}>
                    {size} pcs
                  </span>
                  <span className="text-[#FFD700] text-sm">{formatPrice(item.prices[size])}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sauce */}
          <div>
            <Label className="text-sm font-semibold text-gray-200 mb-3 block">
              Sauce <span className="text-gray-400 font-normal">(select one or more)</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {WING_SAUCES.map((sauce) => (
                <button
                  key={sauce}
                  onClick={() => toggleSauce(sauce)}
                  className={cn(
                    'p-2.5 rounded-lg border-2 text-sm transition-all text-left',
                    selectedSauces.includes(sauce)
                      ? 'border-[#FFD700] bg-[#3B0A0A] text-[#FFD700]'
                      : 'border-[#5c1010] hover:border-[#7a1515] text-gray-300'
                  )}
                >
                  {sauce}
                </button>
              ))}
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
            <Label htmlFor="wings-notes" className="text-sm font-semibold text-gray-200 mb-2 block">
              Special Instructions <span className="text-gray-400 font-normal">(optional)</span>
            </Label>
            <Textarea
              id="wings-notes"
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
