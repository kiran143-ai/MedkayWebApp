import React, { useMemo, useState } from 'react';
import {
  Building2Icon,
  EyeIcon,
  EllipsisIcon as MoreHorizontalIcon,
  CirclePauseIcon as PauseCircleIcon,
  CirclePlayIcon as PlayCircleIcon } from
'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/Badge';
import type { BadgeTone } from '../ui/Badge';
import { Menu } from '../ui/Menu';
import { Panel } from '../ui/Panel';
import { SearchInput } from '../ui/SearchInput';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Table, Td, Th } from '../ui/Table';
import type { Hospital, HospitalStatus } from '../../types/platform';
import { compactNumber } from '../../utils/format';

interface HospitalsTableProps {
  hospitals: Hospital[];
  onSetStatus: (id: string, status: HospitalStatus) => void;
}

type Filter = 'all' | HospitalStatus;

const statusMeta: Record<HospitalStatus, {label: string;tone: BadgeTone;}> = {
  active: { label: 'Active', tone: 'success' },
  'setting-up': { label: 'Setting up', tone: 'info' },
  suspended: { label: 'Suspended', tone: 'neutral' }
};

export function HospitalsTable({ hospitals, onSetStatus }: HospitalsTableProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hospitals.filter(
      (h) => (filter === 'all' || h.status === filter) && (!q || `${h.name} ${h.slug} ${h.city}`.toLowerCase().includes(q))
    );
  }, [hospitals, query, filter]);

  const count = (s: HospitalStatus) => hospitals.filter((h) => h.status === s).length;

  return (
    <Panel
      title="Onboarded hospitals"
      actions={<SearchInput value={query} onChange={setQuery} placeholder="Search hospitals…" label="Search hospitals" className="w-full sm:w-64" />}>
      
      <div className="px-5 pb-4">
        <SegmentedControl<Filter>
          label="Filter by status"
          value={filter}
          onChange={setFilter}
          options={[
          { value: 'all', label: 'All', count: hospitals.length },
          { value: 'active', label: 'Active', count: count('active') },
          { value: 'setting-up', label: 'Setting up', count: count('setting-up') },
          { value: 'suspended', label: 'Suspended', count: count('suspended') }]
          } />
        
      </div>
      <Table>
        <thead>
          <tr>
            <Th>Hospital</Th>
            <Th>Workspace</Th>
            <Th align="right">People</Th>
            <Th align="right">Servers</Th>
            <Th align="right">Studies</Th>
            <Th>Status</Th>
            <Th>
              <span className="sr-only">Actions</span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 &&
          <tr>
              <td colSpan={7} className="px-5 py-12 text-center text-sm text-ink-muted">
                No hospitals match your filters.
              </td>
            </tr>
          }
          {rows.map((h) =>
          <tr key={h.id} className="transition-colors duration-150 hover:bg-canvas/60">
              <Td>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <Building2Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{h.name}</p>
                    <p className="text-xs text-ink-muted">
                      {h.city} · since {h.onboardedOn}
                    </p>
                  </div>
                </div>
              </Td>
              <Td>
                <span className="font-mono text-[13px] text-teal-700">{h.slug}</span>
              </Td>
              <Td align="right" className="tabular-nums text-ink">
                {h.people}
              </Td>
              <Td align="right" className="tabular-nums text-ink">
                {h.servers}
              </Td>
              <Td align="right" className="tabular-nums text-ink">
                {h.studies ? compactNumber(h.studies) : '—'}
              </Td>
              <Td>
                <Badge tone={statusMeta[h.status].tone} dot>
                  {statusMeta[h.status].label}
                </Badge>
              </Td>
              <Td align="right">
                <Menu
                label={`Actions for ${h.name}`}
                triggerClassName="p-1.5 text-ink-subtle hover:bg-white hover:text-ink"
                trigger={<MoreHorizontalIcon className="h-4 w-4" />}
                items={[
                { label: 'View details', icon: EyeIcon, onSelect: () => toast(`${h.name}`, { description: `Admin: ${h.adminEmail}` }) },
                h.status === 'suspended' ?
                {
                  label: 'Reactivate',
                  icon: PlayCircleIcon,
                  onSelect: () => {
                    onSetStatus(h.id, 'active');
                    toast.success(`${h.name} reactivated`);
                  }
                } :
                {
                  label: 'Suspend access',
                  icon: PauseCircleIcon,
                  danger: true,
                  onSelect: () => {
                    onSetStatus(h.id, 'suspended');
                    toast(`${h.name} suspended`, {
                      description: 'People can no longer sign in. Archives are kept.',
                      action: { label: 'Undo', onClick: () => onSetStatus(h.id, h.status) }
                    });
                  }
                }]
                } />
              
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Panel>);

}