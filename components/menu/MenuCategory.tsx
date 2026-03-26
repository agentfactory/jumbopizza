import type { MenuCategory as MenuCategoryType } from '@/lib/menu-data';
import { MenuItemCard } from './MenuItemCard';

interface MenuCategoryProps {
  category: MenuCategoryType;
}

export function MenuCategorySection({ category }: MenuCategoryProps) {
  return (
    <section id={category.id} className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-[#5c1010]" />
        <h2 className="font-display text-2xl font-bold text-[#FFD700] whitespace-nowrap">
          {category.name}
        </h2>
        <div className="h-px flex-1 bg-[#5c1010]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
