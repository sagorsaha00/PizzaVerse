# 🍕 PizzaVerse | Artisanal Neapolitan Pizza Engine

PizzaVerse is a modern, high-performance web application designed for pizza enthusiasts in Chattogram who appreciate slow-fermented, wood-fired culinary perfection. Built with a luxury minimalist aesthetic, the platform allows authenticated users to seamlessly explore artisanal pizzas, add new culinary creations, and secure dining tables for family gatherings or personal experiences.

---

## ✨ Features

- **Premium Visual Identity:** Implements a sophisticated design language featuring a warm, high-contrast palette (`#FAF7F2`, `#F4EFEA`, `#1A100E`, and `#C1440E`) with fully responsive layouts.
- **Secure Authentication (Better Auth):** Implements multi-method login systems supporting both custom Email/Password flows and Google Social Sign-In, automatically mirrored to `localStorage`.
- **Protected Access & Route Guarding:** Secure routes (like adding a pizza) that dynamically monitor sessions, instantly redirecting unauthenticated users to `/login`.
- **Real-time Pizza Management:** Dynamic pizza item insertion powered by type-safe schemas mapping client inputs to automated server-side structures.
- **Advanced State & Mutation Management:** Server caching, invalidation, and data synchronization driven seamlessly by TanStack Query.
- **Cinematic Fluid Animations:** Smooth, micro-interactions and transitions implemented via Framer Motion for premium desktop and mobile feel.

---

## 🛠️ Tech Stack & Architecture

### Frontend

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS (Custom Typography & Color Overrides)
- **State & Server Cache:** TanStack Query (`@tanstack/react-query`)
- **Animations:** Framer Motion
- **Auth Client:** Better Auth Mirroring

### Backend

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** MongoDB Native Driver
- **Security:** CORS (Strict Credential Sharing for multi-domain production architecture)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- MongoDB Instance Running locally or via Atlas Cluster

 
