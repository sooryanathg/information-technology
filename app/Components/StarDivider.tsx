import React from 'react';

interface StarDividerProps {
  light?: boolean;
}

export default function StarDivider({ light = false }: StarDividerProps) {
  return (
    <div className="flex items-center justify-center gap-3.5 my-3.5">
      <div className="h-[4px] w-[80px] rounded-full bg-[#F4B942]" />
      <div className="w-[40px] h-[40px] flex items-center justify-center">
        <span className="text-[#F4B942] text-4xl leading-none select-none drop-shadow-xs">★</span>
      </div>
      <div className="h-[4px] w-[80px] rounded-full bg-[#F4B942]" />
    </div>
  );
}
