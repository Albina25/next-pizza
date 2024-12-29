'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components/ui/sheet';
import { PizzaSize, PizzaType } from "@/shared/constants";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({children, className}) => {
 const totalAmount = useCartStore(state => state.totalAmount);
 const fetchCartItems = useCartStore(state => state.fetchCartItems);
 const items = useCartStore(state => state.items);
 const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
 const removeCardItem = useCartStore(state => state.removeCartItem);

useEffect(() => {
  fetchCartItems();
}, []);

const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
  const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
  updateItemQuantity(id, newQuantity);
  console.log({id, quantity, type});
  
};

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 flex-1 overflow-auto">
          <div className="mb-2">
            {items.map(item => 
              <CartDrawerItem 
                key={item.id} 
                id={item.id} 
                imageUrl={item.imageUrl} 
                name={item.name} 
                price={item.price} 
                quantity={item.quantity} 
                details={
                  getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                } 
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCardItem(item.id)}
              />)}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
        <div className="w-full">
          <div className="flex mb-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Итого
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>

            <span className="font-bold text-lg">{totalAmount} ₽</span>
          </div>

          <Link href="/checkout">
            <Button
              //onClick={() => setRedirecting(true)}
              //loading={redirecting}
              type="submit"
              className="w-full h-12 text-base">
              Оформить заказ
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
        </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}