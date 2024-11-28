import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

export const useIngredients = () => {
  const [ingredients, setIingredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

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

  return {ingredients, loading};
}