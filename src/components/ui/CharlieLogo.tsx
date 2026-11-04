import React from 'react';
import Image from 'next/image';
import charlieLogo from '@/assets/Charlie-logo.jpeg';

interface CharlieLogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Charlie the Business Advisor logo mark.
 */
export function CharlieLogo({ className = '', size = 24 }: CharlieLogoProps) {
  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-xs ring-1 ring-zinc-900/10 dark:ring-white/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={charlieLogo}
        alt="Charlie the Business Advisor"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
