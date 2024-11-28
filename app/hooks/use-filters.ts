import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string[];
  sizes: string[];
  ingredients: string[];
}

export interface Filters {
  selectedIngredientsIds: Set<string>;
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setSizes: (value: string) => void;
  setPizzaTypes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [selectedIngredientsIds, { toggle: setIngredients }] = useSet(new Set<string>(
    searchParams.get('ingredients')?.split(',')
  ));
    
  const [sizes, { toggle: setSizes }] = useSet(new Set<string>(searchParams.get('sizes')?.split(',') || []));

  const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes')?.split(',') || [])
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prevPrice => {
      return {...prevPrice, [name]: value};
    });
  };

  return {
    selectedIngredientsIds,
    sizes,
    pizzaTypes,
    prices,
    setPrices: updatePrice,
    setSizes,
    setPizzaTypes,
    setIngredients,
  }
  
}