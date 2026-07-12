import { useEffect, useState } from "react";

/**
 * Returns a "delayed" copy of a value that only updates once the value
 * has stopped changing for `delayMs` milliseconds.
 *
 * Handy for search inputs: the input itself can update instantly so typing
 * feels responsive, while the debounced value (used for the actual search)
 * only updates once the person pauses.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);

        // If the value changes again before the timer finishes, cancel the
        // old timer so we don't end up with a stale update firing later.
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debouncedValue;
}