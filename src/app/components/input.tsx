"use client";

import { useCallback } from "react";

export default function Input({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <input onChange={change} value={value} className="
      flex-1
      h-10
      px-2
      border
      border-slate-200
      rounded-md
      focus:outline-none
      focus:ring-1
      mr-2
    " />
  )
}