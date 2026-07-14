"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className=" bg-[#F4EFEA] text-[#1A100E] px-6 py-16 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Header Section */}
                <div className="mb-16 max-w-2xl">
                    <div className="inline-block rounded-full bg-[#FAF7F2] border border-[#1A100E]/10 px-3 py-1 text-[10px] font-bold tracking-[2px] uppercase text-[#1A100E]/60 mb-3">
                        Our Journey
                    </div>
                    <h1 className="font-serif text-5xl font-bold tracking-tight text-[#1A100E] md:text-6xl mb-6">
                        Pizzas crafted with <br />
                        <span className="text-[#C1440E]">patience & pride.</span>
                    </h1>
                    <p className="text-base text-[#1A100E]/80 leading-relaxed">
                        Founded in Chattogram, PizzaVerse was born from a simple desire: to combine traditional Neapolitan pizza-making techniques with locally sourced, fresh ingredients. No rush, no compromise — just authentic pies baked at 900°F.
                    </p>
                </div>

                {/* Story Grid Section */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center mb-20">

                    {/* Left: Beautiful Image (Simulating your hero image layout) */}
                    <div className="relative h-[450px] w-full overflow-hidden rounded-[24px] shadow-sm">
                        <Image
                            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
                            alt="Artisanal Pizza Making"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Floater Tag */}
                        <div className="absolute right-6 top-6 rounded-2xl bg-[#E3A857] p-4 text-[12px] font-bold text-[#1A100E] shadow-md max-w-[140px] text-center">
                            Slow Dough 48-Hour Fermented
                        </div>
                    </div>

                    {/* Right: Authentic Details */}
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl font-bold text-[#1A100E]">
                            From Naples to Chattogram
                        </h2>
                        <p className="text-base text-[#1A100E]/80 leading-relaxed">
                            Every day at PizzaVerse begins with the dough. We let our naturally-leavened flour rest for 48 hours to lock in deep, complex flavors. When it reaches your table, you are tasting a method refined over generations.
                        </p>
                        <p className="text-base text-[#1A100E]/80 leading-relaxed">
                            We sourced our fresh basil and hand-pulled mozzarella daily. Our signature wood-fired ovens are kept strictly at 900°F, creating that iconic leopard-spot char on the crust that our guests in Agrabad love.
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1A100E]/10">
                            <div>
                                <h4 className="font-serif text-3xl font-bold text-[#C1440E]">Est.</h4>
                                <p className="text-xs text-[#1A100E]/60 tracking-[1px] uppercase mt-1">1999 in CTG</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-3xl font-bold text-[#C1440E]">900°F</h4>
                                <p className="text-xs text-[#1A100E]/60 tracking-[1px] uppercase mt-1">Stone Oven Heat</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-3xl font-bold text-[#C1440E]">48 Hrs</h4>
                                <p className="text-xs text-[#1A100E]/60 tracking-[1px] uppercase mt-1">Dough Ferment</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CTA Banner */}
                <div className="rounded-[32px] bg-[#FAF7F2] border border-[#1A100E]/10 p-8 md:p-12 text-center max-w-4xl mx-auto">
                    <h3 className="font-serif text-3xl font-bold text-[#1A100E] mb-4">
                        Want to taste the masterpiece?
                    </h3>
                    <p className="text-[#1A100E]/70 mb-6 max-w-md mx-auto">
                        Book a table for tonight or explore our special Neapolitan menu curated by Chef Marco.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/pizzas" className="rounded-full bg-[#C1440E] text-[#F4EFEA] px-6 py-3 text-sm font-semibold hover:bg-[#A8380C] transition">
                            Explore the menu →
                        </Link>
                        <Link href="/contact" className="rounded-full border border-[#1A100E]/20 bg-transparent text-[#1A100E] px-6 py-3 text-sm font-semibold hover:bg-[#1A100E]/5 transition">
                            Get in touch
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}