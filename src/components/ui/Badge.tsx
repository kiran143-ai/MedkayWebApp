import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'teal' | 'navy';

interface BadgeProps {
  tone?: BadgeTone;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const tones: Record<BadgeTone, {wrap: string;dot: string;}> = {
  neutral: { wrap: 'bg-canvas text-ink-muted ring-1 ring-inset ring-line', dot: 'bg-ink-subtle' },
  success: { wrap: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  warning: { wrap: 'bg-warning-50 text-warning-700', dot: 'bg-warning-500' },
  danger: { wrap: 'bg-danger-50 text-danger-700', dot: 'bg-danger-500' },
  info: { wrap: 'bg-info-50 text-info-700', dot: 'bg-info-500' },
  teal: { wrap: 'bg-teal-50 text-teal-700', dot: 'bg-teal-500' },
  navy: { wrap: 'bg-navy-50 text-navy-700', dot: 'bg-navy-500' }
};

export function Badge({ tone = 'neutral', dot, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tones[tone].wrap,
        className
      )}>
      
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', tones[tone].dot)} aria-hidden />}
      {children}
    </span>);

}