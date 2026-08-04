import React, { useState } from 'react';
import { User, Phone, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const LoginPage: React.FC = () => {
  const { login, navigateTo } = useShop();

  const [phone, setPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');
  const [name, setName] = useState('سارا محمدی');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('۵۴۳۲۱');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: name || 'کاربر فاخر الیت',
      email: 'sara.mohammadi@example.com',
      phone,
    });
    navigateTo('profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-brand text-2xl font-bold text-stone-900 dark:text-stone-100">
            ورود به باشگاه مشتریان الیت
          </h1>
          <p className="text-xs text-stone-500">
            برای مشاهده سفارش‌ها و تخفیف‌های اختصاصی وارد حساب خود شوید.
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">نام و نام خانوادگی:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="سارا محمدی"
                className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">شماره موبایل:</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full pr-10 pl-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-xs rounded-xl hover:opacity-90 shadow-lg flex items-center justify-center gap-2"
            >
              <span>دریافت کد تایید یک‌بار مصرف</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">کد تایید ۵ رقمی ارسال‌شده:</label>
              <input
                type="text"
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center tracking-[0.5em] py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-xs rounded-xl hover:opacity-90 shadow-lg flex items-center justify-center gap-2"
            >
              <span>ورود نهایی به پروفایل</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
