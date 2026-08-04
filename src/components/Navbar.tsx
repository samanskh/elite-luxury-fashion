import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronDown, 
  PhoneCall, 
  ArrowLeft 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { toPersianDigits } from '../utils/formatters';
import { mockCategories } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    navigateTo,
    currentPage,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    isDark,
    toggleDarkMode,
    user
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search');
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1c1917] text-[#f5f5f4] dark:bg-stone-900 dark:border-b dark:border-stone-800 text-xs py-2 px-4 tracking-wide font-medium flex items-center justify-between overflow-x-hidden">
        <div className="hidden sm:flex items-center gap-1 text-stone-400">
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
          <span>پشتیبانی الیت: ۰۲۱-۲۲۰۰۸۸۹۹</span>
        </div>
        <div className="mx-auto flex items-center gap-2 text-center text-[11px] sm:text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping flex-shrink-0" />
          <span>ارسال رایگان پستی برای تمام سفارش‌های بالای ۲,۰۰۰,۰۰۰ تومان</span>
        </div>
        <div className="hidden sm:block w-32" />
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">

            {/* Right side: Mobile Hamburger & Brand Logo */}
            <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl"
                aria-label="منو"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Brand Logo */}
              <button 
                onClick={() => navigateTo('home')} 
                className="flex flex-col items-start group text-right cursor-pointer"
              >
                <span className="font-brand text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.18em] text-stone-900 dark:text-stone-100 group-hover:opacity-80 transition-opacity">
                  ELITE
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.25em] font-light text-stone-500 dark:text-stone-400 -mt-1 uppercase">
                  ATELIER TEHRAN
                </span>
              </button>

              {/* Desktop Nav Menu */}
              <nav className="hidden xl:flex items-center gap-6 mr-4 text-sm font-medium text-stone-700 dark:text-stone-300">
                <button
                  onClick={() => navigateTo('home')}
                  className={`hover:text-stone-900 dark:hover:text-white transition-colors py-2 ${
                    currentPage === 'home' ? 'text-stone-950 dark:text-amber-400 font-bold border-b-2 border-stone-950 dark:border-amber-400' : ''
                  }`}
                >
                  خانه
                </button>

                {/* Category Mega Dropdown */}
                <div 
                  className="relative group py-2"
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                >
                  <button
                    onClick={() => navigateTo('category')}
                    className={`flex items-center gap-1 hover:text-stone-900 dark:hover:text-white transition-colors ${
                      currentPage === 'category' ? 'text-stone-950 dark:text-amber-400 font-bold' : ''
                    }`}
                  >
                    <span>دسته‌بندی‌ها</span>
                    <ChevronDown className="w-4 h-4 text-stone-400 group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown Menu */}
                  {isCategoryDropdownOpen && (
                    <div className="absolute right-0 top-full w-64 bg-white dark:bg-stone-900 shadow-2xl rounded-2xl border border-stone-200 dark:border-stone-800 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800 text-xs font-semibold text-stone-400">
                        مجموعه‌های اختصاصی الیت
                      </div>
                      {mockCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            navigateTo('category', { categoryId: cat.id });
                            setIsCategoryDropdownOpen(false);
                          }}
                          className="w-full text-right px-4 py-2.5 text-sm hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center justify-between text-stone-800 dark:text-stone-200 transition-colors"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-stone-400 font-normal">({toPersianDigits(cat.itemCount)})</span>
                        </button>
                      ))}
                      <div className="border-t border-stone-100 dark:border-stone-800 pt-2 mt-1 px-4">
                        <button
                          onClick={() => {
                            navigateTo('category');
                            setIsCategoryDropdownOpen(false);
                          }}
                          className="w-full text-center text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline py-1"
                        >
                          مشاهده همه محصولات ←
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigateTo('category', { categoryId: 'coats' })}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors py-2 flex items-center gap-1"
                >
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold">جدید</span>
                  <span>کالکشن پاییز</span>
                </button>
              </nav>
            </div>

            {/* Embedded Desktop & Tablet Search Bar (Integrated E-commerce Search Style) */}
            <form 
              onSubmit={handleSearchSubmit}
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex flex-1 max-w-md mx-4 relative items-center cursor-pointer group"
            >
              <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute right-3.5 pointer-events-none group-hover:text-amber-500 transition-colors" />
              <input
                type="text"
                readOnly
                value={searchQuery}
                placeholder="جستجو در نام محصولات، پالتو، کت، کیف..."
                className="w-full pr-10 pl-4 py-2 bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 rounded-full text-xs font-medium text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 cursor-pointer focus:outline-none hover:bg-stone-100 dark:hover:bg-stone-800 transition-all shadow-xs"
              />
              <span className="absolute left-3 text-[10px] text-stone-400 bg-stone-200/60 dark:bg-stone-700/60 px-2 py-0.5 rounded-full font-sans">
                Enter ↵
              </span>
            </form>

            {/* Left side: Actions Icons & Theme Toggle */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                aria-label="جستجو"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => navigateTo('wishlist')}
                className="relative p-2 sm:p-2.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                aria-label="علاقه‌مندی‌ها"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {toPersianDigits(wishlist.length)}
                  </span>
                )}
              </button>

              {/* Shopping Cart Drawer Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                aria-label="سبد خرید"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#1c1917] dark:bg-amber-400 text-white dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {toPersianDigits(cartItemCount)}
                  </span>
                )}
              </button>

              {/* User Profile / Auth Button */}
              <button
                onClick={() => navigateTo(user ? 'profile' : 'login')}
                className="p-2 sm:p-2.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                aria-label="حساب کاربری"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Dark / Light Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-2.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                aria-label="تغییر تم"
                title={isDark ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {/* Mobile Search Input */}
            <div 
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="relative flex items-center cursor-pointer mb-2"
            >
              <Search className="w-4 h-4 text-stone-400 absolute right-3 pointer-events-none" />
              <input
                type="text"
                readOnly
                placeholder="جستجو در محصولات الیت..."
                className="w-full pr-9 pl-3 py-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 cursor-pointer"
              />
            </div>

            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-right py-2 text-stone-800 dark:text-stone-200 font-medium flex items-center justify-between"
            >
              <span>صفحه اصلی</span>
              <ArrowLeft className="w-4 h-4 text-stone-400" />
            </button>

            <div className="border-t border-stone-100 dark:border-stone-800 pt-2">
              <div className="text-xs font-semibold text-stone-400 mb-2">دسته‌بندی‌های اختصاصی</div>
              {mockCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    navigateTo('category', { categoryId: cat.id });
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-right py-2 px-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-stone-400">({toPersianDigits(cat.itemCount)})</span>
                </button>
              ))}
            </div>

            <div className="border-t border-stone-100 dark:border-stone-800 pt-3 flex gap-2">
              <button
                onClick={() => {
                  navigateTo('about');
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-center text-xs text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 rounded-lg"
              >
                درباره برند الیت
              </button>
              <button
                onClick={() => {
                  navigateTo('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-center text-xs text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 rounded-lg"
              >
                شعب و تماس
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

