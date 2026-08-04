import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid, LayoutList, X, Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { mockCategories, mockProducts } from '../data/mockData';
import { formatToman, toPersianDigits } from '../utils/formatters';
import { Gender, Product } from '../types';

export const CategoryPage: React.FC = () => {
  const {
    selectedCategoryId,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  // Filter States
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryId || 'all');
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(6000000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'bestselling' | 'price-asc' | 'price-desc'>('bestselling');
  const [viewMode, setViewMode] = useState<'grid-4' | 'grid-3' | 'list'>('grid-4');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination / Load More simulation
  const [visibleCount, setVisibleCount] = useState(8);

  const handleCategoryChange = (catId: string) => {
    setIsLoading(true);
    setActiveCategory(catId);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.categoryId === activeCategory);
    }

    if (selectedGender !== 'all') {
      result = result.filter(p => p.gender === selectedGender || p.gender === 'unisex');
    }

    result = result.filter(p => p.price <= maxPrice);

    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'bestselling') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, selectedGender, maxPrice, inStockOnly, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">

      {/* Header Title */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            فروشگاه اختصاصی الیت
          </span>
          <h1 className="font-brand text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            {activeCategory === 'all'
              ? 'تمامی محصولات کالکشن'
              : mockCategories.find(c => c.id === activeCategory)?.name || 'فروشگاه الیت'}
          </h1>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          نمایش {toPersianDigits(displayedProducts.length)} از {toPersianDigits(filteredProducts.length)} کالا
        </div>
      </div>

      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold"
        >
          <Filter className="w-4 h-4 text-amber-500" />
          <span>فیلترهای پیشرفته</span>
        </button>

        {/* Gender Tabs */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setSelectedGender('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedGender === 'all' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-400 shadow-xs' : 'text-stone-500'
            }`}
          >
            همه
          </button>
          <button
            onClick={() => setSelectedGender('women')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedGender === 'women' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-400 shadow-xs' : 'text-stone-500'
            }`}
          >
            زنانه
          </button>
          <button
            onClick={() => setSelectedGender('men')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedGender === 'men' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-400 shadow-xs' : 'text-stone-500'
            }`}
          >
            مردانه
          </button>
        </div>

        {/* Sort & View Options */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold px-3 py-1.5 rounded-xl border-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="bestselling">پرفروش‌ترین‌ها</option>
              <option value="newest">جدیدترین‌ها</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
          </div>

          {/* Grid View Switcher */}
          <div className="hidden sm:flex items-center gap-1 border-r border-stone-200 dark:border-stone-800 pr-3">
            <button
              onClick={() => setViewMode('grid-4')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid-4' ? 'bg-stone-200 dark:bg-stone-800 text-black dark:text-amber-400' : 'text-stone-400'}`}
              title="نمای ۴ ستونه"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-stone-200 dark:bg-stone-800 text-black dark:text-amber-400' : 'text-stone-400'}`}
              title="نمای لیستی"
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs`}>
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2 font-bold text-sm text-stone-900 dark:text-stone-100">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>فیلترهای جستجو</span>
            </div>
            {isMobileFilterOpen && (
              <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden text-stone-400">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Categories List */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">دسته‌بندی‌ها</label>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`w-full text-right py-2 px-3 rounded-xl text-xs font-semibold flex justify-between transition-colors ${
                activeCategory === 'all'
                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-black'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <span>همه دسته‌ها</span>
              <span>({toPersianDigits(mockProducts.length)})</span>
            </button>
            {mockCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-full text-right py-2 px-3 rounded-xl text-xs font-semibold flex justify-between transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-black'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <span>{cat.name}</span>
                <span>({toPersianDigits(cat.itemCount)})</span>
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>حداکثر قیمت:</span>
              <span className="text-amber-600 dark:text-amber-400">{formatToman(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={6000000}
              step={200000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* In Stock Only Toggle */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">فقط کالاهای موجود</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedGender('all');
              setMaxPrice(6000000);
              setInStockOnly(false);
            }}
            className="w-full py-2.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-amber-400 transition-colors border border-stone-200 dark:border-stone-800 rounded-xl"
          >
            پاک کردن فیلترها
          </button>
        </aside>

        {/* Products Grid / List Container */}
        <main className="lg:col-span-3 space-y-6">
          {isLoading ? (
            /* Skeleton Loading Simulation */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-stone-200 dark:bg-stone-800 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 space-y-3 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800">
              <p className="text-sm font-bold text-stone-600 dark:text-stone-400">
                محصولی با فیلترهای انتخابی شما پیدا نشد.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedGender('all');
                  setMaxPrice(6000000);
                }}
                className="px-4 py-2 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold"
              >
                نمایش همه محصولات
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'list'
                  ? 'space-y-4'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              }
            >
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row p-4 gap-6' : 'flex flex-col justify-between'
                  }`}
                >
                  <div className={`relative overflow-hidden bg-stone-100 dark:bg-stone-800 ${
                    viewMode === 'list' ? 'w-full sm:w-48 aspect-[3/4] rounded-xl flex-shrink-0' : 'aspect-[3/4]'
                  }`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Quick Buttons */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="p-2.5 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white rounded-full hover:bg-white shadow-md"
                        title="پیش‌نمایش سریع"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="p-2.5 bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white rounded-full hover:bg-white shadow-md"
                        title="علاقه‌مندی"
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span>{product.category}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{toPersianDigits(product.rating)}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => navigateTo('product-details', { productId: product.id })}
                        className="font-bold text-xs text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors line-clamp-2 mt-1"
                      >
                        {product.name}
                      </h3>

                      {viewMode === 'list' && (
                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-2">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
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
          )}

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="text-center pt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="px-8 py-3 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                بارگذاری محصولات بیشتر
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
