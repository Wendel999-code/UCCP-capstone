"use client";

import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

interface DebouncedSearchInputProps {
  defaultValue?: string;
  searchMember: (value: string) => void;
}

export default function DebouncedSearchInput({
  defaultValue = "",
  searchMember,
}: DebouncedSearchInputProps) {
  const [value, setValue] = useState(defaultValue);

  const debounced = useDebouncedCallback(
    async (inputValue: string) => {
      try {
        await searchMember(inputValue);
      } catch (error) {
        console.error("Error searching member:", error);
      }
    },
    2000,
    { maxWait: 5000 }
  );

  useEffect(() => {
    return () => {
      debounced.flush();
    };
  }, [debounced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounced(newValue);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search"
        className="pl-6 w-[200px] h-[36px] text-[11px] text-muted-foreground"
      />
    </div>
  );
}
