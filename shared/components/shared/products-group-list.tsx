'use client';

import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import React, { useEffect } from "react";
import { useIntersection } from 'react-use';
import { ProductCard } from "./product-card";
import { Title } from "./title";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

  export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, listClassName, className}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
      threshold: 0.4,
    });

    useEffect(() => {
      if (intersection?.isIntersecting) {
        setActiveCategoryId(categoryId);
      }
    }, [categoryId, title, intersection?.isIntersecting]);

    return (
      <div className={cn('', className)} ref={intersectionRef} id={title} >
        <Title text={title} size="lg" className="font-extrabold mb-5" />
        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
          {items.map((item, i) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.items[0].price}
              ingredients={item.ingredients}
            />
          ))}
        </div>
      </div>
    );
}