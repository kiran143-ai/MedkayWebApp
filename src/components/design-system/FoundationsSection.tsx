import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { motionTokens, radii, voiceRules } from '../../data/designTokens';
import { DsLabel, DsSection } from './DsSection';

const spacing = [4, 8, 12, 16, 24, 32, 48];

export function FoundationsSection() {
  return (
    <>
      <DsSection id="layout" title="Shape, space & elevation" description="A 4px grid. Panels sit on the canvas with a hairline border and the lightest shadow — depth is reserved for things that float.">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-5">
            <DsLabel>Radius</DsLabel>
            <ul className="space-y-3">
              {radii.map((r) =>
              <li key={r.token} className="flex items-center gap-3">
                  <span className="h-10 w-10 border-2 border-teal-500 bg-teal-50" style={{ borderRadius: r.px === '999px' ? 999 : r.px }} />
                  <span className="text-sm">
                    <span className="font-mono text-[13px] text-ink">{r.token}</span>
                    <span className="block text-xs text-ink-muted">
                      {r.px} · {r.usage}
                    </span>
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-white p-5">
            <DsLabel>Spacing</DsLabel>
            <ul className="space-y-2.5">
              {spacing.map((s) =>
              <li key={s} className="flex items-center gap-3">
                  <span className="w-10 font-mono text-xs text-ink-muted">{s}px</span>
                  <span className="h-3 rounded-sm bg-teal-500" style={{ width: s * 3 }} />
                </li>
              )}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-canvas p-5">
            <DsLabel>Elevation</DsLabel>
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-white p-4 shadow-card">
                <p className="text-sm font-semibold text-ink">shadow-card</p>
                <p className="text-xs text-ink-muted">Panels resting on the canvas</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-4 shadow-pop">
                <p className="text-sm font-semibold text-ink">shadow-pop</p>
                <p className="text-xs text-ink-muted">Menus, drawers, command bar</p>
              </div>
            </div>
          </div>
        </div>
      </DsSection>

      <DsSection id="motion" title="Motion" description="Motion confirms, it never decorates. Nothing runs longer than 300ms, and everything respects reduced-motion settings.">
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <ul className="divide-y divide-line">
            {motionTokens.map((m) =>
            <li key={m.name} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[120px_80px_1fr_1fr] sm:items-center">
                <span className="text-sm font-semibold text-ink">{m.name}</span>
                <span className="font-mono text-xs text-teal-700">{m.duration}</span>
                <span className="font-mono text-xs text-ink-muted">{m.easing}</span>
                <span className="text-sm text-ink-muted">{m.usage}</span>
              </li>
            )}
          </ul>
        </div>
      </DsSection>

      <DsSection id="voice" title="Voice" description="Write like a senior radiographer explaining to a colleague: specific, calm, and in plain words.">
        <ul className="space-y-3">
          {voiceRules.map((v) =>
          <li key={v.do} className="grid gap-3 md:grid-cols-2">
              <p className="flex items-start gap-2.5 rounded-lg bg-success-50 px-4 py-3 text-sm text-success-700">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" aria-label="Do" />
                {v.do}
              </p>
              <p className="flex items-start gap-2.5 rounded-lg bg-danger-50 px-4 py-3 text-sm text-danger-700">
                <XIcon className="mt-0.5 h-4 w-4 shrink-0" aria-label="Don’t" />
                {v.dont}
              </p>
            </li>
          )}
        </ul>
      </DsSection>
    </>);

}