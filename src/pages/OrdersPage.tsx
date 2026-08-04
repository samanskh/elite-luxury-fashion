import React from 'react';
import { Package, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const OrdersPage: React.FC = () => {
  const { orders, navigateTo } = useShop();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-brand text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
          تاریخچه سفارش‌های شما ({toPersianDigits(orders.length)} سفارش)
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Package className="w-12 h-12 mx-auto text-stone-400" />
          <p className="text-xs text-stone-500">هیچ سفارشی تاکنون ثبت نشده است.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-6 space-y-4 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4 text-xs font-bold">
                <div>
                  <span className="text-stone-400">کد رهگیری سفارش:</span>{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-mono">{order.trackingCode}</span>
                </div>
                <div>
                  <span className="text-stone-400">تاریخ:</span> {order.date}
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{order.status}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold text-stone-900 dark:text-stone-100">{item.product.name}</h4>
                      <p className="text-stone-500">
                        سایز: {item.selectedSize} | رنگ: {item.selectedColor.name} | تعداد: {toPersianDigits(item.quantity)}
                      </p>
                    </div>
                    <div className="text-xs font-extrabold text-stone-900 dark:text-amber-400">
                      {formatToman(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                <span className="font-bold text-stone-500">مبلغ کل پرداخت‌شده:</span>
                <span className="text-sm font-extrabold text-stone-900 dark:text-amber-400">{formatToman(order.totalAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
