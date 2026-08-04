import React from 'react';
import { Search, Eye, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { mockProducts } from '../data/mockData';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const SearchPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  const results = searchQuery.trim()
    ? mockProducts.filter(
        p => p.name.includes(searchQuery) || p.description.includes(searchQuery) || p.category.includes(searchQuery)
      )
    : mockProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 space-y-4">
        <h1 className="font-brand text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
          جستجوی پیشرفته محصولات
        </h1>

        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-stone-400 absolute right-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="عبارت مورد نظر خود را جستجو کنید (پالتو، کت، کیف...)"
            className="w-full pr-12 pl-4 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs font-bold text-stone-500">
          {searchQuery ? `نتایج جستجو برای "${searchQuery}" (${toPersianDigits(results.length)} کالا)` : 'پیشنهادهای ویژه الیت'}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="p-2.5 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white rounded-full hover:bg-white shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2.5 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white rounded-full hover:bg-white shadow-md"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3
                  onClick={() => navigateTo('product-details', { productId: product.id })}
                  className="font-bold text-xs text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-extrabold text-sm text-stone-900 dark:text-amber-400">
                    {formatToman(product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl hover:bg-stone-900 hover:text-white dark:hover:bg-amber-400 dark:hover:text-black transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
