import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder, label, className }: SearchInputProps) {
  return (
    <div
      className={cn(
        'flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3 transition-[border-color,box-shadow] duration-150 ease-out focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-50',
        className
      )}>
      
      <SearchIcon className="h-4 w-4 shrink-0 text-ink-subtle" aria-hidden />
      <input
        type="search"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full w-full min-w-0 bg-transparent text-sm text-ink placeholder:text-ink-subtle focus:outline-none [&::-webkit-search-cancel-button]:hidden" />
      
      {value &&
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="rounded p-0.5 text-ink-subtle hover:bg-canvas hover:text-ink">
        
          <XIcon className="h-3.5 w-3.5" />
        </button>
      }
    </div>);

}