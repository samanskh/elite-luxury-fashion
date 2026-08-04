export type Gender = 'women' | 'men' | 'unisex';

export interface Product {
  id: string;
  name: string; // Persian name (e.g., "پالتو کشمیر دوطرفه الیت")
  englishName?: string;
  category: string; // Persian category (e.g., "پالتو و بارانی")
  categoryId: string; // e.g., "coats", "suits", "dresses", "accessories"
  gender: Gender;
  price: number; // in Toman (e.g., 2490000)
  originalPrice?: number; // for discount display
  images: string[];
  description: string;
  fabricDetails: string;
  careInstructions: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  name?: string;
  phone: string;
  email: string;
  avatar: string;
  vipTier: 'طلایی' | 'الماس' | 'پلاتینیوم';
  addresses: Address[];
}

export interface Address {
  id: string;
  title: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  receiverName: string;
  receiverPhone: string;
}

export interface Order {
  id: string; // e.g., "ELT-98421"
  date: string; // e.g., "۱۴۰۴/۰۵/۱2"
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: 'در حال پردازش' | 'ارسال شده' | 'تحویل داده شده' | 'لغو شده';
  trackingCode: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export type PageView = 
  | 'home'
  | 'category'
  | 'product-details'
  | 'cart'
  | 'wishlist'
  | 'search'
  | 'login'
  | 'profile'
  | 'orders'
  | 'about'
  | 'contact'
  | '404';

export interface FilterState {
  categoryId?: string;
  gender?: Gender | 'all';
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
  sortBy: 'bestselling' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}
