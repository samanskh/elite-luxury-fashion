import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, ArrowLeft, Instagram, Send, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [emailInput, setEmailInput] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast('عضویت شما در خبرنامه باشگاه مشتریان الیت با موفقیت ثبت شد!', 'success');
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#1c1917] text-[#f5f5f4] dark:bg-stone-950 dark:text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex flex-col items-start cursor-pointer" onClick={() => navigateTo('home')}>
              <span className="font-brand text-3xl font-extrabold tracking-[0.2em] text-white">
                ELITE
              </span>
              <span className="text-[9px] tracking-[0.3em] font-light text-stone-400 -mt-1 uppercase">
                ATELIER TEHRAN
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              خانه مد الیت، تجلی‌بخش هارمونی میان هنر پوشاک فاخر ایرانی، مرغوب‌ترین پارچه‌های جهانی و خیاطی مدرن.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#telegram" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              راهنمای خرید و خدمات
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigateTo('category')} className="hover:text-amber-400 transition-colors">
                  جدیدترین کالکشن پاییز و زمستان
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-amber-400 transition-colors">
                  درباره برند و فلسفه الیت
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors">
                  ارسال اختصاصی و بازگشت کالا
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('orders')} className="hover:text-amber-400 transition-colors">
                  پیگیری سفارشی پستی
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Showroom */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              شو روم و دفتر مرکزی
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>تهران، خیابان فرشته، خیابان بیدار، پلاک ۲۴، اتلیه الیت</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>تلفن تماس: ۰۲۱-۲۲۰۰۸۸۹۹</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              باشگاه مشتریان و اخبار کالکشن
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              با ثبت ایمیل، از جدیدترین دراپ‌های نسخه محدود و دعوت‌نامه‌های اختصاصی آگاه شوید.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute right-3 top-3" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="ایمیل خود را وارد نمایید"
                  className="w-full pr-9 pl-3 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 text-stone-950 rounded-xl text-xs font-bold hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
              >
                <span>عضویت در خبرنامه</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal Rights */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('about')} className="hover:text-stone-300">
              حریم خصوصی
            </button>
            <button onClick={() => navigateTo('about')} className="hover:text-stone-300">
              شرایط استفاده
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-stone-300">
              ارسال و بازگشت
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-stone-300">
              تماس با ما
            </button>
          </div>
          <p>© ۲۰۲۶ ELITE FASHION. تمامی حقوق برای اتلیه مد الیت محفوظ است.</p>
        </div>

      </div>
    </footer>
  );
};
