"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePizzaall } from "@/lib/getData";
import { useDebouncedValue } from "@/components/home/useDebouncedValue";
import PizzaCard from "@/components/home/pizzaCard";
import type { Pizza } from "@/types/restaurant";

type PizzaDoc = Pizza & { _id: string };

const EASE = [0.22, 1, 0.36, 1];
const PIZZAS_PER_PAGE = 8;
const SEARCH_DELAY_MS = 2000; // wait this long after typing stops before filtering

type FilterKey = "all" | "inStock" | "family" | "tonight";

const filterChips: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "inStock", label: "In stock" },
    { key: "family", label: "Family table" },
    { key: "tonight", label: "Available tonight" },
];

export default function AllPizzasPage() {
    const { data: response, isLoading, isError, refetch } = usePizzaall();
    const allPizzas: PizzaDoc[] = response?.data ?? [];


    const [searchInput, setSearchInput] = useState("");

    const searchTerm = useDebouncedValue(searchInput, SEARCH_DELAY_MS);
    const isWaitingToSearch = searchInput !== searchTerm;

    const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPizzas = useMemo(
        () => filterPizzas(allPizzas, searchTerm, activeFilter),
        [allPizzas, searchTerm, activeFilter]
    );

    const totalPages = Math.max(1, Math.ceil(filteredPizzas.length / PIZZAS_PER_PAGE));
    const startIndex = (currentPage - 1) * PIZZAS_PER_PAGE;
    const pizzasOnThisPage = filteredPizzas.slice(startIndex, startIndex + PIZZAS_PER_PAGE);

    // Jump back to page 1 whenever the search actually changes or a filter
    // chip is clicked — otherwise you could land on a page that no longer
    // has any results.
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeFilter]);

    // If the list shrinks (say, a filter removes most pizzas) and the
    // current page no longer exists, fall back to the last valid page.
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const clearSearch = () => {
        setSearchInput("");
        setActiveFilter("all");
    };

    return (
        <div className="min-h-screen bg-[#F5EFE6] text-[#241713]">
            <PageHeader />

            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
                <SearchAndFilters
                    searchInput={searchInput}
                    onSearchInputChange={setSearchInput}
                    isWaitingToSearch={isWaitingToSearch}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                {!isLoading && !isError && (
                    <ResultsCount
                        visibleCount={pizzasOnThisPage.length}
                        startIndex={startIndex}
                        totalCount={filteredPizzas.length}
                        isWaitingToSearch={isWaitingToSearch}
                    />
                )}

                {isLoading && <LoadingSkeleton />}

                {isError && !isLoading && <ErrorState onRetry={() => refetch()} />}

                {!isLoading && !isError && filteredPizzas.length === 0 && (
                    <EmptyState onClear={clearSearch} />
                )}

                {!isLoading && !isError && filteredPizzas.length > 0 && (
                    <PizzaGrid pizzas={pizzasOnThisPage} gridKey={`${currentPage}-${searchTerm}-${activeFilter}`} />
                )}

                {!isLoading && !isError && totalPages > 1 && (
                    <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
                )}
            </div>
        </div>
    );
}

// ── Filtering ────────────────────────────────────────────────────────────

function filterPizzas(pizzas: PizzaDoc[], searchTerm: string, filter: FilterKey): PizzaDoc[] {
    const term = searchTerm.trim().toLowerCase();

    return pizzas.filter((pizza) => {
        const matchesSearch = term === "" || pizzaMatchesSearchTerm(pizza, term);
        const matchesFilter = pizzaMatchesFilter(pizza, filter);
        return matchesSearch && matchesFilter;
    });
}

function pizzaMatchesSearchTerm(pizza: PizzaDoc, term: string): boolean {
    const searchableText = [pizza.pizzaName, pizza.cuisine, pizza.neighbourhood, pizza.chef, ...(pizza.tags ?? [])]
        .join(" ")
        .toLowerCase();

    return searchableText.includes(term);
}

function pizzaMatchesFilter(pizza: PizzaDoc, filter: FilterKey): boolean {
    switch (filter) {
        case "inStock":
            return pizza.inStock;
        case "family":
            return pizza.forFamily;
        case "tonight":
            return Boolean(pizza.availableTonight);
        case "all":
        default:
            return true;
    }
}

// ── Sections ─────────────────────────────────────────────────────────────

function PageHeader() {
    return (
        <div className="relative overflow-hidden border-b border-[#241713]/10 px-6 py-16 lg:px-10">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#C1440E]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#E3A857]/15 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5,  }}
                    className="eyebrow text-[#A8672A]"
                >
                    Wood-fired, Chattogram
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05,  }}
                    className="mt-2 font-display text-4xl font-medium leading-tight sm:text-5xl"
                >
                    All pizzas
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1,  }}
                    className="mt-3 max-w-lg text-sm text-[#241713]/60"
                >
                    Every pie on Fare, searchable by name, cuisine, neighbourhood, or
                    chef — filtered down to exactly what you're craving tonight.
                </motion.p>
            </div>
        </div>
    );
}

function SearchAndFilters({
    searchInput,
    onSearchInputChange,
    isWaitingToSearch,
    activeFilter,
    onFilterChange,
}: {
    searchInput: string;
    onSearchInputChange: (value: string) => void;
    isWaitingToSearch: boolean;
    activeFilter: FilterKey;
    onFilterChange: (filter: FilterKey) => void;
}) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[#241713]/10 bg-white/60 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#241713]/40" />
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => onSearchInputChange(e.target.value)}
                    placeholder="Search pizzas, cuisine, chef..."
                    className="w-full rounded-full border border-[#241713]/15 bg-white/80 py-3 pl-11 pr-4 text-sm text-[#241713] placeholder:text-[#241713]/35 outline-none transition focus:border-[#C1440E] focus:ring-4 focus:ring-[#C1440E]/10"
                />
                {isWaitingToSearch && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#241713]/40">
                        searching…
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {filterChips.map((chip) => {
                    const isActive = activeFilter === chip.key;
                    return (
                        <button
                            key={chip.key}
                            onClick={() => onFilterChange(chip.key)}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${isActive
                                ? "bg-[#C1440E] text-[#F5EFE6]"
                                : "border border-[#241713]/15 bg-white/70 text-[#241713]/70 hover:border-[#241713]/30"
                                }`}
                        >
                            {chip.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function ResultsCount({
    visibleCount,
    startIndex,
    totalCount,
    isWaitingToSearch,
}: {
    visibleCount: number;
    startIndex: number;
    totalCount: number;
    isWaitingToSearch: boolean;
}) {
    if (isWaitingToSearch) {
        return <p className="mt-6 text-xs text-[#241713]/50">Waiting for you to finish typing…</p>;
    }

    const from = visibleCount ? startIndex + 1 : 0;
    const to = startIndex + visibleCount;

    return (
        <p className="mt-6 text-xs text-[#241713]/50">
            Showing {from}–{to} of {totalCount} pizzas
        </p>
    );
}

function PizzaGrid({ pizzas, gridKey }: { pizzas: PizzaDoc[]; gridKey: string }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={gridKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3,  }}
                className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {pizzas.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                ))}
            </motion.div>
        </AnimatePresence>
    );
}

function LoadingSkeleton() {
    const placeholders = Array.from({ length: 8 });

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {placeholders.map((_, index) => (
                <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-[#241713]/10 bg-white/60">
                    <div className="h-48 w-full bg-[#241713]/10" />
                    <div className="space-y-3 p-4">
                        <div className="h-4 w-3/4 rounded bg-[#241713]/10" />
                        <div className="h-3 w-1/2 rounded bg-[#241713]/10" />
                        <div className="h-3 w-full rounded bg-[#241713]/10" />
                        <div className="h-3 w-2/3 rounded bg-[#241713]/10" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-[#241713]/10 bg-white/60 py-16 text-center">
            <p className="font-display text-xl">Couldn't load the menu.</p>
            <p className="mt-2 max-w-sm text-sm text-[#241713]/60">
                Something went wrong fetching pizzas. Check your connection and try again.
            </p>
            <button
                onClick={onRetry}
                className="mt-6 rounded-full bg-[#C1440E] px-6 py-2.5 text-sm font-semibold text-[#F5EFE6] transition-colors hover:bg-[#A8380C]"
            >
                Try again
            </button>
        </div>
    );
}

function EmptyState({ onClear }: { onClear: () => void }) {
    return (
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-[#241713]/10 bg-white/60 py-16 text-center">
            <p className="font-display text-xl">No pizzas match that search.</p>
            <p className="mt-2 max-w-sm text-sm text-[#241713]/60">
                Try a different keyword or clear your filters.
            </p>
            <button
                onClick={onClear}
                className="mt-6 rounded-full border border-[#241713]/15 px-6 py-2.5 text-sm font-semibold text-[#241713] transition hover:border-[#241713]/30"
            >
                Clear search
            </button>
        </div>
    );
}

function Pagination({
    page,
    totalPages,
    onChange,
}: {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}) {
    const pageNumbers = buildPageWindow(page, totalPages);

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                onClick={() => onChange(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#241713]/15 text-sm text-[#241713] transition hover:border-[#241713]/30 disabled:opacity-30"
            >
                ←
            </button>

            {pageNumbers.map((pageNumber, index) =>
                pageNumber === "..." ? (
                    <span key={`gap-${index}`} className="px-1 text-[#241713]/40">
                        …
                    </span>
                ) : (
                    <button
                        key={pageNumber}
                        onClick={() => onChange(pageNumber)}
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${page === pageNumber ? "text-[#F5EFE6]" : "text-[#241713]/70 hover:bg-white/60"
                            }`}
                    >
                        {page === pageNumber && (
                            <motion.span
                                layoutId="page-pill"
                                className="absolute inset-0 -z-10 rounded-full bg-[#C1440E]"
                                transition={{ duration: 0.3,  }}
                            />
                        )}
                        {pageNumber}
                    </button>
                )
            )}

            <button
                onClick={() => onChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#241713]/15 text-sm text-[#241713] transition hover:border-[#241713]/30 disabled:opacity-30"
            >
                →
            </button>
        </div>
    );
}

/**
 * Builds a page-number list like [1, "...", 4, 5, 6, "...", 12] so we don't
 * render a button for every single page when there are a lot of them.
 * Always keeps the first page, the last page, and one page on either side
 * of the current page.
 */
function buildPageWindow(currentPage: number, totalPages: number): (number | "...")[] {
    const pagesToShowAroundCurrent = 1;
    const result: (number | "...")[] = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;
        const isNearCurrent =
            pageNumber >= currentPage - pagesToShowAroundCurrent &&
            pageNumber <= currentPage + pagesToShowAroundCurrent;

        if (isFirstOrLast || isNearCurrent) {
            result.push(pageNumber);
        } else if (result[result.length - 1] !== "...") {
            result.push("...");
        }
    }

    return result;
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}