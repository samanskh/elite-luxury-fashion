import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Volume2, 
  Loader2, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronDown, 
  Sparkles,
  Plus,
  Minus,
  Ruler
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { mockProducts } from '../data/mockData';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    recentViews,
    navigateTo,
    showToast
  } = useShop();

  const product = mockProducts.find(p => p.id === selectedProductId) || mockProducts[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'تک سایز');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(product.colors[0] || { name: 'اصلی', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<'fabric' | 'care' | 'shipping' | null>('fabric');

  // TTS audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  const handlePlayTTS = async () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    setAudioLoading(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${product.name}. ${product.description}. قیمت: ${formatToman(product.price)}`,
        }),
      });

      const data = await res.json();
      if (data.audioBase64) {
        // Decode and play base64 PCM/WAV
        const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
        audio.play();
        setIsPlayingAudio(true);
        audio.onended = () => setIsPlayingAudio(false);
      } else {
        showToast('امکان پخش صدا در حال حاضر فراهم نیست.', 'warning');
      }
    } catch (err) {
      console.error(err);
      showToast('امکان پخش صوتی با گوینده هوشمند فراهم نشد.', 'info');
    } finally {
      setAudioLoading(false);
    }
  };

  const relatedProducts = mockProducts.filter(p => p.id !== product.id && p.categoryId === product.categoryId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-in fade-in duration-300">

      {/* Main Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Gallery Column */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-md group">
            <img
              src={product.images[activeImgIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-stone-900 text-white dark:bg-amber-400 dark:text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  کالکشن جدید
                </span>
              )}
              {product.isLimitedEdition && (
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  نسخه محدود
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto p-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImgIndex === idx ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="space-y-6">

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{toPersianDigits(product.rating)}</span>
                <span className="text-stone-400 font-normal">({toPersianDigits(product.reviewCount)} دیدگاه تخصصی)</span>
              </div>
            </div>

            <h1 className="font-brand text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
              {product.name}
            </h1>
            {product.englishName && (
              <p className="text-xs text-stone-400 font-sans tracking-wide">
                {product.englishName}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="text-3xl font-extrabold text-stone-900 dark:text-amber-400">
              {formatToman(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-stone-400 line-through">
                {formatToman(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Audio Description Player Button (Gemini TTS) */}
          <div className="p-3.5 bg-gradient-to-r from-amber-500/10 to-stone-900/5 dark:from-amber-400/20 dark:to-stone-800/40 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  گوينده صوتی هوشمند توضیحات محصول
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  شنیدن توضیحات اختصاصی پارچه و استایل محصول
                </p>
              </div>
            </div>
            <button
              onClick={handlePlayTTS}
              disabled={audioLoading}
              className="px-4 py-2 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              {audioLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{isPlayingAudio ? 'توقف پخش' : 'پخش توضیحات'}</span>
              )}
            </button>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
              رنگ انتخابی: <span className="font-normal text-stone-500">{selectedColor.name}</span>
            </label>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c)}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform ${
                    selectedColor.hex === c.hex ? 'border-amber-500 scale-110 shadow-md' : 'border-stone-300 dark:border-stone-700'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor.hex === c.hex && (
                    <Check className={`w-4 h-4 ${c.hex === '#FDFBF7' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector + Size Guide */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-stone-800 dark:text-stone-200">
                سایز:
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>راهنمای سایز</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === s
                      ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-black border-stone-900 dark:border-amber-400 shadow-xs'
                      : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-3 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 bg-stone-50 dark:bg-stone-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white p-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-extrabold px-2">{toPersianDigits(quantity)}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
              className="flex-1 py-3.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-extrabold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>افزودن به سبد خرید</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-xl border transition-colors ${
                isInWishlist(product.id)
                  ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Guarantees Badges */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>ارسال رایگان پستی</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-amber-500" />
              <span>۷ روز ضمانت تعویض</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>ضمـانت اصالت کالا</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="border-t border-stone-200 dark:border-stone-800 space-y-2 pt-4">
            {/* Fabric Details */}
            <div className="border-b border-stone-100 dark:border-stone-800 pb-2">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                className="w-full flex justify-between items-center py-2 text-xs font-bold text-stone-900 dark:text-stone-100"
              >
                <span>مشخصات و جنس پارچه</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'fabric' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'fabric' && (
                <p className="text-xs text-stone-500 dark:text-stone-400 py-2 leading-relaxed">
                  {product.fabricDetails}
                </p>
              )}
            </div>

            {/* Care Instructions */}
            <div className="border-b border-stone-100 dark:border-stone-800 pb-2">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                className="w-full flex justify-between items-center py-2 text-xs font-bold text-stone-900 dark:text-stone-100"
              >
                <span>دستورالعمل نگهداری و شستشو</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'care' && (
                <p className="text-xs text-stone-500 dark:text-stone-400 py-2 leading-relaxed">
                  {product.careInstructions}
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-stone-200 dark:border-stone-800">
          <h3 className="font-brand text-xl font-bold text-stone-900 dark:text-stone-100">
            محصولات مشابه در این دسته‌بندی
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateTo('product-details', { productId: rel.id })}
                className="group cursor-pointer space-y-2 bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:shadow-md transition-all"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{rel.name}</h4>
                <div className="text-xs font-extrabold text-amber-600 dark:text-amber-400">{formatToman(rel.price)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl max-w-md w-full space-y-4 border border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm">راهنمای جدول سایزبندی الیت</h3>
              <button onClick={() => setIsSizeGuideOpen(false)}>✕</button>
            </div>
            <div className="text-xs space-y-2 text-stone-600 dark:text-stone-400">
              <p>• سایز ۳۶: دور سینه ۸۴ | دور کمر ۶۶ | دور باسن ۹۰ سم</p>
              <p>• سایز ۳۸: دور سینه ۸۸ | دور کمر ۷۰ | دور باسن ۹۴ سم</p>
              <p>• سایز ۴۰: دور سینه ۹۲ | دور کمر ۷۴ | دور باسن ۹۸ سم</p>
              <p>• سایز ۴۲: دور سینه ۹۶ | دور کمر ۷۸ | دور باسن ۱۰۲ سم</p>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
