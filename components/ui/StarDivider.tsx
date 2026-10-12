import React from 'react';

export interface StarDividerProps {
  className?: string;
}

/**
 * Reusable decorative star divider with gold lines and central star icon.
 */
export default function StarDivider({ className = '' }: StarDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3.5 my-3.5 ${className}`}>
      <div className="h-[3px] w-[72px] rounded-full bg-[#C89B3C]" />
      <div className="w-[36px] h-[36px] flex items-center justify-center">
        <span className="text-[#C89B3C] text-3xl leading-none select-none drop-shadow-xs">★</span>
      </div>
      <div className="h-[3px] w-[72px] rounded-full bg-[#C89B3C]" />
    </div>
  );
}
