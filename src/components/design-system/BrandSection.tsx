import React from 'react';
import { Logo } from '../Logo';
import { DsSection } from './DsSection';

const principles = [
{ title: 'Care', text: 'Calm surfaces and plain language. Clinicians are busy; nothing should shout unless it matters.' },
{ title: 'Compassion', text: 'Patients are behind every row. Mask identifiers by default, and explain what happens to their data.' },
{ title: 'Trust', text: 'Show the evidence — who, when, under which consent. Every irreversible action says what it will do first.' }];


export function BrandSection() {
  return (
    <DsSection id="brand" title="Brand" description="The MedKay mark pairs a navy M with a teal K and cross — clinical trust meeting intelligent technology.">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex h-40 items-center justify-center rounded-xl border border-line bg-white">
            <Logo className="h-24" />
          </div>
          <div className="flex h-28 items-center justify-center rounded-xl border border-line bg-white">
            <Logo markOnly className="scale-150" />
          </div>
          <div className="flex h-28 flex-col justify-center rounded-xl border border-line bg-white px-5">
            <p className="text-xs text-ink-subtle">Clear space</p>
            <p className="mt-1 text-sm text-ink">Keep the height of the cross free on every side. Never place the logo on teal or navy fills.</p>
          </div>
        </div>
        <ol className="space-y-5">
          {principles.map((p) =>
          <li key={p.title} className="border-l-2 border-teal-500 pl-4">
              <p className="font-display text-base font-semibold text-ink">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.text}</p>
            </li>
          )}
        </ol>
      </div>
    </DsSection>);

}