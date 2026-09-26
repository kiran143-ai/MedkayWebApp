import React from 'react';
import { cn } from '../utils/cn';

export const LOGO_URL = "/logo.png";
export const LOGO_TRIMMED_URL = "/logo-trimmed.png";

interface LogoProps {
  markOnly?: boolean;
  className?: string;
}

export function Logo({ markOnly, className }: LogoProps) {
  if (markOnly) {
    return (
      <span className={cn('relative block h-10 w-10 overflow-hidden', className)}>
        <img src={LOGO_URL} alt="MedKay AI" className="absolute max-w-none" style={{ height: 56, left: -8, top: -9 }} />
      </span>);

  }
  return <img src={LOGO_TRIMMED_URL} alt="MedKay AI — Care, Compassion, Trust" className={cn('h-12 w-auto shrink-0 object-contain', className)} />;
}