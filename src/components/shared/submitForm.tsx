"use client";

import { motion } from "framer-motion";

export function SubmitButton({ label }: { label: string }) {
    return (
        <motion.button
            type="submit"
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#C1440E] py-3 text-sm font-semibold text-[#F5EFE6] shadow-lg shadow-[#C1440E]/20 transition-colors hover:bg-[#A8380C]"
        >
            <span>{label}</span>
            <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={{ duration: 0.25 }}
                aria-hidden
            >
                →
            </motion.span>
        </motion.button>
    );
}