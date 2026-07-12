export type PriceTier = "$" | "$$" | "$$$" | "$$$$";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  neighbourhood: string;
  city: string;
  rating: number;
  reviewCount: number;
  priceTier: PriceTier;
  image: string;
  shortDescription: string;
  tags: string[];
  availableTonight?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// ── Shared ────────────────────────────────────────────────────────────────

export type PriceTier = "$" | "$$" | "$$$" | "$$$$";

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1–5
  comment: string;
  date: string; // ISO date, e.g. "2026-06-14"
}

// ── Chef ─────────────────────────────────────────────────────────────────

export interface Chef {
  id: string;
  name: string;
  image?: string;
  specialty?: string; // e.g. "Neapolitan dough"
}

// ── Drinks ───────────────────────────────────────────────────────────────


export type PizzaSizeLabel = "Small" | "Medium" | "Large" | "Family";

export interface PizzaSize {
  size: PizzaSizeLabel;
  inches: number;
  price: number;
}

export interface SoftDrink {
  id: string;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1–5
  comment: string;
  date: string; // ISO date
}

export interface Pizza {
  id: string;
  pizzaName: string;
  cuisine: string;
  neighbourhood: string;
  city: string;
  chef: string;

  // menu item
  pizzaImage: string;
  pizzaDescription: string;
  pizzaSize: PizzaSize[];
  price: number; // starting price, i.e. smallest size
  priceTier: PriceTier;
  softDrinks: SoftDrink[];
  tags: string[];
  inStock: boolean;
  availableTonight?: boolean;

  // seating
  tableName: string;
  chairs: number;
  forFamily: boolean;
  freeTime: string[]; // readable availability windows

  // social proof
  reviews: Review[];
  rating: number;
  reviewCount: number;
}