import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIingredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    // Api.ingredients
    //   .getAll()
    //   .then((data) => setItems(data))
    //   .catch(error => console.error(error));

    async function fetchIngredients() {
      try{ 
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIingredients(ingredients);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);
  
  return {ingredients, loading, selectedIds, onAddId: toggle};
}