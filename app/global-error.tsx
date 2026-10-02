'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-6">
              {error.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 bg-[#F4B942] hover:bg-[#e5a82e] text-black font-semibold rounded-xl transition"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
