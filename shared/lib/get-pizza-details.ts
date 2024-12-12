import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants";
import { calcPizzaPrice } from "./calc-pizza-price";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const textDetails = `${size}см, ${mapPizzaType[type]} тесто, 590г`;
  
  const totalPrice = calcPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  return {textDetails, totalPrice};
}