import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export const AIFashionStylist: React.FC = () => {
  const { isStylistOpen, setIsStylistOpen } = useShop();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'درود! من مشاور هوشمند استایل و مد خانه الیت هستم. خوشحال می‌شوم در انتخاب برترین پوشاک فاخر، ست کردن رنگ‌ها و انتخاب سایز به شما کمک کنم. تمایل دارید درباره چه مناسبت یا محصولی گفتگو کنیم؟',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterPrompts = [
    'برای مهمانی رسمی پاییزی چی بپوشم؟',
    'چه کیفی با پالتو کشمیر خاکی ست می‌شود؟',
    'تفاوت پشم مرینوس و کشمیر در کت‌وشلوار چیست؟',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isStylistOpen) {
      scrollToBottom();
    }
  }, [messages, isStylistOpen]);

  if (!isStylistOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await res.json();
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || 'در خدمت شما هستم.',
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'پالتوهای تمام‌کشمیر خاکی و کت‌وشلوارهای زغالی سوپر ۱۲۰ پشمی الیت، ترکیبی استثنایی از شکوه و وقار برای استایل شما در این فصل هستند.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden p-4 sm:p-6 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsStylistOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-lg w-full h-[600px] max-h-[90vh] shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white dark:bg-stone-950 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm">مشاور هوشمند استایل ELITE</h3>
                <span className="text-[10px] text-amber-400">آنلاین • پاسخگویی با هوش مصنوعی</span>
              </div>
            </div>
            <button
              onClick={() => setIsStylistOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50 dark:bg-stone-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-black'
                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 rounded-tr-none'
                      : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 p-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>مشاور در حال تحلیل و پاسخ‌گویی است...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Quick Prompts */}
          {messages.length === 1 && (
            <div className="px-4 py-2 flex gap-1.5 overflow-x-auto bg-stone-100 dark:bg-stone-800/60 border-t border-stone-200/60 dark:border-stone-800">
              {starterPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-white dark:bg-stone-900 hover:border-amber-500 border border-stone-300 dark:border-stone-700 rounded-full text-[10px] text-stone-700 dark:text-stone-300 font-medium whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="سوال خود درباره استایل، رنگ یا سایز را بپرسید..."
                className="flex-1 py-2.5 px-3 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-stone-900 text-white dark:bg-amber-400 dark:text-black rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
