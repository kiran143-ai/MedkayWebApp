import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SegmentOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange, label }: SegmentedControlProps<T>) {
  const id = useId();
  return (
    <div role="tablist" aria-label={label} className="inline-flex rounded-lg bg-canvas p-1 ring-1 ring-inset ring-line">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'relative whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
              active ? 'text-ink' : 'text-ink-muted hover:text-ink'
            )}>
            
            {active &&
            <motion.span
              layoutId={`seg-${id}`}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 rounded-md bg-white shadow-card ring-1 ring-line" />

            }
            <span className="relative flex items-center gap-1.5">
              {o.label}
              {o.count !== undefined && <span className="text-xs text-ink-subtle">{o.count}</span>}
            </span>
          </button>);

      })}
    </div>);

}