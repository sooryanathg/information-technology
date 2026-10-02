'use client';

import React from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">An error occurred</h2>
      <p className="text-sm text-gray-500 mb-6">
        {error.message || 'Something went wrong while loading this page.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-[#F4B942] hover:bg-[#e5a82e] text-black font-semibold rounded-xl transition"
      >
        Try again
      </button>
    </div>
  );
}
