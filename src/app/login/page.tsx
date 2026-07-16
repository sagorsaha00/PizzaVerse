"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { saveAuth } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PIZZA_IMAGE =
    "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1200&auto=format&fit=crop";

const inputStyles =
    "w-full rounded-xl border border-[#241713]/15 bg-white/70 px-4 py-3 text-sm text-[#241713] placeholder:text-[#241713]/35 outline-none transition focus:border-[#C1440E] focus:ring-4 focus:ring-[#C1440E]/10";

const labelStyles = "mb-1.5 block text-xs font-semibold text-[#241713]/70";

export default function Login() {
    const router = useRouter();
    const data = typeof window !== "undefined" ? localStorage.getItem("library-auth-storage") : null;
    const session = JSON.parse(data!);

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);

    const loginMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const email = formData.get("email");
            const password = formData.get("password");
            const response = await fetch("https://pizza-verse-bakcend.vercel.app/loginUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials or server error");
            }

            return response.json();
        },
        onSuccess: (data) => {
            saveAuth(data.user);
            router.push("/");
        },
        onError: (error) => {
            console.error("Login failed:", error.message);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        loginMutation.mutate(data);
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                console.error("Google sign-in error:", error);
                return;
            }


            const session = await authClient.getSession();
            if (session?.data?.user) {
                const u = session.data.user as any;
                saveAuth({
                    _id: u.id ?? u._id ?? "",
                    name: u.name ?? "",
                    email: u.email ?? "",
                    picUrl: u.image ?? u.picUrl ?? "",

                });
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 bg-[#F5EFE6] text-[#241713] md:grid-cols-2">
            <div className="relative hidden overflow-hidden md:block">
                <Image
                    src={PIZZA_IMAGE}
                    alt="Wood-fired Margherita pizza"
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#241713]/80 via-[#241713]/10 to-[#241713]/30" />



                <p className="absolute bottom-8 left-8 right-8 font-display text-2xl leading-snug text-[#F5EFE6]">
                    Good pizza, better company.
                </p>
            </div>

            <div className="flex items-center justify-center px-6 py-14 sm:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-sm"
                >
                    <p className="eyebrow text-[#A8672A]">Welcome back</p>
                    <h1 className="mt-2 font-display text-3xl font-medium leading-tight">
                        Sign in to your table.
                    </h1>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                        <div>
                            <label className={labelStyles}>Email</label>
                            <input type="email" name="email" required className={inputStyles} />
                        </div>

                        <div>
                            <label className={labelStyles}>Password</label>
                            <input type="password" name="password" required className={inputStyles} />
                        </div>

                        <div className="flex items-center justify-between pt-1 text-xs">
                            <label className="flex items-center gap-2 text-[#241713]/60">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    className="h-3.5 w-3.5 rounded border-[#241713]/30 text-[#C1440E] focus:ring-[#C1440E]/30"
                                />
                                Remember me
                            </label>
                            <Link href="/forgot-password" className="font-semibold text-[#C1440E]">
                                Forgot password?
                            </Link>
                        </div>

                        {loginMutation.isError && (
                            <p className="text-xs text-red-600 mt-1 font-semibold">
                                {loginMutation.error.message}
                            </p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loginMutation.isPending}
                            whileHover={loginMutation.isPending ? "rest" : "hover"}
                            initial="rest"
                            animate="rest"
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#C1440E] py-3 text-sm font-semibold text-[#F5EFE6] shadow-lg shadow-[#C1440E]/20 transition-colors hover:bg-[#A8380C] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span>{loginMutation.isPending ? "Signing in..." : "Sign in"}</span>
                            {!loginMutation.isPending && (
                                <motion.span
                                    variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    aria-hidden
                                >
                                    →
                                </motion.span>
                            )}
                        </motion.button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-[#241713]/10" />
                        <span className="text-[11px] uppercase tracking-wider text-[#241713]/40">
                            or continue with
                        </span>
                        <span className="h-px flex-1 bg-[#241713]/10" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-full border border-[#241713]/15 bg-white/60 py-3 text-sm font-semibold text-[#241713] transition hover:border-[#241713]/30"
                    >
                        <svg width="16" height="16" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
                            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.6 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                            <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4c-2 1.4-4.6 2.4-7.5 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.6 39.6 16.2 44 24 44z" />
                            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.5 5.4C41.1 35.8 44 30.4 44 24c0-1.3-.1-2.7-.4-3.5z" />
                        </svg>
                        Google
                    </button>

                    <p className="mt-7 text-center text-sm text-[#241713]/60">
                        New to Fare?{" "}
                        <Link href="/register" className="font-semibold text-[#C1440E]">
                            Create an account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}