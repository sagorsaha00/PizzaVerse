import { Category, FaqItem, Pizza, SoftDrink, Testimonial } from "@/types/restaurant";

// Shared drink catalog — reused across pizzerias so images/prices stay consistent
const cola: SoftDrink = {
  id: "drink-cola",
  name: "Classic Cola",
  image:
    "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=400&auto=format&fit=crop",
  price: 120,
  inStock: true,
};

const lemonSoda: SoftDrink = {
  id: "drink-lemon-soda",
  name: "Sicilian Lemon Soda",
  image:
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=400&auto=format&fit=crop",
  price: 150,
  inStock: true,
};

const orangeJuice: SoftDrink = {
  id: "drink-orange-juice",
  name: "Fresh Orange Juice",
  image:
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=400&auto=format&fit=crop",
  price: 180,
  inStock: false,
};

const icedTea: SoftDrink = {
  id: "drink-iced-tea",
  name: "Peach Iced Tea",
  image:
    "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=400&auto=format&fit=crop",
  price: 140,
  inStock: true,
};

const gingerAle: SoftDrink = {
  id: "drink-ginger-ale",
  name: "Ginger Ale",
  image:
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&auto=format&fit=crop",
  price: 130,
  inStock: true,
};

export const pizzas: Pizza[] = [
  {
    id: "bella-forno",
    pizzaName: "Margherita al Forno",
    cuisine: "Neapolitan Pizza",
    neighbourhood: "Agrabad",
    city: "Chattogram",
    chef: "Marco Bellini",
    pizzaImage:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "A 900° stone oven, San Marzano tomatoes, and dough fermented for 48 hours — Margherita done the way Naples intended.",
    pizzaSize: [
      { size: "Small", inches: 10, price: 590 },
      { size: "Medium", inches: 12, price: 790 },
      { size: "Large", inches: 16, price: 990 },
    ],
    price: 590,
    priceTier: "$$",
    softDrinks: [lemonSoda, cola],
    tags: ["Neapolitan", "Wood-Fired", "Tasting Menu"],
    inStock: true,
    availableTonight: true,
    tableName: "Table 4",
    chairs: 2,
    forFamily: false,
    freeTime: ["12:00 PM – 3:00 PM", "8:00 PM – 11:00 PM"],
    reviews: [
      {
        id: "rev-bf-1",
        author: "Nusrat Jahan",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        comment: "Real leopard-spot char on the crust. Best Margherita in the city.",
        date: "2026-06-14",
      },
    ],
    rating: 4.9,
    reviewCount: 318,
  },
  {
    id: "nonnas-table",
    pizzaName: "Sicilian Sfincione",
    cuisine: "Sicilian Deep-Dish",
    neighbourhood: "Nasirabad",
    city: "Chattogram",
    chef: "Farah Chowdhury",
    pizzaImage:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "Thick, crispy-edged squares baked in century-old steel pans — a family recipe carried over from Palermo.",
    pizzaSize: [
      { size: "Medium", inches: 12, price: 690 },
      { size: "Large", inches: 16, price: 890 },
      { size: "Family", inches: 18, price: 1190 },
    ],
    price: 690,
    priceTier: "$$",
    softDrinks: [cola, icedTea],
    tags: ["Sicilian", "Deep-Dish", "Family Style"],
    inStock: true,
    availableTonight: true,
    tableName: "Family Booth 1",
    chairs: 6,
    forFamily: true,
    freeTime: ["1:00 PM – 4:00 PM", "6:00 PM – 8:00 PM"],
    reviews: [
      {
        id: "rev-nt-1",
        author: "Rafiq Ahmed",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        rating: 4.5,
        comment: "Enough for the whole family and leftovers the next day.",
        date: "2026-05-30",
      },
    ],
    rating: 4.6,
    reviewCount: 204,
  },
  {
    id: "ember-and-vine",
    pizzaName: "Charred Eggplant & Feta",
    cuisine: "Mediterranean Wood-Fired",
    neighbourhood: "GEC Circle",
    city: "Chattogram",
    chef: "Elena Petrakis",
    pizzaImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "Charred crust, smoked eggplant, whipped feta, and a rooftop terrace built for long, unhurried dinners.",
    pizzaSize: [
      { size: "Medium", inches: 12, price: 850 },
      { size: "Large", inches: 16, price: 1090 },
    ],
    price: 850,
    priceTier: "$$$",
    softDrinks: [lemonSoda, gingerAle],
    tags: ["Wood-Fired", "Rooftop", "Date Night"],
    inStock: true,
    tableName: "Rooftop Table 2",
    chairs: 4,
    forFamily: false,
    freeTime: ["6:00 PM – 8:00 PM", "8:30 PM – 11:00 PM"],
    reviews: [],
    rating: 4.7,
    reviewCount: 176,
  },
  {
    id: "crust-and-co",
    pizzaName: "Classic Pepperoni Slice",
    cuisine: "New York Style",
    neighbourhood: "Khulshi",
    city: "Chattogram",
    chef: "Tony Bruno",
    pizzaImage:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "Foldable, oversized slices sold by the cut — the counter-service classic, open past midnight on weekends.",
    pizzaSize: [
      { size: "Small", inches: 8, price: 220 },
      { size: "Large", inches: 18, price: 950 },
    ],
    price: 220,
    priceTier: "$$",
    softDrinks: [cola, orangeJuice],
    tags: ["By the Slice", "Late Night"],
    inStock: true,
    availableTonight: true,
    tableName: "Counter Seat 7",
    chairs: 1,
    forFamily: false,
    freeTime: ["11:00 AM – 11:59 PM"],
    reviews: [],
    rating: 4.8,
    reviewCount: 389,
  },
  {
    id: "verde-slice",
    pizzaName: "Roasted Vegetable Garden",
    cuisine: "Plant-Forward Pizza",
    neighbourhood: "Panchlaish",
    city: "Chattogram",
    chef: "Amara Rahman",
    pizzaImage:
      "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "A rotating vegetable-topped menu shaped by what the local farm co-op picks each Tuesday morning.",
    pizzaSize: [
      { size: "Medium", inches: 12, price: 620 },
      { size: "Large", inches: 16, price: 820 },
    ],
    price: 620,
    priceTier: "$$",
    softDrinks: [icedTea, gingerAle],
    tags: ["Vegetarian", "Farm to Table"],
    inStock: true,
    tableName: "Garden Table 3",
    chairs: 4,
    forFamily: true,
    freeTime: ["12:00 PM – 2:30 PM", "7:00 PM – 9:30 PM"],
    reviews: [],
    rating: 4.5,
    reviewCount: 138,
  },
  {
    id: "casa-lumina-pizzeria",
    pizzaName: "Tartufo Bianco",
    cuisine: "Northern Italian",
    neighbourhood: "Zakir Hossain Rd",
    city: "Chattogram",
    chef: "Luca Moretti",
    pizzaImage:
      "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "Hand-stretched dough, a 400-bottle cellar, and candlelight that never feels staged.",
    pizzaSize: [
      { size: "Medium", inches: 12, price: 990 },
      { size: "Large", inches: 16, price: 1290 },
    ],
    price: 990,
    priceTier: "$$$",
    softDrinks: [lemonSoda, cola],
    tags: ["Wine List", "Hand-Stretched"],
    inStock: true,
    tableName: "Candlelight Table 5",
    chairs: 2,
    forFamily: false,
    freeTime: ["7:00 PM – 9:00 PM", "9:30 PM – 11:30 PM"],
    reviews: [],
    rating: 4.7,
    reviewCount: 261,
  },
  {
    id: "smoke-and-stone",
    pizzaName: "14-Hour Brisket Pie",
    cuisine: "BBQ-Topped Pizza",
    neighbourhood: "CDA Avenue",
    city: "Chattogram",
    chef: "Jax Coleman",
    pizzaImage:
      "https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "14-hour smoked brisket over a charred crust, a whiskey wall, and communal tables built from reclaimed pallets.",
    pizzaSize: [
      { size: "Medium", inches: 12, price: 750 },
      { size: "Large", inches: 16, price: 980 },
    ],
    price: 750,
    priceTier: "$$",
    softDrinks: [cola, gingerAle],
    tags: ["BBQ", "Casual"],
    inStock: true,
    availableTonight: true,
    tableName: "Pallet Table 1",
    chairs: 8,
    forFamily: true,
    freeTime: ["5:00 PM – 7:00 PM", "7:30 PM – 10:00 PM"],
    reviews: [],
    rating: 4.4,
    reviewCount: 192,
  },
  {
    id: "salt-line-pizzeria",
    pizzaName: "White Clam Coastal Pie",
    cuisine: "Coastal Seafood Pizza",
    neighbourhood: "Patenga",
    city: "Chattogram",
    chef: "Noor Islam",
    pizzaImage:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800&auto=format&fit=crop",
    pizzaDescription:
      "Beachfront tables, a daily changing white-pie special, and the best sunset seating in the city.",
    pizzaSize: [
      { size: "Medium", inches: 12, price: 890 },
      { size: "Large", inches: 16, price: 1150 },
    ],
    price: 890,
    priceTier: "$$$",
    softDrinks: [lemonSoda, icedTea],
    tags: ["Seafood", "Beachfront"],
    inStock: false,
    tableName: "Beachfront Table 9",
    chairs: 4,
    forFamily: true,
    freeTime: ["5:30 PM – 7:00 PM"],
    reviews: [],
    rating: 4.6,
    reviewCount: 227,
  },
];

export const categories: Category[] = [
  {
    id: "neapolitan",
    name: "Neapolitan",
    count: 22,
    image:
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "sicilian",
    name: "Sicilian & Deep-Dish",
    count: 14,
    image:
      "https://images.unsplash.com/photo-1548369937-47519962c11a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "wood-fired",
    name: "Wood-Fired",
    count: 27,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "new-york",
    name: "New York Style",
    count: 19,
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "by-the-slice",
    name: "By the Slice",
    count: 16,
    image:
      "https://images.unsplash.com/photo-1548369937-47519962c11a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "vegetarian",
    name: "Plant-Forward",
    count: 11,
    image:
      "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?q=80&w=600&auto=format&fit=crop",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "PizzaVerse found us a table at Bella Forno on forty minutes' notice for an anniversary dinner we'd been trying to book for months. The curation is genuinely different from anywhere else.",
    author: "Nusrat Jahan",
    role: "Food writer, The Daily Table",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t2",
    quote:
      "I stopped checking three different apps. PizzaVerse's filters actually understand what 'thin crust, open late, good for a group' means.",
    author: "Rafiq Ahmed",
    role: "Regional Manager, Delta Freight",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t3",
    quote:
      "As a pizzaiolo, listing on PizzaVerse brought in the kind of guest who reads the menu before they arrive. Bookings are up, and so is the tip average.",
    author: "Chef Farah Chowdhury",
    role: "Owner, Nonna's Table",
    avatar:
      "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=200&auto=format&fit=crop",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "Is booking through PizzaVerse free?",
    answer:
      "Yes. Browsing, saving tables, and booking are free for diners. Pizzerias pay a small monthly fee to be listed and reach PizzaVerse's audience.",
  },
  {
    id: "f2",
    question: "How are pizzerias chosen for PizzaVerse?",
    answer:
      "Every oven is visited in person by our editorial team before it's listed, and we re-review listings twice a year to keep standards consistent.",
  },
  {
    id: "f3",
    question: "Can I cancel or change a reservation?",
    answer:
      "You can amend or cancel a booking directly from your dashboard up to two hours before your reservation time, free of charge.",
  },
  {
    id: "f4",
    question: "Do you cover cities outside Chattogram?",
    answer:
      "We're currently focused on Chattogram, with Dhaka and Sylhet opening for reservations later this year.",
  },
  {
    id: "f5",
    question: "How do I list my pizzeria on PizzaVerse?",
    answer:
      "Create an account, then use the Add Restaurant page to submit your details for editorial review. Most listings go live within five business days.",
  },
];