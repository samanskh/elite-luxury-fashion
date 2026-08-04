import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, PageView, Product, ToastMessage, UserProfile, WishlistItem } from '../types';
import { mockOrders, mockProducts, mockPromos } from '../data/mockData';
import { generateTrackingCode, getCurrentJalaliDate } from '../utils/formatters';

interface ShopContextType {
  // Navigation & State
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProductId: string | null;
  selectedCategoryId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  navigateTo: (page: PageView, params?: { productId?: string; categoryId?: string }) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;
  isStylistOpen: boolean;
  setIsStylistOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  updateCartQuantity: (productId: string, size: string, colorHex: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  cartItemCount: number;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromoCode: (code: string) => boolean;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Recent Views
  recentViews: Product[];
  addRecentView: (product: Product) => void;

  // User & Auth
  user: UserProfile | null;
  loginUser: (phoneOrEmail: string) => void;
  logoutUser: () => void;

  // Orders
  orders: Order[];
  createOrder: (paymentMethod?: string) => Order | null;

  // Dark Mode
  isDark: boolean;
  toggleDarkMode: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const defaultUser: UserProfile = {
  id: 'usr-101',
  fullName: 'سارا محمدی',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  email: 'sara.mohammadi@elite.ir',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  vipTier: 'طلایی',
  addresses: [
    {
      id: 'addr-1',
      title: 'منزل - فرشته',
      province: 'تهران',
      city: 'تهران',
      fullAddress: 'خيابان فرشته، خیابان بیدار، پلاک ۲۴، واحد ۶',
      postalCode: '۱۹۶۵۸۴۳۲۱۱',
      receiverName: 'سارا محمدی',
      receiverPhone: '۰۹۱۲۳۴۵۶۷۸۹',
    }
  ]
};

const initialOrders: Order[] = [
  {
    id: 'ELT-98421',
    date: '۱۴۰۴/۰۵/۰۱',
    items: [
      {
        product: mockProducts[0],
        selectedSize: '۳۸',
        selectedColor: mockProducts[0].colors[0],
        quantity: 1,
      }
    ],
    totalAmount: 3850000,
    discountAmount: 0,
    finalAmount: 3850000,
    status: 'ارسال شده',
    trackingCode: '248998421A',
    shippingAddress: defaultUser.addresses[0],
    paymentMethod: 'پرداخت آنلاین - کارت به کارت متصل',
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page View state
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Dark mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('elite_theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('elite_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('elite_theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  // Cart LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('elite_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: mockProducts[0],
        selectedSize: '۳۸',
        selectedColor: mockProducts[0].colors[0],
        quantity: 1
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('elite_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist LocalStorage persistence
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('elite_wishlist');
    return saved ? JSON.parse(saved) : [
      { product: mockProducts[1], addedAt: '۱۴۰۴/۰۵/۱۰' },
      { product: mockProducts[4], addedAt: '۱۴۰۴/۰۵/۱۲' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('elite_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Recent Views
  const [recentViews, setRecentViews] = useState<Product[]>([]);

  const addRecentView = (product: Product) => {
    setRecentViews(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Promo
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);

  // User Auth
  const [user, setUser] = useState<UserProfile | null>(defaultUser);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('elite_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('elite_orders', JSON.stringify(orders));
  }, [orders]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (page: PageView, params?: { productId?: string; categoryId?: string }) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
      const prod = mockProducts.find(p => p.id === params.productId);
      if (prod) addRecentView(prod);
    }
    if (params?.categoryId) {
      setSelectedCategoryId(params.categoryId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const addToCart = (
    product: Product,
    size?: string,
    color?: { name: string; hex: string },
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'تک سایز';
    const chosenColor = color || product.colors[0] || { name: 'اصلی', hex: '#000000' };

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id &&
                item.selectedSize === chosenSize &&
                item.selectedColor.hex === chosenColor.hex
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize: chosenSize, selectedColor: chosenColor, quantity }];
      }
    });

    showToast(`${product.name} با موفقیت به سبد خرید اضافه شد`, 'success');
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor.hex === colorHex)));
    showToast('محصول از سبد خرید حذف شد', 'info');
  };

  const updateCartQuantity = (productId: string, size: string, colorHex: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size && item.selectedColor.hex === colorHex) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromoCode = (code: string): boolean => {
    const found = mockPromos.find(p => p.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setAppliedPromo({ code: found.code, discountPercent: found.discountPercent });
      showToast(`کد تخفیف ${found.code} اعمال شد (${found.discountPercent}٪ تخفیف)`, 'success');
      return true;
    } else {
      showToast('کد تخفیف وارد شده معتبر نیست', 'error');
      return false;
    }
  };

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.product.id === product.id);
      if (exists) {
        showToast(`${product.name} از علاقه‌مندی‌ها حذف شد`, 'info');
        return prev.filter(item => item.product.id !== product.id);
      } else {
        showToast(`${product.name} به لیست علاقه‌مندی‌ها اضافه شد`, 'success');
        return [...prev, { product, addedAt: getCurrentJalaliDate() }];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(item => item.product.id === productId);

  // User auth fake
  const loginUser = (phoneOrEmail: string) => {
    setUser({
      ...defaultUser,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : defaultUser.email,
      phone: !phoneOrEmail.includes('@') ? phoneOrEmail : defaultUser.phone,
    });
    showToast('خوش آمدید! با موفقیت وارد حساب کاربری خود شدید.', 'success');
    navigateTo('profile');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('از حساب کاربری خارج شدید.', 'info');
    navigateTo('home');
  };

  // Checkout Fake Order creation
  const createOrder = (paymentMethod: string = 'پرداخت آنلاین متصل به شتاب'): Order | null => {
    if (cart.length === 0) return null;

    const newOrder: Order = {
      id: `ELT-${Math.floor(10000 + Math.random() * 90000)}`,
      date: getCurrentJalaliDate(),
      items: [...cart],
      totalAmount: cartSubtotal,
      discountAmount,
      finalAmount: cartTotal,
      status: 'در حال پردازش',
      trackingCode: generateTrackingCode(),
      shippingAddress: user?.addresses[0] || defaultUser.addresses[0],
      paymentMethod,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedPromo(null);
    setIsCartOpen(false);
    showToast(`سفارش ${newOrder.id} با موفقیت ثبت شد! کد رهگیری: ${newOrder.trackingCode}`, 'success');
    navigateTo('orders');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        selectedCategoryId,
        searchQuery,
        setSearchQuery,
        navigateTo,

        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        isStylistOpen,
        setIsStylistOpen,
        quickViewProduct,
        setQuickViewProduct,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartItemCount,
        appliedPromo,
        applyPromoCode,

        wishlist,
        toggleWishlist,
        isInWishlist,

        recentViews,
        addRecentView,

        user,
        loginUser,
        logoutUser,

        orders,
        createOrder,

        isDark,
        toggleDarkMode,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
