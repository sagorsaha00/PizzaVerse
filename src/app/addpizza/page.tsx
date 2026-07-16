"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function AddPizzaPage() {


    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [fullDesc, setFullDesc] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const router = useRouter();
    const data = typeof window !== "undefined" ? localStorage.getItem("library-auth-storage") : null;
    const session = JSON.parse(data!);
    useEffect(() => {
        if (!session) {
            router.push("/login");
        }
    }, [session, router]);

    const addPizzaMutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await fetch("http://localhost:3001/createPizza", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!response.ok) throw new Error("Failed to add pizza");
            return response.json();
        },
        onSuccess: () => {
            alert("Pizza added successfully! 🍕");
            router.push("/");
        },
        onError: (err: any) => {
            alert(err.message || "Something went wrong");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            id: title.toLowerCase().replace(/\s+/g, "-"),
            pizzaName: title,
            cuisine: shortDesc,
            pizzaDescription: fullDesc,
            price: Number(price),
            pizzaImage: imageUrl || "https://images.unsplash.com/photo-1594007654729-407eedc4be65", // ডিফল্ট ইমেজ
            chef: "Marco Bellini",
            neighbourhood: "Agrabad",
            city: "Chattogram",
            priceTier: "$$",
            pizzaSize: [
                { size: "Small", inches: 10, price: Number(price) },
                { size: "Medium", inches: 12, price: Number(price) + 200 },
                { size: "Large", inches: 16, price: Number(price) + 400 },
            ],
            inStock: true,
            availableTonight: true,
            rating: 5.0,
            reviewCount: 0,
            reviews: [],
        };

        addPizzaMutation.mutate(payload);
    };

    if (!data || !session) {
        return (
            <div className="flex items-center justify-center bg-[#F4EFEA]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C1440E] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className=" bg-[#F4EFEA] px-12 py-12 flex items-center justify-center text-[#1A100E]">
            <div className="w-full max-w-xl rounded-[24px] border border-[#1A100E]/10 bg-[#FAF7F2] p-8 md:p-10 shadow-sm">

                <div className="inline-block rounded-full bg-[#FAF7F2] border border-[#1A100E]/10 px-3 py-1 text-[10px] font-bold tracking-[2px] uppercase text-[#1A100E]/60 mb-3">
                    Oven Master Input
                </div>

                <h1 className="font-serif text-4xl font-bold tracking-tight text-[#1A100E] mb-8">
                    Add a new <span className="text-[#C1440E]">pizza</span>
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Title</label>
                        <input
                            required
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Margherita al Forno"
                            className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm"
                        />
                    </div>


                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Short description</label>
                        <input
                            required
                            type="text"
                            value={shortDesc}
                            onChange={(e) => setShortDesc(e.target.value)}
                            placeholder="e.g., Wood-Fired Classic / Neapolitan Pizza"
                            className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm"
                        />
                    </div>


                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Full description</label>
                        <textarea
                            required
                            rows={4}
                            value={fullDesc}
                            onChange={(e) => setFullDesc(e.target.value)}
                            placeholder="Slow-fermented dough, a 900° stone oven, and toppings sourced the same morning..."
                            className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm resize-none"
                        />
                    </div>


                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Price (BDT)</label>
                        <input
                            required
                            type="number"
                            min={0}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="590"
                            className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm"
                        />
                    </div>

                    {/* Field 5: Optional image URL */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[1px] text-[#1A100E]/70 mb-2">Optional image URL</label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-xl border border-[#1A100E]/10 px-4 py-3 bg-[#FAF7F2] focus:border-[#C1440E] focus:outline-none transition text-sm"
                        />
                    </div>

                    {/* Button: Submit (add) */}
                    <button
                        type="submit"
                        disabled={addPizzaMutation.isPending}
                        className="w-full bg-[#C1440E] text-white py-3.5 rounded-full font-semibold text-sm shadow-md hover:bg-[#A8380C] transition duration-200 disabled:opacity-50 mt-4"
                    >
                        {addPizzaMutation.isPending ? "Adding Item..." : "Submit (add)"}
                    </button>
                </form>
            </div>
        </div>
    );
}