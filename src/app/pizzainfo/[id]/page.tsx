"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePizzaall, useReservePizza } from "@/lib/getData";
import type { Pizza, PizzaSize } from "@/types/restaurant";
import { useSession } from "@/lib/auth-client";

type PizzaDoc = Pizza & { _id: string } & { avatar: string };



export default function PizzaInfo() {
    const { id } = useParams<{ id: string }>();

    const { data: response, isLoading, isError } = usePizzaall();
    const allPizzas: PizzaDoc[] = response?.data ?? [];
    const pizza = allPizzas.find((p) => p.id === id);
    if (isLoading) return <StatusMessage text="Loading..." />;
    if (isError) return <StatusMessage text="Failed to load data." />;
    if (!pizza) return <StatusMessage text="We couldn't find that pizza." showBackLink />;

    return <PizzaDetail pizza={pizza} />;
}

function PizzaDetail({ pizza }: { pizza: PizzaDoc }) {
    const [selectedSize, setSelectedSize] = useState<PizzaSize>(pizza.pizzaSize[0]);
    const data = typeof window !== "undefined" ? localStorage.getItem("library-auth-storage") : null;
    const session = JSON.parse(data!);
    const email = session?.user?.email;
    const name = session?.user?.name;
    return (
        <div className="min-h-screen bg-[#F5EFE6] text-[#241713]">
            <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
                <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <PizzaImage pizza={pizza} />

                    <div>
                        <PizzaHeader pizza={pizza} />
                        <SizePicker
                            sizes={pizza.pizzaSize}
                            selectedSize={selectedSize}
                            onSelect={setSelectedSize}
                        />
                        <ReserveButton
                            name={name ?? ''}
                            email={email ?? ''}
                            selectsizepizza={selectedSize}
                            pizza={pizza}
                            price={selectedSize.price}
                        />
                        <TableInfo pizza={pizza} />
                        <SoftDrinks pizza={pizza} />
                    </div>
                </div>

                <Reviews pizza={pizza} />
            </div>
        </div>
    );
}


function StatusMessage({ text, showBackLink }: { text: string; showBackLink?: boolean }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5EFE6] p-6 text-center text-[#241713]">
            <p className="font-display text-xl">{text}</p>
            {showBackLink && (
                <Link href="/pizzainfo" className="text-sm font-semibold text-[#C1440E]">
                    ← Back to all pizzas
                </Link>
            )}
        </div>
    );
}



function PizzaImage({ pizza }: { pizza: PizzaDoc }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, }}
            className="relative h-72 w-full overflow-hidden rounded-[2rem] shadow-xl sm:h-96 lg:h-full lg:min-h-[420px]"
        >
            <Image
                src={pizza.pizzaImage}
                alt={pizza.pizzaName}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#241713]/60 via-transparent to-transparent" />

            <span className="absolute left-5 top-5 rounded-full bg-[#241713]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#F5EFE6]">
                {pizza.cuisine}
            </span>

            <span
                className={`absolute right-5 top-5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${pizza.inStock ? "bg-[#4B6B3A] text-[#F5EFE6]" : "bg-[#241713]/60 text-[#F5EFE6]/80"
                    }`}
            >
                {pizza.inStock ? "In stock" : "Sold out"}
            </span>
        </motion.div>
    );
}

function PizzaHeader({ pizza }: { pizza: PizzaDoc }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, }}
        >
            <p className="eyebrow text-[#A8672A]">
                {pizza.neighbourhood}, {pizza.city}
            </p>
            <h1 className="mt-2 font-display text-3xl font-medium leading-tight sm:text-4xl">
                {pizza.pizzaName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#241713]/70">
                <span className="font-mono text-[#C1440E]">
                    {pizza.rating} ★ ({pizza.reviewCount} reviews)
                </span>
                <span>·</span>
                <span>Chef {pizza.chef}</span>
                <span>·</span>
                <span>{pizza.priceTier}</span>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#241713]/65">
                {pizza.pizzaDescription}
            </p>

            {pizza.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {pizza.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-[#241713]/15 px-3 py-1 text-xs text-[#241713]/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function SizePicker({
    sizes,
    selectedSize,
    onSelect,
}: {
    sizes: PizzaSize[];
    selectedSize: PizzaSize;
    onSelect: (size: PizzaSize) => void;
}) {
    return (
        <div className="mt-7">
            <p className="mb-2 text-xs font-semibold text-[#241713]/60">Choose a size</p>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                    const isSelected = size.size === selectedSize.size;
                    return (
                        <button
                            key={size.size}
                            onClick={() => onSelect(size)}
                            className={`rounded-xl border px-4 py-2 text-left text-sm transition-colors ${isSelected
                                ? "border-[#C1440E] bg-[#C1440E]/10 text-[#241713]"
                                : "border-[#241713]/15 text-[#241713]/70 hover:border-[#241713]/30"
                                }`}
                        >
                            <span className="block font-semibold">{size.size}</span>
                            <span className="block text-xs text-[#241713]/50">
                                {size.inches}" · ৳{size.price}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function ReserveButton({
    pizza,
    price,
    selectsizepizza,
    email,
    name
}: {
    pizza: PizzaDoc;
    price: number;
    selectsizepizza: PizzaSize,
    email: string
    name: string
}) {

    const { mutate, isPending } = useReservePizza();

    const handleReserve = () => {
        mutate({
            name: name,
            email: email,
            pizzaName: pizza.pizzaName,
            image: pizza.pizzaImage,
            price: pizza.price,
            size: selectsizepizza,
            tableName: pizza.tableName,
            chairs: pizza.chairs,
            drinks: pizza.softDrinks,
        });
    };



    return (
        <motion.button
            onClick={handleReserve}
            disabled={!email || !name || !pizza.inStock || isPending}
            whileHover={!isPending && pizza.inStock && email && name ? "hover" : undefined}
            initial="rest"
            animate="rest"
            className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C1440E] py-3.5 text-sm font-semibold text-[#F5EFE6] shadow-lg shadow-[#C1440E]/20 transition-colors hover:bg-[#A8380C] disabled:cursor-not-allowed disabled:bg-[#241713]/20 disabled:text-[#241713]/50 disabled:shadow-none"
        >
            <span>
                {!email || !name
                    ? "Please login first"
                    : isPending
                        ? "Reserving..."
                        : !pizza.inStock
                            ? "Currently Sold Out"
                            : `Reserve — ৳${price}`}
            </span>

            {!isPending && pizza.inStock && email && name && (
                <motion.span
                    variants={{
                        rest: { x: 0 },
                        hover: { x: 4 },
                    }}
                    transition={{
                        duration: 0.25,
                        ease: "easeOut",
                    }}
                    aria-hidden
                >
                    →
                </motion.span>
            )}

            {isPending && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                    }}
                    className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                />
            )}
        </motion.button>
    );
}

function TableInfo({ pizza }: { pizza: PizzaDoc }) {
    return (
        <div className="mt-8 rounded-2xl border border-[#241713]/10 bg-white/60 p-5">
            <div className="flex items-center justify-between">
                <p className="font-display text-lg">{pizza.tableName}</p>
                {pizza.forFamily && (
                    <span className="rounded-full bg-[#E3A857]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#241713]">
                        Family table
                    </span>
                )}
            </div>

            <p className="mt-1 text-sm text-[#241713]/60">
                Seats {pizza.chairs} {pizza.chairs === 1 ? "person" : "people"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-[#241713]/10 pt-4">
                {pizza.freeTime.map((slot) => (
                    <span
                        key={slot}
                        className="rounded-full bg-[#241713]/5 px-3 py-1 font-mono text-xs text-[#241713]/70"
                    >
                        {slot}
                    </span>
                ))}
            </div>
        </div>
    );
}

function SoftDrinks({ pizza }: { pizza: PizzaDoc }) {
    if (pizza.softDrinks.length === 0) return null;

    return (
        <div className="mt-6">
            <p className="mb-3 text-xs font-semibold text-[#241713]/60">Pairs well with</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {pizza.softDrinks.map((drink) => (
                    <div
                        key={drink.id}
                        className="overflow-hidden rounded-xl border border-[#241713]/10 bg-white/60"
                    >
                        <div className="relative h-20 w-full">
                            <Image src={drink.image} alt={drink.name} fill className="object-cover" />
                            {!drink.inStock && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#241713]/50 text-[10px] uppercase tracking-wider text-[#F5EFE6]">
                                    Out of stock
                                </div>
                            )}
                        </div>
                        <div className="p-2.5">
                            <p className="text-xs font-semibold leading-snug">{drink.name}</p>
                            <p className="text-xs text-[#241713]/50">৳{drink.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Reviews({ pizza }: { pizza: PizzaDoc }) {
    return (
        <div className="mt-16 border-t border-[#241713]/10 pt-10">
            <h2 className="font-display text-2xl">
                Reviews <span className="text-[#241713]/40">({pizza.reviewCount})</span>
            </h2>

            {pizza.reviews.length === 0 ? (
                <p className="mt-4 text-sm text-[#241713]/60">No reviews yet — be the first to try it.</p>
            ) : (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {pizza.reviews.map((review) => (
                        <div
                            key={review.id}
                            className="rounded-2xl border border-[#241713]/10 bg-white/60 p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative h-9 w-9 overflow-hidden rounded-full">
                                    <Image src={review.avatar ?? ''} alt={review.author} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{review.author}</p>
                                    <p className="text-xs text-[#241713]/50">{review.date}</p>
                                </div>
                                <span className="ml-auto font-mono text-sm text-[#C1440E]">{review.rating} ★</span>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-[#241713]/70">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}