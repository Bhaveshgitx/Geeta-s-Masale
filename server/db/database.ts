/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'server', 'db', 'data');

// Ensure database directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read JSON file synchronously with type safety
function readDataFile<T>(filename: string, defaultData: T): T {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filename}, re-initializing:`, err);
    return defaultData;
  }
}

// Helper to write JSON file synchronously
function writeDataFile(filename: string, data: any): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Structures mimicking MySQL tables
export interface Admin {
  id: number;
  username: string;
  passwordHash: string;
  role: 'Super Admin' | 'Manager' | 'Staff';
  name: string;
}

export interface Category {
  id: string; // e.g. 'Masale'
  name: string;
  description: string;
  image: string;
  count: number;
  hidden: boolean;
}

export interface Product {
  id: string;
  category: string;
  name: string;
  weight: string;
  mrp: number;
  ratePerKg: number;
  description: string;
  ingredients: string;
  usage: string;
  shelfLife: string;
  notes: string;
  image: string;
  stock: number;
  isBestseller: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  weight: string;
}

export interface Order {
  id: string; // Order ID
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail: string;
  items: OrderItem[];
  paymentType: 'UPI' | 'COD';
  amount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  transactionReference: string;
  status: 'Success' | 'Pending' | 'Failed';
  createdAt: string;
}

export interface Review {
  id: number;
  name: string;
  ratingValue: number; // 1-5
  comment: string;
  date: string;
  verified: boolean;
  approved: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface WebsiteSettings {
  logo: string;
  upiId: string;
  contactNumber: string;
  email: string;
  address: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  footer: string;
  storeStatus: 'Open' | 'Closed' | 'Maintenance';
}

export interface Banner {
  id: number;
  title: string;
  image: string;
  active: boolean;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: 'Percentage' | 'Fixed';
  value: number;
  minOrderAmount: number;
  active: boolean;
}

// Dynamic seeds directly in-file to make Express completely standalone
const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'Masale',
    name: 'Malvani Masalas & Chutneys',
    description: 'Generations of expertise in roasting and blending coastal spices, red chillies, and garlic.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    count: 11,
    hidden: false
  },
  {
    id: 'Pith',
    name: 'Traditional Flours (Pith)',
    description: 'Freshly milled rice, pulse, and grain flours prepared for authentic Bhakri, Vade, and Modak.',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format&fit=crop&q=80',
    count: 7,
    hidden: false
  },
  {
    id: 'Malvani products',
    name: 'Konkan Specialties & Meva',
    description: 'Sun-dried Kokum, parboiled rice, fruit leathers (Poli), and authentic farm-fresh items.',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80',
    count: 11,
    hidden: false
  },
  {
    id: 'Laddoos',
    name: 'Handmade Laddoos',
    description: 'Sweet, nutritious daily delicacies rolled with pure ghee, organic jaggery, peanuts, and dry fruits.',
    image: 'https://images.unsplash.com/photo-1581781868311-6415779c13dd?w=600&auto=format&fit=crop&q=80',
    count: 4,
    hidden: false
  },
  {
    id: 'Kaju',
    name: 'Premium Malvan Cashews (Kaju)',
    description: 'Export-grade whole cashews, salted variants, masala-flavored crunch, and healthy split kernels.',
    image: '/src/assets/images/cashew_premium_1780594672474.png',
    count: 7,
    hidden: false
  }
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'm1',
    category: 'Masale',
    name: 'Malvani Special Sunday Masala',
    weight: '250gm',
    mrp: 275,
    ratePerKg: 1100,
    description: 'Our crown jewel. A secret multi-generational blend of heavy-roast spices and rich Ghati chillies designed for your slow-cooked Sunday feasts.',
    ingredients: 'Coriander, Red Chilli, Cumin, Turmeric, Black Pepper, Dagad Phool, Star Anise, Jaiphal, Aromatic Konkan Spices',
    usage: 'Add 2-3 tablespoons during the gravy tempering phase. Cook on low heat to release slow-roasted essential oils.',
    shelfLife: '12 Months',
    notes: 'No artificial colors, preservatives, or added MSG. Strictly vegetarian.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    stock: 120,
    isBestseller: true
  },
  {
    id: 'm2',
    category: 'Masale',
    name: 'Malvani Fish Fry Masala',
    weight: '300gm',
    mrp: 240,
    ratePerKg: 800,
    description: 'High-acid, fiery spice blend optimized to grip fish skin and create an elite, gold-paneled outer crunch during pan frying.',
    ingredients: 'Red Chilli, Roasted Coriander, Pure Turmeric, Dried Garlic, Iodized Salt, Coastal Heritage Spices',
    usage: 'Mix with lime juice or kokum water to make a paste. Generously coat fish slices, dust with semolina, and shallow fry.',
    shelfLife: '12 Months',
    notes: 'Specially crafted for Pomfret, Surmai, Bangda, and prawns.',
    image: 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?w=600&auto=format&fit=crop&q=80',
    stock: 85,
    isBestseller: true
  },
  {
    id: 'm3',
    category: 'Masale',
    name: 'Biryani Masala',
    weight: '250gm',
    mrp: 300,
    ratePerKg: 1320,
    description: 'A sovereign blend of fragrant whole spices, ground precisely to deliver that trademark royal aromatic cloud when you crack open the handi dum.',
    ingredients: 'Green Cardamom, Cloves, Cinnamon Bark, Bay Leaf, Nutmeg, Mace, Black Cumin, Rose Petals',
    usage: 'Add during rice boiling and sprinkle between layers of rice and meat/vegetables before dum sealing.',
    shelfLife: '12 Months',
    notes: 'Magnificently suited for both authentic vegetable and slow-cooked meat biryanis.',
    image: 'https://images.unsplash.com/photo-1543083477-4f7f02b77884?w=600&auto=format&fit=crop&q=80',
    stock: 95,
    isBestseller: false
  },
  {
    id: 'm4',
    category: 'Masale',
    name: 'Kashmiri Mirchi Powder',
    weight: '250gm',
    mrp: 220,
    ratePerKg: 880,
    description: 'Expertly selected mild-heat Kashmiri chillies ground at low temperature to preserve the shiny carotenoidal red oils and sweet natural glaze.',
    ingredients: 'Premium, hand-picked deseeded Kashmiri Red Chillies',
    usage: 'Incorporate in slow curries, subzis, and marinades for a brilliant, photogenic crimson hue without burning heat.',
    shelfLife: '12 Months',
    notes: 'Dual action: works as an organic visual glaze and a mild warm aroma enhancer.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    stock: 140,
    isBestseller: false
  },
  {
    id: 'k1',
    category: 'Kaju',
    name: 'Authentic Konkan Jumbo Cashews (W180)',
    weight: '250gm',
    mrp: 380,
    ratePerKg: 1520,
    description: 'King-sized full cashew kernels. Crispy, sweet, fully dried, and hand-sorted directly from coastal plantations.',
    ingredients: '100% Grade W180 Cashew nuts',
    usage: 'Ready to munch. Use in luxurious dessert garnishing, rich Kaju Katlis, or raw snacking.',
    shelfLife: '6 Months',
    notes: 'Zero chemical additions. High energy, heart-healthy fats.',
    image: '/src/assets/images/cashew_premium_1780594672474.png',
    stock: 70,
    isBestseller: true
  }
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Prasad Gawde",
    ratingValue: 5,
    comment: "Pure organic Sankeshwari and Ghati chilli mix. True taste of Malvan kitchen. The Sunday masala is out of this world!",
    date: "2026-06-15",
    verified: true,
    approved: true
  },
  {
    id: 2,
    name: "Aparna Parab",
    ratingValue: 5,
    comment: "The Peanuts Chutney and Khobra Lasun Chutney are delicious with bhakri. Strongly suggest this to everyone who loves home-style Konkan cooking.",
    date: "2026-06-14",
    verified: true,
    approved: true
  }
];

const DEFAULT_SETTINGS: WebsiteSettings = {
  logo: "https://ik.imagekit.io/9f6w6a0wf/logo.png.png",
  upiId: "bhaveshkoyande62@okaxis",
  contactNumber: "+91 91762 04289",
  email: "geetasmasale@gmail.com",
  address: "Near Dewoolwada along Kasal-Malvan Highway, Malvan, Maharashtra, India",
  socialLinks: {
    instagram: "https://instagram.com/geetasmasale",
    facebook: "https://facebook.com/geetasmasale",
    whatsapp: "https://wa.me/917620428920"
  },
  footer: "© 2026 Sri Geeta's Spices. Handcrafted along the beautiful shores of Malvan. Built with absolute love.",
  storeStatus: "Open"
};

const DEFAULT_COUPONS: Coupon[] = [
  { id: 1, code: "GEETA50", discountType: "Fixed", value: 50, minOrderAmount: 399, active: true },
  { id: 2, code: "KONKAN10", discountType: "Percentage", value: 10, minOrderAmount: 500, active: true }
];

const DEFAULT_BANNERS: Banner[] = [
  { id: 1, title: "Pure Sunday Griddle Roast", image: "/src/assets/images/masala_hero_1780594616996.png", active: true }
];

// Initialize database storage collections
export const getAdmins = () => {
  const admins = readDataFile<Admin[]>('admins.json', []);
  if (admins.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    // Secure default password geeta2004
    const passwordHash = bcrypt.hashSync('geeta2004', salt);
    const superAdmin: Admin = {
      id: 1,
      username: 'admin',
      passwordHash,
      role: 'Super Admin',
      name: 'Bhavesh Admin'
    };
    admins.push(superAdmin);
    writeDataFile('admins.json', admins);
  }
  return admins;
};

export const getCategories = () => readDataFile<Category[]>('categories.json', DEFAULT_CATEGORIES);
export const saveCategories = (categories: Category[]) => writeDataFile('categories.json', categories);

export const getProducts = () => readDataFile<Product[]>('products.json', DEFAULT_PRODUCTS);
export const saveProducts = (products: Product[]) => writeDataFile('products.json', products);

export const getOrders = () => readDataFile<Order[]>('orders.json', []);
export const saveOrders = (orders: Order[]) => writeDataFile('orders.json', orders);

export const getPayments = () => readDataFile<Payment[]>('payments.json', []);
export const savePayments = (payments: Payment[]) => writeDataFile('payments.json', payments);

export const getReviews = () => readDataFile<Review[]>('reviews.json', DEFAULT_REVIEWS);
export const saveReviews = (reviews: Review[]) => writeDataFile('reviews.json', reviews);

export const getContactMessages = () => readDataFile<ContactMessage[]>('contact_messages.json', []);
export const saveContactMessages = (messages: ContactMessage[]) => writeDataFile('contact_messages.json', messages);

export const getWebsiteSettings = () => readDataFile<WebsiteSettings>('website_settings.json', DEFAULT_SETTINGS);
export const saveWebsiteSettings = (settings: WebsiteSettings) => writeDataFile('website_settings.json', settings);

export const getBanners = () => readDataFile<Banner[]>('banners.json', DEFAULT_BANNERS);
export const saveBanners = (banners: Banner[]) => writeDataFile('banners.json', banners);

export const getCoupons = () => readDataFile<Coupon[]>('coupons.json', DEFAULT_COUPONS);
export const saveCoupons = (coupons: Coupon[]) => writeDataFile('coupons.json', coupons);
