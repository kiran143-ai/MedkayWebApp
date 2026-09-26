import React from 'react';
import { cn } from '../../utils/cn';
import { initials } from '../../utils/format';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const palettes = [
'bg-teal-50 text-teal-700',
'bg-navy-50 text-navy-700',
'bg-info-50 text-info-700',
'bg-warning-50 text-warning-700',
'bg-success-50 text-success-700'];


const sizes = { sm: 'h-7 w-7 text-[11px]', md: 'h-9 w-9 text-xs', lg: 'h-11 w-11 text-sm' };

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        palettes[hash % palettes.length],
        sizes[size],
        className
      )}>
      
      {initials(name)}
    </span>);

}