import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('پیام شما با موفقیت ثبت شد. کارشناسان الیت به‌زودی با شما تماس خواهند گرفت.', 'success');
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-300">
      <div className="text-center space-y-3">
        <h1 className="font-brand text-3xl font-extrabold text-stone-900 dark:text-stone-100">
          ارتباط با اتلیه و پشتیبانی الیت
        </h1>
        <p className="text-xs text-stone-500">
          برای هماهنگی بازدید حضوری شو روم یا مشاوره تخصصی خیاطی، با ما در تماس باشید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6 bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
          <h3 className="font-bold text-base border-b pb-3">دفتر مرکزی و شو روم</h3>
          <ul className="space-y-4 text-xs text-stone-600 dark:text-stone-300">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>تهران، خیابان فرشته، خیابان بیدار، پلاک ۲۴، اتلیه مد الیت</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>۰۲۱-۲۲۰۰۸۸۹۹</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>concierge@elitefashion.ir</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>شنبه تا پنج‌شنبه: ۱۰ صبح الی ۹ شب</span>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
          <h3 className="font-bold text-base border-b pb-3">ارسال پیام مستقیم</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-bold">نام و نام خانوادگی:</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">شماره تماس:</label>
            <input
              type="text"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">متن پیام یا درخواست مشاوره:</label>
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 rotate-180" />
            <span>ثبت و ارسال پیام</span>
          </button>
        </form>
      </div>
    </div>
  );
};
