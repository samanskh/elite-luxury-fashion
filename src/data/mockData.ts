import { Category, Product } from '../types';

export const mockCategories: Category[] = [
  {
    id: 'coats',
    name: 'پالتو و بارانی لوکس',
    description: 'کالکشن پالتوهای کشمیر و پشم طبیعی با دوخت اختصاصی اتلیه الیت',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop',
    itemCount: 14,
  },
  {
    id: 'suits',
    name: 'کت و شلوار اتلیه',
    description: 'ست‌های رسمی و نیمه‌رسمی با پارچه‌های ایتالیایی',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    itemCount: 12,
  },
  {
    id: 'dresses',
    name: 'مانتو و پیراهن فاخر',
    description: 'طراحی مدرن بر پایه اصالت پوشاک فاخر ایرانی',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    itemCount: 18,
  },
  {
    id: 'leather',
    name: 'کیف و کفش چرم طبیعی',
    description: 'صنایع چرمی دست‌دوز تبریز و کالکشن چرم طبیعی',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    itemCount: 10,
  },
  {
    id: 'accessories',
    name: 'اکسسوری و شال ابریشم',
    description: 'شال‌های ابریشم طبیعی و زیورآلات برنجی و طلاکاری',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop',
    itemCount: 15,
  },
];

export const mockProducts: Product[] = [
  {
    id: 'elt-001',
    name: 'پالتو دوطرفه کشمیر خاکی اتلیه',
    englishName: 'Atelier Double-Breasted Cashmere Coat',
    category: 'پالتو و بارانی لوکس',
    categoryId: 'coats',
    gender: 'women',
    price: 3850000,
    originalPrice: 4200000,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'پالتوی تمام‌کشمیر دوطرفه با کمربند چرمی دست‌دوز، طراحی شده برای فصل پاییز و زمستان. این اثر فاخر با الهام از خطوط معمارانه ایران باستان و پارچه کشمیر درجه یک ایتالیایی دوخته شده است.',
    fabricDetails: '۱۰۰٪ کشمیر طبیعی ایتالیایی، آستر ابریشم خام، دکمه‌های صدف طبیعی دست‌تراش',
    careInstructions: 'خشکشویی تخصصی با بخار سرد، نگهداری در کاور مخصوص الیت',
    sizes: ['۳۶', '۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'کرم خاکی', hex: '#C2B280' },
      { name: 'مشکی فاخر', hex: '#1C1917' },
      { name: 'زیتونی تیره', hex: '#3B413A' }
    ],
    isNew: true,
    isBestSeller: true,
    isLimitedEdition: true,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    tags: ['کالکشن جدید', 'پالتو', 'کشمیر', 'زنانه', 'زمستانه']
  },
  {
    id: 'elt-002',
    name: 'کت و شلوار پشمی فاستونی زغالی',
    englishName: 'Charcoal Tailored Suit',
    category: 'کت و شلوار اتلیه',
    categoryId: 'suits',
    gender: 'men',
    price: 4950000,
    originalPrice: 5500000,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'کت و شلوار مردانه با الگوبرداری از خیاطی مدرن میلان و برش اختصاصی آقایان الیت. پارچه پشم مرینوس ۱۲۰ سوپر مانع چروک شدن می‌شود و ایستایی خارق‌العاده‌ای به کت می‌بخشد.',
    fabricDetails: '۹۵٪ پشم مرینوس سوپر ۱۲۰، ۵٪ ابریشم، آستر ساتن ضدتعریق',
    careInstructions: 'خشکشویی خشک بدون آب، اتوکشی با دمای پایین',
    sizes: ['۴۸', '۵۰', '۵۲', '۵۴'],
    colors: [
      { name: 'زغالی', hex: '#36454F' },
      { name: 'سرمه‌ای عمیق', hex: '#1B263B' },
      { name: 'مشکی', hex: '#0F0F0F' }
    ],
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    tags: ['مردانه', 'کت و شلوار', 'رسمی', 'پشم مرینوس']
  },
  {
    id: 'elt-003',
    name: 'مانتوی اورسایز الیاف طبیعی عاجی',
    englishName: 'Ivory Oversized Atelier Manto',
    category: 'مانتو و پیراهن فاخر',
    categoryId: 'dresses',
    gender: 'women',
    price: 2890000,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'مانتوی لوکس زنانه با یقه کشیده و گلدوزی خامه دوزی صدف در قسمت سرآستین. تن‌خور آزاد و راحتی بی‌نظیر برای دیدارهای مهم رسمی و روزمره.',
    fabricDetails: '۱۰۰٪ لینن طبیعی بافته شده در اصفهان، سوزن‌دوزی خامه دست‌ساز',
    careInstructions: 'شستشو با دست و آب سرد، خشک کردن در سایه',
    sizes: ['فری سایز (۳۶ تا ۴۴)'],
    colors: [
      { name: 'سفید عاجی', hex: '#FDFBF7' },
      { name: 'شتری روشن', hex: '#D2B48C' }
    ],
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    tags: ['مانتو', 'زنانه', 'کتان', 'خامه‌دوزی']
  },
  {
    id: 'elt-004',
    name: 'بارانی کلاسیک ضدآب الیت ترنش',
    englishName: 'Heritage Water-Repellent Trench Coat',
    category: 'پالتو و بارانی لوکس',
    categoryId: 'coats',
    gender: 'unisex',
    price: 3250000,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'بارانی بلند تک‌سینه‌ با لایه ضدآب نانو و آستر چهارخانه سفارشی. طراحی جاودانه‌ای که فراتر از روندهای زودگذر مد پایدار است.',
    fabricDetails: 'گاباردین پنبه‌ای نانو با روکش مقاوم در برابر نفوذ باران',
    careInstructions: 'شستشو با شوینده ملایم مایع، عدم استفاده از نرم‌کننده',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'شتری классиک', hex: '#C19A6B' },
      { name: 'سبز ارتشی', hex: '#4B5320' },
      { name: 'مشکی', hex: '#1A1A1A' }
    ],
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    tags: ['بارانی', 'ترنش', 'ضدآب', 'کلاسیک']
  },
  {
    id: 'elt-005',
    name: 'کیف دستی چرم طبیعی تبریز - مدل ارک',
    englishName: 'Tabriz Leather Heritage Tote Bag',
    category: 'کیف و کفش چرم طبیعی',
    categoryId: 'leather',
    gender: 'women',
    price: 2490000,
    originalPrice: 2800000,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'کیف ساخت استادکاران برجسته تبریز با چرم طبیعی گاوی درجه یک، یراق‌آلات طلایی آنتیک و محفظه لپ‌تاپ تا ۱۵ اینچ.',
    fabricDetails: 'چرم طبیعی فول گرین تبریز، آستر جیر طبیعی',
    careInstructions: 'استفاده از واکس روغن طبیعی چرم هر سه ماه یک‌بار',
    sizes: ['تک سایز (۳۸x۲۸x۱۲ سم)'],
    colors: [
      { name: 'قهوه‌ای عسلی', hex: '#964B00' },
      { name: 'مشکی چرم', hex: '#121212' },
      { name: 'زرشکی عنابی', hex: '#800020' }
    ],
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    tags: ['کیف', 'چرم طبیعی', 'تبریز', 'دست‌دوز']
  },
  {
    id: 'elt-006',
    name: 'کت تک کشمیر زنانه طرح هک‌بون',
    englishName: 'Herringbone Cashmere Blazer',
    category: 'کت و شلوار اتلیه',
    categoryId: 'suits',
    gender: 'women',
    price: 3400000,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'کت تک شیک با پارچه بافت جناغی کشمیر، اپول‌های ظریف و دکمه‌های برنجی. مناسب برای استایل لایه‌ای و رسمی در پاییز.',
    fabricDetails: '۷۰٪ کشمیر، ۳۰٪ پشم خالص',
    careInstructions: 'خشکشویی خشک تخصصی',
    sizes: ['۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'خاکستری جناغی', hex: '#808080' },
      { name: 'قهوه‌ای شکلاتی', hex: '#4A2C2A' }
    ],
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 14,
    inStock: true,
    tags: ['کت تک', 'زنانه', 'جناغی', 'پاییزه']
  },
  {
    id: 'elt-007',
    name: 'شال ابریشم طبیعی با طرح نگارگری ایرانی',
    englishName: 'Persian Miniature Silk Scarf',
    category: 'اکسسوری و شال ابریشم',
    categoryId: 'accessories',
    gender: 'women',
    price: 1250000,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'شال تمام ابریشم خالص چاپ دیجیتال دستی بر اساس اثر اصیل مکتب صفوی. دوردوزی دست‌دوز و براقیت طبیعی چشم‌نواز.',
    fabricDetails: '۱۰۰٪ ابریشم توت طبیعی (Mulberry Silk)',
    careInstructions: 'شستشو فقط با شامپو بچه و آب ولرم دست',
    sizes: ['۱۴۰x۱۴۰ سانتی‌متر'],
    colors: [
      { name: 'آبی لاجوردی و طلایی', hex: '#0F52BA' },
      { name: 'سبز زمردی', hex: '#50C878' }
    ],
    isNew: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 68,
    inStock: true,
    tags: ['شال', 'ابریشم', 'نگارگری', 'لوکس']
  },
  {
    id: 'elt-008',
    name: 'کفش لوفر چرم طبیعی زنانه - سری اترس',
    englishName: 'Atrak Handmade Leather Loafers',
    category: 'کیف و کفش چرم طبیعی',
    categoryId: 'leather',
    gender: 'women',
    price: 2100000,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'کفش لوفر چرم طبیعی با کفی طبی ارگونومیک و پاشنه ۳ سانتی‌متر. راحتی فوق‌العاده برای استفاده طولانی‌مدت در محیط‌های کاری و رسمی.',
    fabricDetails: 'رویه چرم طبیعی ایتالیایی، کفی مموری فوم چرمی',
    careInstructions: 'تمیزکاری با دستمال مرطوب و اسپری محافظ چرم',
    sizes: ['۳۷', '۳۸', '۳۹', '۴۰'],
    colors: [
      { name: 'مشکی مات', hex: '#212121' },
      { name: 'قهوه‌ای نسکافه‌ای', hex: '#A52A2A' }
    ],
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 11,
    inStock: true,
    tags: ['کفش', 'لوفر', 'چرم', 'طبی']
  }
];

export const mockPromos = [
  { code: 'ELITE2026', discountPercent: 15, description: '۱۵٪ تخفیف ویژه کالکشن جدید الیت' },
  { code: 'YALDA', discountPercent: 20, description: '۲۰٪ تخفیف جشنواره شگفت‌انگیز' }
];

export const mockOrders = [
  {
    id: 'ORD-98214',
    trackingCode: 'ELT-8849201',
    date: '۱۴۰۴/۰۸/۱۲',
    status: 'تحویل داده شده',
    totalAmount: 4850000,
    items: [
      {
        product: mockProducts[0],
        selectedSize: 'Medium',
        selectedColor: mockProducts[0].colors[0],
        quantity: 1,
      },
    ],
  },
];
