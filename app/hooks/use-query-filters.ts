import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect } from "react";
import { Filters } from "./use-filters";


export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredientsIds),
    }

    const query = qs.stringify(params, {
      skipNulls: true, 
      arrayFormat: 'comma'
    });

    router.push(`?${query}`, {
      scroll: false,
    });
    
  }, [filters, router]);
}