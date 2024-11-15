'use client'

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({className}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useEffect(() => {
    Api.products.search(searchQuery);
  }, [searchQuery]);

  return (
    <>
      {focused && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />}

      <div ref={ref} className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
        <Search className="absolute top-1/2 left-3 translate-y-[-50%] h-5 text-gray-400" />
        <input 
          className="w-full rounded-2xl outline-none pl-11 bg-gray-100"
          placeholder="Найти пиццу..." 
          type="text"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div 
        className={cn(
          'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
          focused && 'visible opacity-100 top-12',
        )}>
          <Link href="/product/1">
            <div className="px-3 py-2 hover:bg-primary/10">ddddd</div>
          </Link>
        </div>
      </div>
    </>
  );
}