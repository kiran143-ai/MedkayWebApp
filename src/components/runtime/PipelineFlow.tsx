import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import type { PipelineStage } from '../../types/platform';
import { cn } from '../../utils/cn';

interface PipelineFlowProps {
  stages: PipelineStage[];
}

export function PipelineFlow({ stages }: PipelineFlowProps) {
  return (
    <ol className="grid gap-3 md:grid-cols-5 md:gap-0">
      {stages.map((s, i) => {
        const slow = s.status === 'slow';
        return (
          <li key={s.id} className="relative flex md:pr-3">
            <div
              className={cn(
                'flex w-full flex-col rounded-lg border p-4',
                slow ? 'border-warning-500/40 bg-warning-50' : 'border-line bg-white'
              )}>
              
              <p className="text-xs font-medium text-ink-subtle">Stage {i + 1}</p>
              <p className="mt-0.5 font-semibold text-ink">{s.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{s.description}</p>
              <p className="mt-4 font-display text-2xl font-semibold tabular-nums text-navy-700">{s.processed.toLocaleString('en-IN')}</p>
              <p className="text-xs text-ink-muted">processed today</p>
              <div className="mt-auto flex gap-4 border-t border-line/80 pt-3 text-xs">
                <span className={cn(slow ? 'font-semibold text-warning-700' : 'text-ink-muted')}>{s.queued} queued</span>
                <span className={cn(s.failed ? 'font-semibold text-danger-600' : 'text-ink-subtle')}>{s.failed} failed</span>
              </div>
            </div>
            {i < stages.length - 1 &&
            <ChevronRightIcon className="absolute -right-1.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-ink-subtle md:block" aria-hidden />
            }
          </li>);

      })}
    </ol>);

}