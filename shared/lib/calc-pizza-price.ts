import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants";

/**
 * Функция подсчета стоимости пиццы
 * 
 * @param type - тип теста  выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredientsIds - выбранные ингредиенты
 * 
 * @returns number общей стоимости пиццы
 */
export const calcPizzaPrice = (
  type: PizzaType, 
  size: PizzaSize, 
  items: ProductItem[], 
  ingredients: Ingredient[],
  selectedIngredientsIds: Set<number>,
) => {
  const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
    
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return totalPrice;
}