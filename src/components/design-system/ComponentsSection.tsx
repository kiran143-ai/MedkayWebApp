import React, { useState } from 'react';
import { ArrowRightIcon, Building2Icon, MailIcon, PlusIcon } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SearchInput } from '../ui/SearchInput';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { DsLabel, DsSection } from './DsSection';

function Specimen({ label, children }: {label: string;children: React.ReactNode;}) {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <DsLabel>{label}</DsLabel>
      {children}
    </div>);

}

export function ComponentsSection() {
  const [on, setOn] = useState(true);
  const [seg, setSeg] = useState<'all' | 'active' | 'suspended'>('all');
  const [search, setSearch] = useState('');

  return (
    <DsSection id="components" title="Components" description="The building blocks used on every page. All are keyboard accessible with a visible teal focus ring.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Specimen label="Buttons — one primary per view">
          <div className="flex flex-wrap items-center gap-3">
            <Button leftIcon={<PlusIcon className="h-4 w-4" />}>Onboard hospital</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="subtle">Review</Button>
            <Button variant="ghost">Dismiss</Button>
            <Button variant="danger">Suspend</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
              Large
            </Button>
            <Button loading>Saving…</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Specimen>

        <Specimen label="Badges — status, always with text">
          <div className="flex flex-wrap gap-2">
            <Badge tone="success" dot>
              Active
            </Badge>
            <Badge tone="warning" dot>
              Slow
            </Badge>
            <Badge tone="danger" dot>
              Offline
            </Badge>
            <Badge tone="info" dot>
              Setting up
            </Badge>
            <Badge tone="neutral" dot>
              Suspended
            </Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            <Badge tone="navy">Platform-wide</Badge>
            <Badge tone="teal">Per hospital</Badge>
            <Badge>12 people</Badge>
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
            <Avatar name="Sameena Shaik" size="sm" />
            <Avatar name="Vikram Rao" />
            <Avatar name="Arohak Diagnostics" size="lg" />
            <span className="ml-2 text-xs text-ink-muted">Avatars tint by name, never by role.</span>
          </div>
        </Specimen>

        <Specimen label="Text inputs">
          <div className="space-y-4">
            <Input label="Hospital name" requiredMark icon={<Building2Icon />} placeholder="e.g. AIIMS Delhi" hint="As it appears on letterhead." />
            <Input label="Admin email" icon={<MailIcon />} defaultValue="ramesh.k@gmail.com" error="Public email domains can’t vouch for a hospital." />
          </div>
        </Specimen>

        <Specimen label="Selection & filtering">
          <div className="space-y-4">
            <Select
              label="Role"
              options={[
              { value: 'r', label: 'Radiologist' },
              { value: 't', label: 'Technologist' }]
              } />
            
            <SearchInput value={search} onChange={setSearch} placeholder="Search hospitals…" label="Search example" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SegmentedControl
                label="Example filter"
                value={seg}
                onChange={setSeg}
                options={[
                { value: 'all', label: 'All', count: 6 },
                { value: 'active', label: 'Active', count: 4 },
                { value: 'suspended', label: 'Suspended', count: 1 }]
                } />
              
              <label className="flex items-center gap-2 text-sm text-ink">
                <Switch checked={on} onChange={setOn} label="Run AI models" />
                Run AI models
              </label>
            </div>
          </div>
        </Specimen>
      </div>
    </DsSection>);

}