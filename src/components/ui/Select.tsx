import React, { useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  hint?: string;
  options: SelectOption[];
  compact?: boolean;
}

export function Select({ label, hint, options, compact, className, id, ...rest }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label &&
      <label htmlFor={selectId} className="text-sm font-medium text-ink">
          {label}
        </label>
      }
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'w-full appearance-none rounded-lg border border-line bg-white pl-3 pr-9 text-sm text-ink transition-[border-color,box-shadow] duration-150 ease-out hover:border-ink-subtle/50 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-50',
            compact ? 'h-9' : 'h-11'
          )}
          {...rest}>
          
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" aria-hidden />
      </div>
      {hint && <p className="text-xs text-ink-subtle">{hint}</p>}
    </div>);

}