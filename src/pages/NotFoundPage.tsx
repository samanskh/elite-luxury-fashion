import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6 animate-in fade-in duration-300">
      <h1 className="font-brand text-6xl font-extrabold text-stone-300 dark:text-stone-700">۴۰۴</h1>
      <h2 className="font-brand text-xl font-bold text-stone-900 dark:text-stone-100">
        صفحه مورد نظر پیدا نشد
      </h2>
      <p className="text-xs text-stone-500">
        متاسفانه آدرسی که وارد کرده‌اید وجود ندارد یا منتقل شده است.
      </p>
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold shadow-md"
      >
        <span>بازگشت به صفحه اصلی</span>
        <ArrowLeft className="w-4 h-4" />
      </button>
    </div>
  );
};
