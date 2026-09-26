import React, { useMemo, useState } from 'react';
import { DownloadIcon, LockIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { Panel } from '../components/ui/Panel';
import { SearchInput } from '../components/ui/SearchInput';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { AuditRow } from '../components/audit/AuditRow';
import { auditEvents } from '../data/auditLog';
import type { AuditCategory } from '../types/platform';
import { wait } from '../utils/format';

type CategoryFilter = 'all' | AuditCategory;

export function AuditLog() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return auditEvents.filter(
      (e) =>
      (category === 'all' || e.category === category) && (
      !q || `${e.actor} ${e.action} ${e.target} ${e.hospital} ${e.consentId ?? ''}`.toLowerCase().includes(q))
    );
  }, [category, query]);

  const days = Array.from(new Set(filtered.map((e) => e.day)));

  const exportCsv = async () => {
    setExporting(true);
    await wait(900);
    setExporting(false);
    toast.success('Export ready', { description: `${filtered.length} events · audit-log-2026-09-25.csv` });
  };

  const countOf = (c: AuditCategory) => auditEvents.filter((e) => e.category === c).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit log"
        description="Every view, share, AI decision and admin change — recorded, tamper-proof and kept for 7 years."
        actions={
        <Button variant="secondary" loading={exporting} leftIcon={<DownloadIcon className="h-4 w-4" />} onClick={exportCsv}>
            Export CSV
          </Button>
        } />
      

      <Panel bodyClassName="pt-4">
        <div className="flex flex-col gap-3 px-5 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="overflow-x-auto">
            <SegmentedControl<CategoryFilter>
              label="Filter by category"
              value={category}
              onChange={setCategory}
              options={[
              { value: 'all', label: 'All', count: auditEvents.length },
              { value: 'access', label: 'Access', count: countOf('access') },
              { value: 'sharing', label: 'Sharing', count: countOf('sharing') },
              { value: 'ai', label: 'AI', count: countOf('ai') },
              { value: 'admin', label: 'Admin', count: countOf('admin') },
              { value: 'auth', label: 'Sign-in', count: countOf('auth') }]
              } />
            
          </div>
          <SearchInput value={query} onChange={setQuery} placeholder="Person, MRN, consent ID…" label="Search audit log" className="lg:w-72" />
        </div>

        {filtered.length === 0 ?
        <p className="border-t border-line px-5 py-14 text-center text-sm text-ink-muted">No events match these filters.</p> :

        days.map((day) =>
        <section key={day} aria-label={day}>
              <h2 className="border-y border-line bg-canvas px-5 py-2 text-xs font-semibold text-ink-muted">{day}</h2>
              <ul>
                {filtered.
            filter((e) => e.day === day).
            map((e) =>
            <AuditRow key={e.id} event={e} expanded={expanded === e.id} onToggle={() => setExpanded((x) => x === e.id ? null : e.id)} />
            )}
              </ul>
            </section>
        )
        }

        <p className="flex items-center gap-2 rounded-b-xl border-t border-line px-5 py-3 text-xs text-ink-subtle">
          <LockIcon className="h-3.5 w-3.5" aria-hidden />
          Records are append-only. Not even platform admins can edit or delete them.
        </p>
      </Panel>
    </div>);

}