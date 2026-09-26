import React from 'react';
import { cn } from '../../utils/cn';

interface CellProps {
  children?: React.ReactNode;
  className?: string;
  align?: 'left' | 'right' | 'center';
}

const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' };

export function Table({ children, minWidth = 760 }: {children: React.ReactNode;minWidth?: number;}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-sm" style={{ minWidth }}>
        {children}
      </table>
    </div>);

}

export function Th({ children, className, align = 'left' }: CellProps) {
  return (
    <th
      scope="col"
      className={cn(
        'whitespace-nowrap border-y border-line bg-canvas px-5 py-2.5 text-xs font-semibold text-ink-muted',
        alignClass[align],
        className
      )}>
      
      {children}
    </th>);

}

export function Td({ children, className, align = 'left' }: CellProps) {
  return <td className={cn('border-b border-line px-5 py-3.5 align-middle', alignClass[align], className)}>{children}</td>;
}