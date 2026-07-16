import { useQuery, useMutation } from "@tanstack/react-query";
import type { ReservePayload } from '../types/restaurant'
import { useRouter } from "next/navigation";





const uri = 'https://pizza-verse-bakcend.vercel.app'




const fetchPizza = async () => {
    const response = await fetch(`${uri}/getAllPizza`);
    console.log('reponse', response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
export function usePizzaall() {
    return useQuery({
        queryKey: ['pizzas'],
        queryFn: fetchPizza,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 2,
    });
}



export const reservePizza = async (data: ReservePayload) => {
    const response = await fetch(`${uri}/createReserveBook`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Reservation failed");
    }

    return result;
};
export const useReservePizza = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: reservePizza,
        onSuccess: (data) => {
            router.push("/dashboard")
        },

        onError: (error: Error) => {
            console.error(error.message);
        },
    });
};