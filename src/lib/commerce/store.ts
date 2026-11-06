import fs from "fs";
import path from "path";
import { POPULAR_PRODUCTS } from "@/data/products";
import { BRAND } from "@/lib/brand";

export interface OrderItem {
  productId: string;
  name: string;
  variantId: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
  grind: string;
  subtotal: number;
}

export interface CustomerShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: "razorpay" | "cod" | "demo";
  paymentStatus: "pending" | "paid" | "failed" | "demo_verified";
  paymentId?: string;
  razorpayOrderId?: string;
  fulfillmentStatus: "placed" | "roasting" | "dispatched" | "delivered";
  trackingNumber?: string;
  estimatedDelivery: string;
  notes?: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "unread" | "read" | "responded";
}

interface CommerceDatabase {
  orders: Order[];
  subscribers: NewsletterSubscriber[];
  contactMessages: ContactMessage[];
  inventory: Record<string, number>; // sku/productId -> stock
}

const DATA_DIR = path.join(process.cwd(), "data", "store");
const DB_FILE = path.join(DATA_DIR, "commerce.json");

// In-memory fallback if file system is read-only (e.g. some serverless runtimes)
let memoryStore: CommerceDatabase = {
  orders: [],
  subscribers: [],
  contactMessages: [],
  inventory: {
    "original-filter-coffee": 140,
    "estate-blend": 95,
    "bold-roast": 80,
    "kavero-gift-pack": 45,
  },
};

function ensureDbFile(): CommerceDatabase {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(memoryStore, null, 2), "utf8");
    } else {
      const data = fs.readFileSync(DB_FILE, "utf8");
      memoryStore = JSON.parse(data);
    }
  } catch {
    // If file IO fails in edge environments, gracefully fallback to memoryStore
  }
  return memoryStore;
}

function saveDb(data: CommerceDatabase) {
  memoryStore = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch {
    // Ignore in-memory fallback
  }
}

// Indian PIN Code City/State Resolution & Serviceability Checker
export function validateAndResolvePinCode(pincode: string): {
  valid: boolean;
  city: string;
  state: string;
  serviceable: boolean;
  estimatedDays: string;
} {
  const cleanPin = pincode.replace(/\D/g, "");
  if (cleanPin.length !== 6) {
    return { valid: false, city: "", state: "", serviceable: false, estimatedDays: "" };
  }

  // Major Indian Pin Code regions mapping
  const first2 = parseInt(cleanPin.slice(0, 2), 10);
  let state = "Karnataka";
  let city = "Bengaluru";

  if (first2 >= 56 && first2 <= 59) {
    state = "Karnataka";
    if (first2 === 56) city = "Bengaluru Urban";
    else if (first2 === 57) city = "Chikmagalur / Mangaluru / Shimoga";
    else if (first2 === 58) city = "Hubballi-Dharwad";
    else city = "Belagavi";
  } else if (first2 >= 60 && first2 <= 64) {
    state = "Tamil Nadu";
    city = first2 === 60 ? "Chennai" : "Coimbatore";
  } else if (first2 >= 67 && first2 <= 69) {
    state = "Kerala";
    city = "Kochi / Thiruvananthapuram";
  } else if (first2 >= 50 && first2 <= 53) {
    state = "Telangana & Andhra Pradesh";
    city = "Hyderabad";
  } else if (first2 >= 40 && first2 <= 44) {
    state = "Maharashtra";
    city = first2 === 40 ? "Mumbai" : "Pune";
  } else if (first2 === 11) {
    state = "Delhi NCR";
    city = "New Delhi";
  } else if (first2 >= 70 && first2 <= 74) {
    state = "West Bengal";
    city = "Kolkata";
  } else {
    state = "India (All Zones)";
    city = "Standard Delivery Area";
  }

  return {
    valid: true,
    city,
    state,
    serviceable: true,
    estimatedDays: first2 >= 56 && first2 <= 59 ? "1–2 business days" : "3–5 business days",
  };
}

// Create a new order with rigorous server-side price calculation
export function createOrderServerSide(payload: {
  customer: CustomerShippingAddress;
  items: { productId: string; variantId?: string; grind?: string; quantity: number }[];
  paymentMethod: "razorpay" | "cod" | "demo";
  notes?: string;
}): Order {
  const db = ensureDbFile();

  const validatedItems: OrderItem[] = [];
  let calculatedSubtotal = 0;

  for (const item of payload.items) {
    const product = POPULAR_PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    const variant = product.variants.find((v) => v.id === item.variantId) || product.variants[0] || {
      id: "default",
      weight: product.weight,
      price: product.price,
      inStock: true,
      sku: product.id,
    };

    const qty = Math.max(1, item.quantity || 1);
    const itemSubtotal = variant.price * qty;
    calculatedSubtotal += itemSubtotal;

    validatedItems.push({
      productId: product.id,
      name: product.name,
      variantId: variant.id,
      weight: variant.weight,
      price: variant.price,
      quantity: qty,
      image: product.image,
      grind: item.grind || "fine-filter",
      subtotal: itemSubtotal,
    });
  }

  const freeThreshold = BRAND.shipping.freeThreshold; // 499
  const shippingFee = calculatedSubtotal >= freeThreshold ? 0 : BRAND.shipping.standardFee;
  const total = calculatedSubtotal + shippingFee;

  const orderNum = `KAV-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
  const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const pinResolution = validateAndResolvePinCode(payload.customer.pincode);

  const newOrder: Order = {
    id: orderId,
    orderNumber: orderNum,
    createdAt: new Date().toISOString(),
    customer: {
      ...payload.customer,
      city: payload.customer.city || pinResolution.city,
      state: payload.customer.state || pinResolution.state,
    },
    items: validatedItems,
    subtotal: calculatedSubtotal,
    shippingFee,
    total,
    paymentMethod: payload.paymentMethod,
    paymentStatus: payload.paymentMethod === "demo" ? "demo_verified" : "pending",
    fulfillmentStatus: "placed",
    estimatedDelivery: pinResolution.estimatedDays || "3–5 business days",
    trackingNumber: `KVIN${Date.now().toString().slice(-8)}`,
    notes: payload.notes || "",
  };

  db.orders.unshift(newOrder);

  // Decrement inventory safely
  for (const itm of validatedItems) {
    if (db.inventory[itm.productId] !== undefined) {
      db.inventory[itm.productId] = Math.max(0, db.inventory[itm.productId] - itm.quantity);
    }
  }

  saveDb(db);
  return newOrder;
}

export function getOrderById(id: string): Order | undefined {
  const db = ensureDbFile();
  return db.orders.find((o) => o.id === id || o.orderNumber === id);
}

export function listAllOrders(): Order[] {
  const db = ensureDbFile();
  return db.orders;
}

export function updateOrderStatus(
  orderId: string,
  update: { paymentStatus?: Order["paymentStatus"]; fulfillmentStatus?: Order["fulfillmentStatus"] }
): Order | undefined {
  const db = ensureDbFile();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) return undefined;

  if (update.paymentStatus) order.paymentStatus = update.paymentStatus;
  if (update.fulfillmentStatus) order.fulfillmentStatus = update.fulfillmentStatus;

  saveDb(db);
  return order;
}

export function addNewsletterSubscriber(email: string, source: string = "homepage"): boolean {
  const db = ensureDbFile();
  const cleanEmail = email.trim().toLowerCase();
  const existing = db.subscribers.find((s) => s.email === cleanEmail);
  if (!existing) {
    db.subscribers.push({
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
      source,
    });
    saveDb(db);
  }
  return true;
}

export function listNewsletterSubscribers(): NewsletterSubscriber[] {
  const db = ensureDbFile();
  return db.subscribers;
}

export function addContactMessage(message: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): ContactMessage {
  const db = ensureDbFile();
  const newMsg: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: message.name,
    email: message.email,
    phone: message.phone,
    subject: message.subject,
    message: message.message,
    createdAt: new Date().toISOString(),
    status: "unread",
  };
  db.contactMessages.unshift(newMsg);
  saveDb(db);
  return newMsg;
}

export function listContactMessages(): ContactMessage[] {
  const db = ensureDbFile();
  return db.contactMessages;
}

export function getInventoryStatus(): Record<string, number> {
  const db = ensureDbFile();
  return db.inventory;
}

export function updateInventoryStock(productId: string, stock: number) {
  const db = ensureDbFile();
  db.inventory[productId] = Math.max(0, stock);
  saveDb(db);
}
