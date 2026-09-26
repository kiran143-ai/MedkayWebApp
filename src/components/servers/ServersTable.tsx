import React from 'react';
import { PlugZapIcon } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Table, Td, Th } from '../ui/Table';
import type { ImagingServer } from '../../types/platform';
import { cn } from '../../utils/cn';
import { serverStatusMeta } from './serverStatus';

interface ServersTableProps {
  servers: ImagingServer[];
  testingId: string | null;
  onTest: (server: ImagingServer) => void;
}

export function ServersTable({ servers, testingId, onTest }: ServersTableProps) {
  return (
    <Table minWidth={960}>
      <thead>
        <tr>
          <Th>Server</Th>
          <Th>Hospital</Th>
          <Th>Address</Th>
          <Th>Modalities</Th>
          <Th align="right">Latency</Th>
          <Th align="right">Studies today</Th>
          <Th>Status</Th>
          <Th>
            <span className="sr-only">Actions</span>
          </Th>
        </tr>
      </thead>
      <tbody>
        {servers.length === 0 &&
        <tr>
            <td colSpan={8} className="px-5 py-12 text-center text-sm text-ink-muted">
              No servers match these filters.
            </td>
          </tr>
        }
        {servers.map((s) =>
        <tr key={s.id} className="transition-colors duration-150 hover:bg-canvas/60">
            <Td>
              <p className="font-semibold text-ink">{s.name}</p>
              <p className="font-mono text-xs text-ink-muted">{s.aeTitle}</p>
            </Td>
            <Td className="text-ink">
              {s.hospital}
              <span className="block text-xs text-ink-muted">{s.vendor}</span>
            </Td>
            <Td>
              <span className="font-mono text-[13px] text-ink-muted">
                {s.host}:{s.port}
              </span>
            </Td>
            <Td>
              <div className="flex flex-wrap gap-1">
                {s.modalities.map((m) =>
              <span key={m} className="rounded bg-navy-50 px-1.5 py-0.5 font-mono text-[11px] font-medium text-navy-700">
                    {m}
                  </span>
              )}
              </div>
            </Td>
            <Td align="right" className={cn('tabular-nums', s.latencyMs && s.latencyMs > 500 ? 'font-semibold text-warning-700' : 'text-ink')}>
              {s.latencyMs ? `${s.latencyMs} ms` : '—'}
            </Td>
            <Td align="right" className="tabular-nums text-ink">
              {s.studiesToday || '—'}
            </Td>
            <Td>
              <Badge tone={serverStatusMeta[s.status].tone} dot>
                {serverStatusMeta[s.status].label}
              </Badge>
              <span className="mt-1 block text-xs text-ink-subtle">Synced {s.lastSync}</span>
            </Td>
            <Td align="right">
              <Button
              size="sm"
              variant="secondary"
              loading={testingId === s.id}
              leftIcon={<PlugZapIcon className="h-3.5 w-3.5" />}
              onClick={() => onTest(s)}>
              
                {testingId === s.id ? 'Testing…' : 'Test'}
              </Button>
            </Td>
          </tr>
        )}
      </tbody>
    </Table>);

}