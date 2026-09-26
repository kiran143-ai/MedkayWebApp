import React, { useId } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: React.ReactNode;
  error?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  requiredMark?: boolean;
}

export function Input({ label, hint, error, icon, trailing, requiredMark, className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label &&
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
          {requiredMark && <span className="ml-1 font-normal text-ink-subtle">(required)</span>}
        </label>
      }
      <div
        className={cn(
          'flex h-11 items-center gap-2.5 rounded-lg border bg-white px-3 transition-[border-color,box-shadow] duration-150 ease-out focus-within:ring-4',
          error ?
          'border-danger-500 focus-within:ring-danger-50' :
          'border-line hover:border-ink-subtle/50 focus-within:border-teal-500 focus-within:ring-teal-50'
        )}>
        
        {icon && <span className="flex shrink-0 text-ink-subtle [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
        <input
          id={inputId}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className="h-full w-full min-w-0 bg-transparent text-sm text-ink placeholder:text-ink-subtle focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          {...rest} />
        
        {trailing}
      </div>
      {error ?
      <p id={`${inputId}-error`} className="text-xs font-medium text-danger-600">
          {error}
        </p> :
      hint ?
      <p id={`${inputId}-hint`} className="text-xs text-ink-subtle">
          {hint}
        </p> :
      null}
    </div>);

}