import React from 'react';

interface CharlieLogoProps {
  className?: string;
  size?: number;
}

/**
 * Minimal geometric letter 'C' mark composed of precision architectural segments
 * subtly evoking ascending analytical bars inside a clean octagon-cut frame.
 */
export function CharlieLogo({ className = '', size = 24 }: CharlieLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="25"
        height="25"
        rx="6"
        className="fill-zinc-900 dark:fill-zinc-900 stroke-zinc-800 dark:stroke-zinc-700"
        strokeWidth="1"
      />
      {/* Precision geometric C arc */}
      <path
        d="M18.5 9.25C17.25 8.15 15.6 7.5 13.75 7.5C9.88 7.5 6.75 10.41 6.75 14C6.75 17.59 9.88 20.5 13.75 20.5C15.6 20.5 17.25 19.85 18.5 18.75"
        stroke="#10B981"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Inner ascending metric bar accent */}
      <rect x="13" y="13.5" width="2" height="3.5" rx="0.75" fill="#FAFAFA" />
      <rect x="16.25" y="11.5" width="2" height="5.5" rx="0.75" fill="#2DD4BF" />
      <rect x="19.5" y="12.5" width="2" height="3" rx="0.75" fill="#10B981" />
    </svg>
  );
}
