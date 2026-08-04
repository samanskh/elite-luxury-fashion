import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowLeft, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

interface CartPageProps {
  onOpenCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onOpenCheckout }) => {
  const {
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-brand text-2xl font-bold text-stone-900 dark:text-stone-100">
          سبد خرید شما در حال حاضر خالی است
        </h1>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          محصولات مورد علاقه خود را از کالکشن‌های جدید الیت انتخاب و به سبد خرید اضافه نمایید.
        </p>
        <button
          onClick={() => navigateTo('category')}
          className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold hover:opacity-90 shadow-md"
        >
          <span>مشاهده جدیدترین کالکشن</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-brand text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
          سبد خرید لوکس شما ({toPersianDigits(cart.length)} کالا)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
              className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-32 object-cover rounded-xl flex-shrink-0 mx-auto sm:mx-0"
              />
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
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
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-3">
                  <div className="flex items-center gap-3 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-1 bg-stone-50 dark:bg-stone-800">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, -1)}
                      className="p-1 text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold px-2">{toPersianDigits(item.quantity)}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, 1)}
                      className="p-1 text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-base font-extrabold text-stone-900 dark:text-amber-400">
                    {formatToman(item.product.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Side Card */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-xs">
          <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
            خلاصه صورت‌حساب
          </h3>

          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="کد تخفیف (ELITE2026)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="w-full pl-3 pr-9 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold"
            >
              اعمال
            </button>
          </form>

          <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex justify-between">
              <span>جمع قیمت کالاها:</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{formatToman(cartSubtotal)}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>تخفیف ({appliedPromo.discountPercent}٪):</span>
                <span>- {formatToman(Math.round((cartSubtotal * appliedPromo.discountPercent) / 100))}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>هزینه ارسال پستی:</span>
              <span>{remainingForFreeShipping === 0 ? 'رایگان' : formatToman(75000)}</span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-stone-900 dark:text-amber-400 pt-3 border-t border-stone-100 dark:border-stone-800">
              <span>مبلغ نهایی قابل پرداخت:</span>
              <span>{formatToman(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={onOpenCheckout}
            className="w-full py-3.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-extrabold text-sm rounded-xl hover:opacity-90 shadow-xl flex items-center justify-center gap-2"
          >
            <span>ثبت نهایی و تسویه‌حساب</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
