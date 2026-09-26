import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { BrandSection } from '../components/design-system/BrandSection';
import { ColorSection } from '../components/design-system/ColorSection';
import { TypographySection } from '../components/design-system/TypographySection';
import { ComponentsSection } from '../components/design-system/ComponentsSection';
import { PatternsSection } from '../components/design-system/PatternsSection';
import { FoundationsSection } from '../components/design-system/FoundationsSection';
import { cn } from '../utils/cn';

const sections = [
{ id: 'brand', label: 'Brand' },
{ id: 'color', label: 'Color' },
{ id: 'typography', label: 'Typography' },
{ id: 'components', label: 'Components' },
{ id: 'patterns', label: 'Patterns' },
{ id: 'layout', label: 'Shape & space' },
{ id: 'motion', label: 'Motion' },
{ id: 'voice', label: 'Voice' }];


export function DesignSystem() {
  const [active, setActive] = useState('brand');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="MedKay design system"
        description="Tokens, components and patterns behind every MedKay screen. Built for long reading-room sessions: low glare, high clarity, nothing decorative." />
      
      <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
        <nav aria-label="Design system sections" className="hidden lg:block">
          <ul className="sticky top-24 space-y-0.5 border-l border-line">
            {sections.map((s) =>
            <li key={s.id}>
                <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={cn(
                  '-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors duration-150',
                  active === s.id ? 'border-teal-600 font-semibold text-teal-700' : 'border-transparent text-ink-muted hover:text-ink'
                )}>
                
                  {s.label}
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="min-w-0 space-y-12 pb-24">
          <BrandSection />
          <ColorSection />
          <TypographySection />
          <ComponentsSection />
          <PatternsSection />
          <FoundationsSection />
        </div>
      </div>
    </div>);

}