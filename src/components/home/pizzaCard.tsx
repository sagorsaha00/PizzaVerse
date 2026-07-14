"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pizza } from "@/types/restaurant";

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-2xl border border-[#241713]/10 bg-white/60 shadow-sm transition-shadow hover:shadow-xl"
        >
            <Link href={`/pizzainfo/${pizza.id}`}>
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={pizza.pizzaImage}
                        alt={pizza.pizzaName}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-[#241713]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#F5EFE6]">
                        {pizza.cuisine}
                    </span>

                    <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${pizza.inStock
                            ? "bg-[#4B6B3A] text-[#F5EFE6]"
                            : "bg-[#241713]/60 text-[#F5EFE6]/80"
                            }`}
                    >
                        {pizza.inStock ? "In stock" : "Sold out"}
                    </span>

                    {pizza.forFamily && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-[#E3A857]/95 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#241713]">
                            Family table
                        </span>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg leading-snug text-[#241713]">
                            {pizza.pizzaName}
                        </h3>
                        <span className="shrink-0 font-mono text-sm text-[#C1440E]">
                            {pizza.rating} ★
                        </span>
                    </div>

                    <p className="mt-1 text-xs text-[#241713]/50">
                        {pizza.reviewCount} reviews · {pizza.neighbourhood}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#241713]/65">
                        {pizza.pizzaDescription}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#241713]/10 pt-3 text-xs text-[#241713]/60">
                        <span>Chef {pizza.chef}</span>
                        <span>{pizza.tableName}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-[#241713]/60">
                        <span>
                            {pizza.chairs} {pizza.chairs === 1 ? "chair" : "chairs"}
                        </span>
                        <span>{pizza?.softDrinks?.length} drinks available</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="font-display text-lg text-[#241713]">
                            From ৳{pizza.price}
                        </span>
                        <span className="font-mono text-xs text-[#241713]/50">
                            {pizza.priceTier}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}