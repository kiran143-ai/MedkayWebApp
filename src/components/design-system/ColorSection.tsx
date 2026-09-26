import React from 'react';
import { toast } from 'sonner';
import { colorScales, neutralTokens, semanticTokens } from '../../data/designTokens';
import { DsLabel, DsSection } from './DsSection';

function copy(hex: string, token: string) {
  navigator.clipboard?.writeText(hex).catch(() => undefined);
  toast.success(`Copied ${hex}`, { description: token });
}

export function ColorSection() {
  return (
    <DsSection id="color" title="Color" description="Navy carries the brand, teal carries action. Everything else stays quiet so status colors can speak. Click a swatch to copy.">
      <div className="space-y-8">
        {colorScales.map((scale) =>
        <div key={scale.name}>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3">
              <p className="text-sm font-semibold text-ink">{scale.name}</p>
              <p className="text-xs text-ink-muted">{scale.usage}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {scale.swatches.map((s) =>
            <button key={s.token} type="button" onClick={() => copy(s.hex, s.token)} className="group text-left focus-visible:outline-none">
                  <span
                className="block h-16 rounded-lg ring-1 ring-inset ring-black/5 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-teal-500"
                style={{ background: s.hex }} />
              
                  <span className="mt-2 block text-xs font-medium text-ink">{s.token}</span>
                  <span className="block font-mono text-[11px] text-ink-subtle">{s.hex}</span>
                </button>
            )}
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <DsLabel>Neutrals</DsLabel>
            <ul className="divide-y divide-line rounded-xl border border-line bg-white">
              {neutralTokens.map((n) =>
              <li key={n.token}>
                  <button type="button" onClick={() => copy(n.hex, n.token)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-canvas">
                    <span className="h-6 w-6 rounded-md ring-1 ring-inset ring-black/10" style={{ background: n.hex }} />
                    <span className="w-24 text-sm font-medium text-ink">{n.token}</span>
                    <span className="flex-1 text-xs text-ink-muted">{n.usage}</span>
                    <span className="font-mono text-[11px] text-ink-subtle">{n.hex}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div>
            <DsLabel>Status</DsLabel>
            <ul className="grid gap-3 sm:grid-cols-2">
              {semanticTokens.map((s) =>
              <li key={s.token} className="rounded-xl border border-line bg-white p-3">
                  <div className="flex h-12 items-center rounded-lg px-3 text-sm font-semibold" style={{ background: s.fill, color: s.solid }}>
                    {s.name}
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-ink-subtle">
                    {s.token}-50 · {s.token}-600
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">{s.usage}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </DsSection>);

}