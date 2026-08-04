import React from 'react';
import { Home, Grid, Search, Heart, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toPersianDigits } from '../utils/formatters';

export const BottomNav: React.FC = () => {
  const { navigateTo, currentPage, wishlist, setIsSearchOpen, user } = useShop();

  const navItems = [
    { id: 'home', label: 'خانه', icon: Home },
    { id: 'category', label: 'فروشگاه', icon: Grid },
    { id: 'search', label: 'جستجو', icon: Search, isAction: true },
    { id: 'wishlist', label: 'علاقه‌مندی', icon: Heart, badge: wishlist.length },
    { id: user ? 'profile' : 'login', label: user ? 'پروفایل' : 'ورود', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 py-1 px-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAction) {
                  setIsSearchOpen(true);
                } else {
                  navigateTo(item.id as any);
                }
              }}
              className={`relative flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-stone-950 dark:text-amber-400 font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {toPersianDigits(item.badge)}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
