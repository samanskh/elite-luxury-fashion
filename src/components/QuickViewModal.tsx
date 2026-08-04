import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo
  } = useShop();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0] || 'تک سایز';
  const currentColor = selectedColor || product.colors[0] || { name: 'اصلی', hex: '#000' };

  const handleClose = () => {
    setQuickViewProduct(null);
    setActiveImgIndex(0);
    setSelectedSize('');
    setSelectedColor(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left/Right */}
            <div className="p-6 bg-stone-50 dark:bg-stone-800/30 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800">
                <img
                  src={product.images[activeImgIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto p-1 max-w-full">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImgIndex === idx ? 'border-amber-500 scale-105' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{toPersianDigits(product.rating)}</span>
                    <span className="text-stone-400">({toPersianDigits(product.reviewCount)} نظر)</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {product.name}
                </h2>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-2xl font-extrabold text-stone-900 dark:text-amber-400">
                    {formatToman(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatToman(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Color selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                    انتخاب رنگ: <span className="font-normal text-stone-500">{currentColor.name}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform ${
                          currentColor.hex === c.hex ? 'border-amber-500 scale-110 shadow-md' : 'border-stone-300 dark:border-stone-700'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {currentColor.hex === c.hex && (
                          <Check className={`w-4 h-4 ${c.hex === '#FDFBF7' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                    انتخاب سایز:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          currentSize === s
                            ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-black border-stone-900 dark:border-amber-400'
                            : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(product, currentSize, currentColor, 1);
                      handleClose();
                    }}
                    className="flex-1 py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به سبد خرید</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                        : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('product-details', { productId: product.id });
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-center text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>مشاهده جزییات کامل و نظرات کاربران</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
