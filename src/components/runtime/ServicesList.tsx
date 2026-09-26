import React from 'react';
import { Badge } from '../ui/Badge';
import type { BadgeTone } from '../ui/Badge';
import type { ServiceHealth } from '../../types/platform';

interface ServicesListProps {
  services: ServiceHealth[];
}

const meta: Record<ServiceHealth['status'], {label: string;tone: BadgeTone;}> = {
  operational: { label: 'Operational', tone: 'success' },
  degraded: { label: 'Degraded', tone: 'warning' },
  down: { label: 'Down', tone: 'danger' }
};

export function ServicesList({ services }: ServicesListProps) {
  return (
    <ul className="divide-y divide-line border-t border-line">
      {services.map((s) =>
      <li key={s.id} className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-3.5 sm:grid-cols-[1.6fr_repeat(3,90px)_120px]">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{s.name}</p>
            <p className="truncate text-xs text-ink-muted">{s.description}</p>
          </div>
          <span className="hidden font-mono text-xs text-ink-muted sm:block">v{s.version}</span>
          <span className="hidden text-sm tabular-nums text-ink sm:block">{s.uptime}</span>
          <span className="hidden text-sm tabular-nums text-ink sm:block">{s.p95}</span>
          <div className="justify-self-end">
            <Badge tone={meta[s.status].tone} dot>
              {meta[s.status].label}
            </Badge>
          </div>
        </li>
      )}
    </ul>);

}