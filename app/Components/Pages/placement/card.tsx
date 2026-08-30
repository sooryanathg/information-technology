import React from 'react';

interface PlacementCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PlacementCard({ children, className = '' }: PlacementCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
