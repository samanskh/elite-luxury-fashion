import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Truck, ShieldCheck, Headphones, ArrowLeft, Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { mockCategories, mockProducts } from '../data/mockData';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, setIsStylistOpen } = useShop();

  // Countdown timer for Limited Edition Drop
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 51 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300">

      {/* 1. Hero Collection Section (Design Matching Uploaded Image) */}
      <section className="relative h-[85vh] min-h-[550px] w-full overflow-hidden flex items-end justify-center pb-16">
        <img
          src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1800&auto=format&fit=crop"
          alt="ELITE Autumn Collection"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 dark:brightness-75 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 text-center text-white space-y-4 max-w-xl mx-auto px-4">
          <p className="text-xs uppercase tracking-[0.25em] font-light text-stone-200">
            رونمایی از کالکشن پاییز و زمستان الیت
          </p>
          <h1 className="font-brand text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider leading-tight text-white drop-shadow-md">
            THE NEW ELEGANCE
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-md mx-auto">
            شکوه نوین در پوشاک فاخر - ترکیب استثنایی پارچه‌های تمام‌کشمیر و خیاطی آوانگارد
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('category')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-stone-900 font-bold text-xs rounded-full hover:bg-stone-100 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>مشاهده کالکشن</span>
              <ArrowLeft className="w-4 h-4 mr-2" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Categories Slider / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-brand text-2xl font-bold text-stone-900 dark:text-stone-100">
            دسته‌بندی‌های اختصاصی الیت
          </h2>
          <button
            onClick={() => navigateTo('category')}
            className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-amber-400 flex items-center gap-1"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockCategories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -4 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-stone-100 dark:bg-stone-800"
              onClick={() => navigateTo('category', { categoryId: cat.id })}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-sm leading-snug">{cat.name}</h3>
                  <span className="text-[11px] text-stone-300 font-light">
                    {toPersianDigits(cat.itemCount)} محصول
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Value Props Section (Matching image style: 3 cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Complimentary Delivery */}
          <div className="p-8 rounded-2xl bg-[#f5f4f0] dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200 shadow-sm">
              <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              ارسال رایگان اختصاصی
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              برای تمام سفارش‌های بالای ۲ میلیون تومان در سراسر کشور
            </p>
          </div>

          {/* Concierge Service */}
          <div className="p-8 rounded-2xl bg-[#f5f4f0] dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200 shadow-sm">
              <Headphones className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              خدمات کانسیرژ و پشتیبانی ۲۴/۷
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              پاسخگویی و مشاوره تخصصی سایز و استایل در تمام ساعات
            </p>
          </div>

          {/* Secure Transactions */}
          <div className="p-8 rounded-2xl bg-[#f5f4f0] dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              پرداخت کاملاً امن و تضمین‌شده
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              درگاه شتاب رمزنگاری‌شده و ضمـانت اصالت تمام محصولات الیت
            </p>
          </div>

        </div>
      </section>

      {/* 4. Countdown Drops Limited Edition Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0f0f0f] text-white p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl border border-stone-800">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 font-semibold">
            LIMITED EDITION DROPS
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl font-extrabold text-white">
            پایان مهلت ثبت‌نام دراپ جدید الیت
          </h2>

          <div className="flex justify-center items-center gap-4 text-center font-mono py-2">
            <div className="bg-stone-900/80 border border-stone-800 px-4 py-3 rounded-2xl min-w-[70px]">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {toPersianDigits(timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours)}
              </span>
              <span className="block text-[10px] text-stone-400 font-sans mt-1">ساعت</span>
            </div>
            <span className="text-xl text-stone-600 font-bold">:</span>
            <div className="bg-stone-900/80 border border-stone-800 px-4 py-3 rounded-2xl min-w-[70px]">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {toPersianDigits(timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes)}
              </span>
              <span className="block text-[10px] text-stone-400 font-sans mt-1">دقیقه</span>
            </div>
            <span className="text-xl text-stone-600 font-bold">:</span>
            <div className="bg-stone-900/80 border border-stone-800 px-4 py-3 rounded-2xl min-w-[70px]">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {toPersianDigits(timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds)}
              </span>
              <span className="block text-[10px] text-stone-400 font-sans mt-1">ثانیه</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Atelier Series Feature Banner (Matching image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/9] flex items-center p-8 md:p-16">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop"
            alt="The Atelier Series"
            className="absolute inset-0 w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          <div className="relative z-10 max-w-md text-white space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              NEW COLLECTION
            </span>
            <h2 className="font-brand text-3xl md:text-4xl font-extrabold leading-tight">
              THE ATELIER SERIES
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
              هنرمندی استادکاران در تلفیق پارچه‌های مرغوب جهانی با طراحی معاصر ایرانی در خاص‌ترین سری محصولات الیت.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('category')}
                className="px-6 py-3 border border-white text-white font-bold text-xs rounded-full hover:bg-white hover:text-black transition-all"
              >
                کشف سری اتلیه
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bestsellers Products Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              انتخاب مشتریان فاخر
            </span>
            <h2 className="font-brand text-2xl font-bold text-stone-900 dark:text-stone-100">
              محبوب‌ترین محصولات الیت
            </h2>
          </div>
          <button
            onClick={() => navigateTo('category')}
            className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-amber-400 flex items-center gap-1"
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-stone-900 text-white dark:bg-amber-400 dark:text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                      جدید
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      پرفروش
                    </span>
                  )}
                </div>

                {/* Quick Action Overlay Buttons */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="p-2.5 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white rounded-full hover:bg-white shadow-md transition-colors"
                    title="پیش‌نمایش سریع"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2.5 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white rounded-full hover:bg-white shadow-md transition-colors"
                    title="علاقه‌مندی"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{toPersianDigits(product.rating)}</span>
                  </div>
                </div>

                <h3
                  onClick={() => navigateTo('product-details', { productId: product.id })}
                  className="font-bold text-xs text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
                >
                  {product.name}
                </h3>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-extrabold text-sm text-stone-900 dark:text-amber-400">
                    {formatToman(product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl hover:bg-stone-900 hover:text-white dark:hover:bg-amber-400 dark:hover:text-black transition-colors"
                    title="افزودن به سبد خرید"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating AI Stylist Callout Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-stone-900/5 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                نمی‌دانید چه استایلی مناسب شماست؟
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                با مشاور استایل هوشمند الیت صحبت کنید تا بهترین ست را برای شما پیشنهاد دهد.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsStylistOpen(true)}
            className="px-6 py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-xs rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap shadow-md"
          >
            شروع گفتگو با مشاور
          </button>
        </div>
      </section>

    </div>
  );
};
