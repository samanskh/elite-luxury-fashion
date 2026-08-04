import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { mockProducts } from '../data/mockData';
import { formatToman } from '../utils/formatters';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    navigateTo,
  } = useShop();

  const popularTags = ['پالتو کشمیر', 'کت و شلوار زغالی', 'بارانی', 'کیف تبریز', 'شال ابریشم'];

  const filteredProducts = searchQuery.trim()
    ? mockProducts.filter(
        p => p.name.includes(searchQuery) || p.description.includes(searchQuery) || p.category.includes(searchQuery)
      )
    : [];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-start justify-center pt-16 sm:pt-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 p-5 sm:p-6 space-y-5"
        >
          {/* Header & Input Field */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute right-4 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در محصولات، پالتو، کت، کیف..."
              className="w-full pl-10 pr-12 py-3.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-10 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mr-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Popular Search Tags */}
          {!searchQuery && (
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-500" />
                <span>عبارات پرجستجو:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 dark:hover:text-amber-400 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-lg transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchQuery.trim() && (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              <div className="text-xs font-bold text-stone-400">
                نتایج پیدا شده ({filteredProducts.length})
              </div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  محصولی با این عبارت یافت نشد.
                </div>
              ) : (
                filteredProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('product-details', { productId: product.id });
                    }}
                    className="w-full text-right flex items-center gap-4 p-2.5 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-xs font-extrabold text-stone-900 dark:text-amber-400">
                      {formatToman(product.price)}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

