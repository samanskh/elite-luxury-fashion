import React from 'react';
import { Sparkles, Award, Shield, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-300">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          داستان و فلسفه خانه مد الیت
        </span>
        <h1 className="font-brand text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-stone-100">
          تلفیق اصالت، هنر و وقار ایرانی
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          خانه مد الیت از سال ۱۳۹۸ فعالیت خود را با هدف خلق پوشاک فاخر و ماندگار برای زنان و مردان صاحب‌سبک آغاز کرد.
        </p>
      </div>

      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
          alt="Atelier ELITE"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
          <Award className="w-8 h-8 mx-auto text-amber-500" />
          <h3 className="font-bold text-sm">مرغوب‌ترین پارچه‌ها</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            استفاده اختصاصی از پارچه‌های تمام‌کشمیر، پشم مرینوس ایتالیایی و ابریشم طبیعی تبریز.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
          <Sparkles className="w-8 h-8 mx-auto text-amber-500" />
          <h3 className="font-bold text-sm">خیاطی سفارشی اتلیه</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            برش دقیق با الگوهای مدرن فرانسوی توسط استادکاران خیاطی الیت.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3">
          <Heart className="w-8 h-8 mx-auto text-amber-500" />
          <h3 className="font-bold text-sm">پایداری و تعهد</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            تولید مسئولانه با رعایت تمام استانداردهای زیست‌محیطی و ماندگاری سالیان متمادی.
          </p>
        </div>
      </div>
    </div>
  );
};
