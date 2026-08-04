// Convert English digits to Persian digits
export const toPersianDigits = (num: number | string): string => {
  if (num === null || num === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
};

// Format price in Toman with thousand separators and Persian numbers
export const formatToman = (amount: number): string => {
  if (amount === undefined || amount === null) return '۰ تومان';
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${toPersianDigits(formatted)} تومان`;
};

// Format Persian date
export const getCurrentJalaliDate = (): string => {
  // Simple Jalali string format representation for mock
  return '۱۴۰۴/۰۵/۱۴';
};

// Generate random tracking code for order
export const generateTrackingCode = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '2489';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
