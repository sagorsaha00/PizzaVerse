"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const rise: any = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
  { value: "48", label: "Pies fired daily" },
  { value: "900°", label: "Stone-oven heat" },
  { value: "11 min", label: "Dough to table" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5EFE6] text-[#241713]">
      {/* soft premium glow, restrained on a light ground */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#C1440E]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#E3A857]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:gap-16 lg:px-10">
        {/* copy column */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={rise} className="eyebrow text-[#A8672A]">
            Wood-fired, Chattogram
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-5 max-w-xl font-display text-[2.6rem] font-medium leading-[1.05] text-[#241713] sm:text-6xl"
          >
            Pizza worth
            <br />
            the wait.
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-md text-base leading-relaxed text-[#241713]/65"
          >
            Slow-fermented dough, a 900° stone oven, and toppings sourced the
            same morning. No delivery bags, no reheats — every pie leaves the
            oven straight to your table.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.div whileHover="hover" initial="rest" animate="rest">
              <Link
                href="/pizzas"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#C1440E] px-6 py-3 text-sm font-semibold text-[#F5EFE6] shadow-lg shadow-[#C1440E]/20 transition-colors hover:bg-[#A8380C]"
              >
                <span>Explore the menu</span>
                <motion.span
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  aria-hidden
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

           
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-12 flex items-center gap-8 border-t border-[#241713]/10 pt-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
              >
                <p className="font-display text-2xl text-[#241713]">{s.value}</p>
                <p className="mt-1 text-xs text-[#241713]/50">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* image column — full-height premium panel, true 50% of the hero */}
        <motion.div
          className="relative h-[380px] w-full sm:h-[460px] md:h-[560px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-[#241713]/20">
            <Image
              src="/pizza.jpg"
              alt="Margherita pizza fresh from the wood-fired oven"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            {/* gradient for legibility of overlaid badges */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#241713]/70 via-[#241713]/0 to-[#241713]/10" />

            <span className="absolute left-5 top-5 rounded-full bg-[#F5EFE6]/95 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#241713]">
              Fresh from the oven
            </span>

            {/* steam */}
            <svg
              className="pointer-events-none absolute right-10 top-5 h-16 w-10 opacity-80"
              viewBox="0 0 40 64"
              fill="none"
            >
              {[0, 1].map((i) => (
                <motion.path
                  key={i}
                  d="M10 60 C 4 48, 16 40, 10 30 C 4 20, 16 12, 10 2"
                  stroke="#F5EFE6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ x: i * 14 }}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: [0, 0.8, 0], pathLength: 1, y: [8, -6] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1,
                  }}
                />
              ))}
            </svg>

            {/* premium floating detail card */}
            <motion.div
              className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#F5EFE6]/95 p-4 backdrop-blur-sm sm:right-auto sm:w-72"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow text-[#A8672A]">Wood-Fired Classic</p>
              <h3 className="mt-1 font-display text-lg text-[#241713]">
                Margherita al Forno
              </h3>
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-[#241713]/10 pt-3">
                <span className="font-mono text-sm text-[#241713]">$$</span>
                <span className="font-mono text-sm text-[#C1440E]">
                  4.9 ★ (318)
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute -right-4 -top-4 hidden h-20 w-20 rounded-card bg-[#E3A857] p-3 shadow-lg sm:block"
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] leading-tight text-[#241713]">
              Table for two
              <br />
              tonight, 8:30pm
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}