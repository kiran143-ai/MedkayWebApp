import React from 'react';
import { cn } from '../../utils/cn';

interface PanelProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  id?: string;
}

export function Panel({ title, description, actions, children, className, bodyClassName, id }: PanelProps) {
  return (
    <section id={id} className={cn('rounded-xl border border-line bg-white shadow-card', className)}>
      {(title || actions) &&
      <header className="flex flex-col gap-3 px-5 pb-4 pt-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            {title && <h2 className="font-display text-[15px] font-semibold text-ink">{title}</h2>}
            {description && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </header>
      }
      <div className={bodyClassName}>{children}</div>
    </section>);

}