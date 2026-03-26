'use client';

import { useState, useMemo } from 'react';
import { Search, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { menuCategories } from '@/lib/menu-data';
import { MenuCategorySection } from '@/components/menu/MenuCategory';

export default function MenuPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return menuCategories;
    const q = search.toLowerCase();
    return menuCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search]);

  function scrollToCategory(id: string) {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[#240808] border-b border-[#5c1010] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-[#FFD700] mb-2">Our Menu</h1>
          <p className="text-gray-400">Everything made fresh. Jumbo sized. Jumbo value.</p>
        </div>
      </div>

      {/* Crust Options Banner */}
      <div className="bg-[#3B0A0A] border-b border-[#5c1010] py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Info className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
          <p className="text-gray-300">
            <span className="text-[#FFD700] font-semibold">Crust Options:</span> Natural, Cauliflower, Keto, Gluten Free &bull; Vegan Cheese Available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="pl-9 bg-[#2d0a0a] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
          />
        </div>

        {/* Category Tabs */}
        {!search.trim() && (
          <div className="sticky top-16 z-30 bg-[#1a0505] border-b border-[#5c1010] pb-3 mb-8 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-[#FFD700] text-[#1a0505]'
                      : 'bg-[#2d0a0a] border border-[#5c1010] text-gray-300 hover:border-[#FFD700] hover:text-[#FFD700]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Categories */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No items found for &quot;{search}&quot;</p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <MenuCategorySection key={cat.id} category={cat} />
          ))
        )}
      </div>
    </div>
  );
}
