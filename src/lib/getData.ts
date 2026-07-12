import { useQuery } from "@tanstack/react-query";
 
const uri = 'http://localhost:3001'
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
