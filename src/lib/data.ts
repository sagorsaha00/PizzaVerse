import { Category, FaqItem, Testimonial } from "@/types/restaurant";

 

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