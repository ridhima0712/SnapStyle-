import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function LightningBolt({
  className = 'w-4 h-4',
  filled = true,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 1.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M13 2L4.5 13.5H11.5L10.5 22L19.5 10.5H12.5L13 2Z" />
    </svg>
  );
}

export function EditorialStar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 1C16.9 9.7 22.3 15.1 31 16C22.3 16.9 16.9 22.3 16 31C15.1 22.3 9.7 16.9 1 16C9.7 15.1 15.1 9.7 16 1Z" />
    </svg>
  );
}

export function HandDrawnArrow({ className = 'w-16 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 42C28 16 64 12 108 26" />
      <path d="M95 14L110 27L92 34" />
    </svg>
  );
}

export function CurvedSwoop({ className = 'w-28 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 20C44 4 106 4 156 16" />
    </svg>
  );
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#ECE6D4] text-[#8B1E2D] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-7 h-7 mb-2 opacity-75" />
        <span className="font-display text-base font-medium text-[#1A1415]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
