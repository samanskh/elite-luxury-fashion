import React from 'react';
import { User, Package, MapPin, LogOut, Phone, Mail, ChevronLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toPersianDigits } from '../utils/formatters';

export const ProfilePage: React.FC = () => {
  const { user, logout, orders, navigateTo } = useShop();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">شما وارد حساب کاربری نشده‌اید</h2>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-2.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold"
        >
          ورود به حساب کاربری
        </button>
      </div>
    );
  }

  const userName = user.name || user.fullName || 'کاربر الیت';
  const initial = userName ? userName.charAt(0) : 'ک';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Header */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-2xl flex items-center justify-center border border-amber-500/30">
            {initial}
          </div>
          <div>
            <h1 className="font-bold text-xl text-stone-900 dark:text-stone-100">{userName}</h1>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">عضو VIP باشگاه الیت</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 border border-rose-200 text-rose-600 dark:border-rose-900 dark:text-rose-400 rounded-xl text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5 self-start md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>خروج از حساب</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* User Stats/Details */}
        <div className="space-y-4 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 border-b pb-3">اطلاعات شخصی</h3>
          <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>شماره تماس: {user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500" />
              <span>ایمیل: {user.email}</span>
            </div>
          </div>
        </div>

        {/* Navigation Shortcut Cards */}
        <div
          onClick={() => navigateTo('orders')}
          className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-amber-500 cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">سفارش‌های من</h4>
              <p className="text-xs text-stone-500">{toPersianDigits(orders.length)} سفارش ثبت‌شده</p>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 text-stone-400" />
        </div>

        {/* Saved Addresses */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b pb-3">
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">آدرس تحویل</h4>
            <MapPin className="w-4 h-4 text-amber-500" />
          </div>
          {user.addresses[0] && (
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {user.addresses[0].province}، {user.addresses[0].city}، {user.addresses[0].fullAddress}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
