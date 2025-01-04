'use client';

import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants";
import { usePizzaOptions } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { GroupVariants, IngredientItem, ProductImage, Title } from ".";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора пиццы
 */

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onSubmit,
  className,
}) => {
  const {size, type, selectedIngredientsIds, availablePizzaSizes, currentItemId, setSize, setType, addIngredient} 
  = usePizzaOptions(items);

  const {textDetails, totalPrice} = getPizzaDetails(type, size, items, ingredients, selectedIngredientsIds);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredientsIds));
    }
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
      <Title text={name} size="md" className="font-extrabold mb-1" />

      <p className="text-gray-400">{textDetails}</p>

      <div className="flex flex-col gap-4 mt-5">
        <GroupVariants items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />

        <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
      </div>

      <div className="bg-gray-50 p-5 rounded-md h-[320px] overflow-auto scrollbar mt-5">
        <div className="grid grid-cols-3 gap-3">
        {ingredients.map((ingredient) => (
          <IngredientItem key={ingredient.id} 
            name={ingredient.name} 
            price={ingredient.price} 
            imageUrl={ingredient.imageUrl}
            onClick={() => addIngredient(ingredient.id)}
            active={selectedIngredientsIds.has(ingredient.id)}
          />
        ))}
        </div>
      </div>
      

      <Button
        loading={loading}
        onClick={handleClickAdd}
        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
      >
        Добавить в корзину за {totalPrice} ₽
      </Button>
      </div>
    </div>
  );
}