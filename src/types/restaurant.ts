export type PriceTier = "$" | "$$" | "$$$" | "$$$$";
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
 
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Chef {
  id: string;
  name: string;
  image?: string;
  specialty?: string;
}

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
  rating: number;
  comment: string;
  date: string;
}

export interface Pizza {
  id: string;
  pizzaName: string;
  cuisine: string;
  neighbourhood: string;
  city: string;
  chef: string;
  pizzaImage: string;
  pizzaDescription: string;
  pizzaSize: PizzaSize[];
  price: number;
  priceTier: PriceTier;
  softDrinks: SoftDrink[];
  tags: string[];
  inStock: boolean;
  availableTonight?: boolean;
  tableName: string;
  chairs: number;
  forFamily: boolean;
  freeTime: string[]
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export interface ReservePayload {
  name: string;
  email: string;
  pizzaName: string;
  image: string;
  price: number;
  size: PizzaSize;
  tableName: string;
  chairs: number;
  drinks: SoftDrink[];
}