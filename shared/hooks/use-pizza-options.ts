import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants";
import { getAvailablePizzaSizes } from "../lib";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;  
  selectedIngredientsIds: Set<number>;
  availablePizzaSizes: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
  currentItemId: number | null;
}
export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredientsIds, {toggle: addIngredient}] = useSet(new Set<number>([]));

  const availablePizzaSizes = getAvailablePizzaSizes(items, type);

  const currentItemId = items.find(item => item.pizzaType === type && item.size === size)?.id || null;

  useEffect(() => {
    const isAvailableCurrentSize = availablePizzaSizes?.find(item => Number(item.value) === size && !item.disabled);
    const minAvailableSize = availablePizzaSizes?.find(size => !size.disabled)?.value;
    if (!isAvailableCurrentSize && minAvailableSize) {
      setSize(Number(minAvailableSize) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredientsIds,
    availablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  }
}