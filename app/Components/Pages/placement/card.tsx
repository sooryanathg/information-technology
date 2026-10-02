import React from 'react';

interface PlacementCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PlacementCard({ children, className = '' }: PlacementCardProps) {
  return (
    <div
      className={`bg-[#FFFCF8] rounded-2xl p-6 shadow-[0_8px_24px_rgba(61,43,31,0.06)] border border-[#E8DCCB] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
