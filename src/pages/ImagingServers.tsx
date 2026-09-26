import React, { useMemo, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { Callout } from '../components/ui/Callout';
import { PageHeader } from '../components/ui/PageHeader';
import { Panel } from '../components/ui/Panel';
import { SearchInput } from '../components/ui/SearchInput';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { Select } from '../components/ui/Select';
import { ServersTable } from '../components/servers/ServersTable';
import { RegisterServerDrawer } from '../components/servers/RegisterServerDrawer';
import { imagingServers } from '../data/servers';
import { useHospitals } from '../contexts/HospitalsContext';
import type { ImagingServer } from '../types/platform';
import { wait } from '../utils/format';

type View = 'all' | 'attention';

export function ImagingServers() {
  const { hospitals } = useHospitals();
  const [servers, setServers] = useState<ImagingServer[]>(imagingServers);
  const [view, setView] = useState<View>('all');
  const [hospital, setHospital] = useState('all');
  const [query, setQuery] = useState('');
  const [testingId, setTestingId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const attention = servers.filter((s) => s.status !== 'online');
  const offline = attention.filter((s) => s.status === 'offline').length;
  const slow = attention.length - offline;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return servers.filter(
      (s) =>
      (view === 'all' || s.status !== 'online') && (
      hospital === 'all' || s.hospital === hospital) && (
      !q || `${s.name} ${s.aeTitle} ${s.host}`.toLowerCase().includes(q))
    );
  }, [servers, view, hospital, query]);

  const test = async (s: ImagingServer) => {
    setTestingId(s.id);
    await wait(1100);
    setTestingId(null);
    if (s.status === 'offline') {
      toast.error(`Couldn’t reach ${s.aeTitle}`, { description: `C-ECHO timed out after 10 s at ${s.host}:${s.port}.` });
    } else {
      toast.success(`${s.aeTitle} responded`, { description: `C-ECHO succeeded in ${s.latencyMs} ms.` });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Imaging servers"
        description="PACS and DICOM nodes connected to MedKay. Studies flow from here into each hospital’s archive."
        actions={
        <Button leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => setDrawerOpen(true)}>
            Connect server
          </Button>
        } />
      

      {attention.length > 0 &&
      <Callout
        tone="warning"
        title={`${offline} offline, ${slow} slow`}
        action={
        view === 'all' ?
        <Button size="sm" variant="secondary" onClick={() => setView('attention')}>
                Show these
              </Button> :
        undefined
        }>
        
          Studies from these servers aren’t reaching the archive. Hospitals have been notified.
        </Callout>
      }

      <Panel bodyClassName="pt-4">
        <div className="flex flex-col gap-3 px-5 pb-4 md:flex-row md:items-center md:justify-between">
          <SegmentedControl<View>
            label="View"
            value={view}
            onChange={setView}
            options={[
            { value: 'all', label: 'All servers', count: servers.length },
            { value: 'attention', label: 'Needs attention', count: attention.length }]
            } />
          
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select
              compact
              aria-label="Filter by hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              options={[{ value: 'all', label: 'All hospitals' }, ...hospitals.map((h) => ({ value: h.name, label: h.name }))]}
              className="sm:w-52" />
            
            <SearchInput value={query} onChange={setQuery} placeholder="AE title, host…" label="Search servers" className="sm:w-56" />
          </div>
        </div>
        <ServersTable servers={rows} testingId={testingId} onTest={test} />
      </Panel>

      <RegisterServerDrawer
        open={drawerOpen}
        hospitals={hospitals.map((h) => h.name)}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(s) => {
          setServers((list) => [s, ...list]);
          setDrawerOpen(false);
          toast.success(`${s.aeTitle} connected`, { description: `Receiving studies for ${s.hospital}.` });
        }} />
      
    </div>);

}