import React from 'react';

interface DsSectionProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DsSection({ id, title, description, children }: DsSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-bold text-navy-700">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">{description}</p>
      <div className="mt-6">{children}</div>
    </section>);

}

export function DsLabel({ children }: {children: React.ReactNode;}) {
  return <p className="mb-3 text-xs font-semibold text-ink-subtle">{children}</p>;
}