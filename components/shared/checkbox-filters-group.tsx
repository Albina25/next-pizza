'use client'

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "../ui";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string;
  className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = (
  {
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск',
    onChange,
    defaultValue,
    className,
}) => {

  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (value: string) => {
    console.log(value);
    
    setSearchValue(value);
  }

  const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

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
              onCheckedChange={(ids) => console.log(ids)}
              checked={false}
              key={String(item.value)}
              value={item.value}
              text={item.text}
              endAdornment={item.endAdornment}
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