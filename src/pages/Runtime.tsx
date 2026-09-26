import React, { useState } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { Callout } from '../components/ui/Callout';
import { PageHeader } from '../components/ui/PageHeader';
import { Panel } from '../components/ui/Panel';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { PipelineFlow } from '../components/runtime/PipelineFlow';
import { ThroughputChart } from '../components/runtime/ThroughputChart';
import { ServicesList } from '../components/runtime/ServicesList';
import { pipelineStages, services, throughput1h, throughput24h, throughput7d } from '../data/runtime';
import { wait } from '../utils/format';

type Range = '1h' | '24h' | '7d';

const ranges = { '1h': throughput1h, '24h': throughput24h, '7d': throughput7d };

export function Runtime() {
  const [range, setRange] = useState<Range>('24h');
  const [refreshing, setRefreshing] = useState(false);
  const data = ranges[range];
  const total = data.reduce((s, p) => s + p.studies, 0);

  const refresh = async () => {
    setRefreshing(true);
    await wait(700);
    setRefreshing(false);
    toast.success('Runtime refreshed');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Runtime"
        description="How studies are moving through MedKay right now — from hospital PACS to AI-ready archive."
        actions={
        <Button variant="secondary" loading={refreshing} leftIcon={<RefreshCwIcon className="h-4 w-4" />} onClick={refresh}>
            Refresh
          </Button>
        } />
      

      <Callout tone="warning" title="De-identification is running slow">
        186 studies are queued for PHI removal. Research exports may be delayed by ~20 minutes. Clinical viewing is not affected.
      </Callout>

      <Panel title="Today’s pipeline" description="Every study passes through these stages in order." bodyClassName="px-5 pb-5">
        <PipelineFlow stages={pipelineStages} />
      </Panel>

      <div className="grid gap-6">
        <Panel
          title="Studies ingested"
          description={
          <>
              <span className="font-display text-xl font-semibold text-ink">{total.toLocaleString('en-IN')}</span> in the last {range}
            </>
          }
          actions={
          <SegmentedControl<Range>
            label="Time range"
            value={range}
            onChange={setRange}
            options={[
            { value: '1h', label: '1h' },
            { value: '24h', label: '24h' },
            { value: '7d', label: '7d' }]
            } />

          }
          bodyClassName="px-3 pb-4">
          
          <ThroughputChart data={data} />
        </Panel>

        <Panel title="Services" description="Uptime over 30 days and p95 response time.">
          <div className="hidden grid-cols-[1.6fr_repeat(3,90px)_120px] gap-3 border-t border-line bg-canvas px-5 py-2 text-xs font-semibold text-ink-muted sm:grid">
            <span>Service</span>
            <span>Version</span>
            <span>Uptime</span>
            <span>p95</span>
            <span className="text-right">Status</span>
          </div>
          <ServicesList services={services} />
        </Panel>
      </div>
    </div>);

}