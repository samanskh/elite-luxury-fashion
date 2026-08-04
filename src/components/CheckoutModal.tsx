import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, MapPin, Truck, CreditCard, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatToman } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { user, cartTotal, createOrder } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<'express' | 'courier'>('express');
  const [paymentMethod, setPaymentMethod] = useState<string>('پرداخت آنلاین - متصل به درگاه شتاب');

  if (!isOpen) return null;

  const currentAddress = user?.addresses[selectedAddressIndex] || {
    title: 'منزل',
    province: 'تهران',
    city: 'تهران',
    fullAddress: 'خیابان فرشته، خیابان بیدار، پلاک ۲۴، واحد ۶',
    postalCode: '۱۹۶۵۸۴۳۲۱۱',
    receiverName: 'سارا محمدی',
    receiverPhone: '۰۹۱۲۳۴۵۶۷۸۹',
  };

  const handleFinalSubmit = () => {
    createOrder(paymentMethod);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 p-6 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                تسویه‌حساب و پرداخت امن
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center justify-between px-4 text-xs font-bold text-stone-400">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-600 dark:text-amber-400' : ''}`}>
              <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">۱</div>
              <span>آدرس و گیرنده</span>
            </div>
            <div className="h-0.5 flex-1 mx-2 bg-stone-200 dark:bg-stone-800" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-600 dark:text-amber-400' : ''}`}>
              <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">۲</div>
              <span>روش ارسال</span>
            </div>
            <div className="h-0.5 flex-1 mx-2 bg-stone-200 dark:bg-stone-800" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-600 dark:text-amber-400' : ''}`}>
              <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">۳</div>
              <span>پرداخت</span>
            </div>
          </div>

          {/* Step 1: Address */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>آدرس تحویل سفارش را انتخاب کنید:</span>
              </div>

              <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span>{currentAddress.title} ({currentAddress.receiverName})</span>
                  <span className="text-[10px] text-amber-600 bg-amber-100 dark:bg-amber-900 px-2 py-0.5 rounded-full">پیش‌فرض</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {currentAddress.province}، {currentAddress.city}، {currentAddress.fullAddress}
                </p>
                <div className="text-[11px] text-stone-500 pt-1 border-t border-amber-200/60 dark:border-amber-900/60 flex justify-between">
                  <span>کد پستی: {currentAddress.postalCode}</span>
                  <span>شماره تماس: {currentAddress.receiverPhone}</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
              >
                <span>ادامه و انتخاب روش ارسال</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>شیوه ارسال سفارش را مشخص کنید:</span>
              </div>

              <div className="space-y-2">
                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/40'
                      : 'border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${shippingMethod === 'express' ? 'text-amber-500' : 'text-stone-300'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">ارسال اختصاصی اکسپرس الیت</h4>
                      <p className="text-[11px] text-stone-500">تحویل سفارشی طی ۲۴ تا ۴۸ ساعت کاری در بسته کاور مخمل الیت</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">رایگان</span>
                </label>

                <label
                  onClick={() => setShippingMethod('courier')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'courier'
                      ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/40'
                      : 'border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${shippingMethod === 'courier' ? 'text-amber-500' : 'text-stone-300'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">پیک اختصاصی وی‌آی‌پای (مخصوص تهران)</h4>
                      <p className="text-[11px] text-stone-500">تحویل فوری زیر ۳ ساعت کاری در روز جاری</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{formatToman(85000)}</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 text-xs font-semibold text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50"
                >
                  بازگشت
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-stone-900 text-white dark:bg-amber-400 dark:text-black font-bold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
                >
                  <span>ادامه به مرحله پرداخت</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>روش پرداخت:</span>
              </div>

              <div className="space-y-2">
                <label
                  onClick={() => setPaymentMethod('پرداخت آنلاین - متصل به درگاه شتاب')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod.includes('آنلاین')
                      ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/40'
                      : 'border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${paymentMethod.includes('آنلاین') ? 'text-amber-500' : 'text-stone-300'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">پرداخت اینترنتی با کلیه کارت‌های شتاب</h4>
                      <p className="text-[11px] text-stone-500">سریع، ایمن و دارای تاییدیه نماد اعتماد الکترونیکی</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>مبلغ کل سفارش:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{formatToman(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>هزینه ارسال:</span>
                  <span>رایگان</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-amber-600 dark:text-amber-400 pt-2 border-t border-stone-200 dark:border-stone-700">
                  <span>مبلغ نهایی قابل پرداخت:</span>
                  <span>{formatToman(cartTotal)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-3 text-xs font-semibold text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50"
                >
                  بازگشت
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex-1 py-3 bg-[#1c1917] text-white dark:bg-amber-400 dark:text-black font-extrabold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl"
                >
                  <ShieldCheck className="w-5 h-5 text-amber-400 dark:text-black" />
                  <span>پرداخت و ثبت نهایی سفارش</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
