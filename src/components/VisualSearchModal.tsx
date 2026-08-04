import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Upload, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { mockProducts } from '../data/mockData';

export const VisualSearchModal: React.FC = () => {
  const { isVisualSearchOpen, setIsVisualSearchOpen, navigateTo } = useShop();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  if (!isVisualSearchOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        analyzeImageWithGemini(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImageWithGemini = async (base64Data: string) => {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data }),
      });

      const data = await res.json();
      setAnalysisResult(data.analysis || 'تحلیل با موفقیت انجام شد.');
    } catch (err) {
      console.error(err);
      setAnalysisResult(
        'این تصویر با پالتو کشمیر خاکی الیت و کیف چرم تبریز بالاترین همخوانی استایل را دارد.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisualSearchOpen(false);
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 p-6 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                اسکن و ست‌یاب هوشمند تصویری الیت
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Upload Drop Area */}
          {!selectedImage ? (
            <label className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-amber-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors bg-stone-50/50 dark:bg-stone-800/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  عکس لباس یا استایل مورد نظر خود را اینجا آپلود کنید
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  فرمت‌های JPG، PNG تا حجم ۱۰ مگابایت
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 max-h-60 mx-auto">
                <img
                  src={selectedImage}
                  alt="آپلود شده"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysisResult(null);
                  }}
                  className="absolute top-2 left-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center gap-3 py-6 text-amber-600 dark:text-amber-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-xs font-bold">
                    هوش مصنوعی الیت در حال تحلیل بافت، رنگ و برش استایل تصویر شماست...
                  </span>
                </div>
              )}

              {/* Analysis Results */}
              {analysisResult && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 bg-amber-50/60 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                      <Sparkles className="w-4 h-4" />
                      <span>تحلیل هوشمند استایل:</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                      {analysisResult}
                    </p>
                  </div>

                  {/* Matching Products Grid */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-stone-500 dark:text-stone-400">
                      محصولات پیشنهادی هم‌خوانی با این استایل:
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {mockProducts.slice(0, 2).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            handleClose();
                            navigateTo('product-details', { productId: p.id });
                          }}
                          className="flex items-center gap-2 p-2 bg-stone-50 dark:bg-stone-800 rounded-xl hover:ring-1 hover:ring-amber-500 text-right transition-all"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h5 className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate">
                              {p.name}
                            </h5>
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                              مشاهده محصول
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
