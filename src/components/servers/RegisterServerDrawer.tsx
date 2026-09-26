import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Callout } from '../ui/Callout';
import { Drawer } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { ImagingServer } from '../../types/platform';
import { wait } from '../../utils/format';

interface RegisterServerDrawerProps {
  open: boolean;
  hospitals: string[];
  onClose: () => void;
  onSubmit: (server: ImagingServer) => void;
}

const empty = { name: '', hospital: '', aeTitle: '', host: '', port: '104' };

export function RegisterServerDrawer({ open, hospitals, onClose, onSubmit }: RegisterServerDrawerProps) {
  const [form, setForm] = useState({ ...empty, hospital: hospitals[0] ?? '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ ...empty, hospital: hospitals[0] ?? '' });
      setErrors({});
    }
  }, [open, hospitals]);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = key === 'aeTitle' ? e.target.value.toUpperCase() : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: '' }));
  };

  const submit = async () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Give this server a name people will recognise.';
    if (!/^[A-Z0-9_]{1,16}$/.test(form.aeTitle)) next.aeTitle = 'Up to 16 letters, numbers or underscores.';
    if (!form.host.trim()) next.host = 'Enter an IP address or hostname.';
    const port = Number(form.port);
    if (!Number.isInteger(port) || port < 1 || port > 65535) next.port = 'Port must be 1–65535.';
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setLoading(true);
    await wait(1200);
    setLoading(false);
    onSubmit({
      id: `s-${Date.now()}`,
      name: form.name.trim(),
      hospital: form.hospital,
      aeTitle: form.aeTitle,
      host: form.host.trim(),
      port,
      vendor: 'DICOM node',
      modalities: ['CT'],
      status: 'online',
      lastSync: 'Just now',
      studiesToday: 0,
      latencyMs: 41
    });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Connect an imaging server"
      description="MedKay sends a C-ECHO to verify the connection before saving."
      footer={
      <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={loading}>
            {loading ? 'Verifying connection…' : 'Verify & connect'}
          </Button>
        </>
      }>
      
      <div className="space-y-5">
        <Input label="Display name" placeholder="e.g. Main PACS" value={form.name} onChange={set('name')} error={errors.name} autoFocus />
        <Select label="Hospital" value={form.hospital} onChange={set('hospital')} options={hospitals.map((h) => ({ value: h, label: h }))} />
        <Input
          label="AE title"
          placeholder="AIIMS_PACS02"
          value={form.aeTitle}
          onChange={set('aeTitle')}
          error={errors.aeTitle}
          hint="The Application Entity title configured on the PACS."
          className="[&_input]:font-mono" />
        
        <div className="grid grid-cols-[1fr_110px] gap-3">
          <Input label="Host" placeholder="10.12.4.21" value={form.host} onChange={set('host')} error={errors.host} className="[&_input]:font-mono" />
          <Input label="Port" inputMode="numeric" value={form.port} onChange={set('port')} error={errors.port} className="[&_input]:font-mono" />
        </div>
        <Callout tone="info">
          Allow inbound DICOM from <span className="font-mono">MEDKAY_GW</span> at 103.48.12.20:104 on the hospital firewall.
        </Callout>
      </div>
    </Drawer>);

}