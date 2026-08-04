import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ArrowLeft, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    navigateTo
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  const freeShippingThreshold = 2000000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            {/* Sliding Panel (RTL: Drawer comes from left or right) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col justify-between border-r border-stone-200 dark:border-stone-800"
            >
              {/* Header */}
              <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    سبد خرید لوکس شما
                  </h2>
                  <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded-full font-medium">
                    {toPersianDigits(cart.length)} کالا
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-stone-50 dark:bg-stone-800/50 p-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  <Truck className="w-4 h-4 text-amber-500" />
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      فقط <strong className="text-amber-600 dark:text-amber-400 font-bold">{formatToman(remainingForFreeShipping)}</strong> دیگر تا ارسال رایگان سفارشی!
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      🎉 تبریک! سفارش شما مشمول ارسال رایگان اختصاصی گردید.
                    </span>
                  )}
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 font-medium text-sm">
                      سبد خرید شما در حال حاضر خالی است
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('category');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <span>مشاهده جدیدترین کالکشن</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
                      className="flex gap-4 p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/60 dark:border-stone-800 relative group"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                              className="text-stone-400 hover:text-rose-500 p-1 transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                            <span>سایز: {item.selectedSize}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              رنگ:
                              <span
                                className="w-3 h-3 rounded-full border border-stone-300 inline-block"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-stone-300 dark:border-stone-700 rounded-lg px-2 py-0.5 bg-white dark:bg-stone-900">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, -1)}
                              className="p-1 text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1">{toPersianDigits(item.quantity)}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, 1)}
                              className="p-1 text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-xs font-bold text-stone-900 dark:text-amber-400">
                            {formatToman(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code & Order Summary Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 space-y-4">
                  {/* Promo Form */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                      <input
                        type="text"
                        placeholder="کد تخفیف (مثلاً: ELITE2026)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-3 pr-9 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      اعمال
                    </button>
                  </form>

                  {appliedPromo && (
                    <div className="flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                      <span>کد تخفیف {appliedPromo.code} فعال گردید ({appliedPromo.discountPercent}٪)</span>
                    </div>
                  )}

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex justify-between">
                      <span>جمع کل کالاها:</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-200">{formatToman(cartSubtotal)}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                        <span>تخفیف ویژه:</span>
                        <span>- {formatToman(Math.round((cartSubtotal * appliedPromo.discountPercent) / 100))}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>هزینه ارسال:</span>
                      <span>{remainingForFreeShipping === 0 ? 'رایگان' : formatToman(75000)}</span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                      <span>مبلغ قابل پرداخت:</span>
                      <span className="text-amber-600 dark:text-amber-400">{formatToman(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        onOpenCheckout();
                      }}
                      className="w-full py-3.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>تکمیل و ثبت سفارش</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('cart');
                      }}
                      className="w-full py-2.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors text-center"
                    >
                      مشاهده جزییات کامل سبد خرید
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
