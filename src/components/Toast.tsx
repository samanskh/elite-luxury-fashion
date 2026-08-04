import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let bgClass = 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border border-stone-800 dark:border-stone-200';
          let iconColor = 'text-amber-400 dark:text-amber-600';

          if (toast.type === 'error') {
            Icon = XCircle;
            iconColor = 'text-rose-400';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconColor = 'text-sky-400';
          } else if (toast.type === 'warning') {
            Icon = AlertCircle;
            iconColor = 'text-amber-400';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-md ${bgClass}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                <span className="text-sm font-medium leading-tight">{toast.title}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-full hover:bg-stone-800/50 dark:hover:bg-stone-200/50 transition-colors mr-2"
                aria-label="بستن"
              >
                <X className="w-4 h-4 text-stone-400 dark:text-stone-600" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
