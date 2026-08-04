import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-brand text-2xl font-bold text-stone-900 dark:text-stone-100">
          لیست علاقه‌مندی‌های شما خالی است
        </h1>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          با کلیک بر روی آیکون قلب روی هر محصول، آن را برای خریدهای بعدی ذخیره کنید.
        </p>
        <button
          onClick={() => navigateTo('category')}
          className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold hover:opacity-90 shadow-md"
        >
          <span>مشاهده محصولات الیت</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-brand text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
          لیست علاقه‌مندی‌های شما ({toPersianDigits(wishlist.length)} کالا)
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.product.id}
            className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <button
                onClick={() => toggleWishlist(item.product)}
                className="absolute top-3 left-3 p-2 bg-white/90 dark:bg-stone-900/90 text-rose-500 rounded-full hover:bg-rose-50 shadow-md"
                title="حذف از علاقه‌مندی‌ها"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <h3
                onClick={() => navigateTo('product-details', { productId: item.product.id })}
                className="font-bold text-xs text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
              >
                {item.product.name}
              </h3>

              <div className="flex items-baseline justify-between">
                <span className="font-extrabold text-sm text-stone-900 dark:text-amber-400">
                  {formatToman(item.product.price)}
                </span>
                <button
                  onClick={() => addToCart(item.product)}
                  className="px-3 py-1.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold flex items-center gap-1.5 hover:opacity-90"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>انتقال به سبد</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
