import React from 'react';
import { typeScale } from '../../data/designTokens';
import { DsSection } from './DsSection';

export function TypographySection() {
  return (
    <DsSection
      id="typography"
      title="Typography"
      description="Plus Jakarta Sans echoes the geometric wordmark for titles and numbers. Inter handles everything people read. JetBrains Mono is for identifiers — AE titles, hosts, slugs, consent IDs.">
      
      <ul className="divide-y divide-line rounded-xl border border-line bg-white">
        {typeScale.map((t) =>
        <li key={t.name} className="grid items-center gap-2 px-5 py-5 md:grid-cols-[180px_1fr]">
            <div>
              <p className="text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-ink-subtle">{t.spec}</p>
            </div>
            <p className={`${t.className} min-w-0 truncate text-ink`}>{t.sample}</p>
          </li>
        )}
      </ul>
    </DsSection>);

}