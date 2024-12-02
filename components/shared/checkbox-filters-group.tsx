'use client'

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input, Skeleton } from "../ui";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (value: string) => void;
  selected?: Set<string>;
  defaultValue?: string[];
  className?: string;
  loading?: boolean;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
  {
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск',
    onClickCheckbox,
    selected,
    className,
    loading,
    name,
}) => {

  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (value: string) => {
    console.log(value);
    
    setSearchValue(value);
  }

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {
          ...Array(limit).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-6 mb-5 rounded-[8px]" />
          ))
        }
        <Skeleton className="w-28 h-6 mb-5 rounded-[8px]" />
      </div>
    )
  }

  const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit);

  return (
    <div className={cn('', className)}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input 
            onChange={e => onChangeSearchInput(e.target.value)} 
            placeholder={searchInputPlaceholder} 
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {
          list.map((item, index) => (
            <FilterCheckbox 
              onCheckedChange={() => onClickCheckbox?.(item.value)}
              checked={selected?.has(item.value)}
              key={String(item.value)}
              value={item.value}
              text={item.text}
              endAdornment={item.endAdornment}
              name={name}
            />
          ))
        }
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
        
    </div>
  );
}