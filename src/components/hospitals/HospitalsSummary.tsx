import React from 'react';
import type { Hospital } from '../../types/platform';
import { compactNumber } from '../../utils/format';

interface HospitalsSummaryProps {
  hospitals: Hospital[];
}

export function HospitalsSummary({ hospitals }: HospitalsSummaryProps) {
  const active = hospitals.filter((h) => h.status === 'active').length;
  const settingUp = hospitals.filter((h) => h.status === 'setting-up').length;
  const suspended = hospitals.filter((h) => h.status === 'suspended').length;
  const people = hospitals.reduce((s, h) => s + h.people, 0);
  const servers = hospitals.reduce((s, h) => s + h.servers, 0);
  const studies = hospitals.reduce((s, h) => s + h.studies, 0);

  const secondary = [
  { label: 'People with access', value: people.toString() },
  { label: 'Imaging servers', value: servers.toString() },
  { label: 'Studies archived', value: compactNumber(studies) }];


  return (
    <section aria-label="Network summary" className="grid gap-6 rounded-xl border border-line bg-white p-6 shadow-card lg:grid-cols-[1.3fr_2fr] lg:items-center">
      <div>
        <p className="text-sm text-ink-muted">Hospitals on the network</p>
        <p className="mt-1 font-display text-5xl font-bold tracking-tight text-navy-700">{hospitals.length}</p>
        <p className="mt-2 text-sm text-ink-muted">
          <span className="font-medium text-success-700">{active} active</span>
          <span className="mx-2 text-line">|</span>
          {settingUp} setting up
          <span className="mx-2 text-line">|</span>
          {suspended} suspended
        </p>
      </div>
      <dl className="grid grid-cols-3 divide-x divide-line border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-2 lg:pt-0">
        {secondary.map((s) =>
        <div key={s.label} className="px-4 first:pl-0 lg:first:pl-6">
            <dt className="text-xs text-ink-muted">{s.label}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-ink">{s.value}</dd>
          </div>
        )}
      </dl>
    </section>);

}