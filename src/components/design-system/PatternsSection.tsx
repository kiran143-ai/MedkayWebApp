import React, { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Callout } from '../ui/Callout';
import { Drawer } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { Table, Td, Th } from '../ui/Table';
import { DsLabel, DsSection } from './DsSection';

export function PatternsSection() {
  const [drawer, setDrawer] = useState(false);

  return (
    <DsSection
      id="patterns"
      title="Patterns"
      description="How components combine. Forms open in a side drawer so the list stays in view; confirmations use toasts with undo instead of blocking dialogs.">
      
      <div className="space-y-6">
        <div>
          <DsLabel>Callouts — one per page, above the content it explains</DsLabel>
          <div className="grid gap-3 md:grid-cols-2">
            <Callout tone="info">The admin’s own address decides which domain may join this hospital.</Callout>
            <Callout tone="success">AIIMS_PACS01 responded in 38 ms.</Callout>
            <Callout tone="warning" title="De-identification is running slow">
              Research exports may be delayed by ~20 minutes.
            </Callout>
            <Callout tone="danger" title="Couldn’t reach NIM_NEURO">
              C-ECHO timed out after 10 s.
            </Callout>
          </div>
        </div>

        <div>
          <DsLabel>Data table — numbers right-aligned, identifiers in mono</DsLabel>
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <Table minWidth={560}>
              <thead>
                <tr>
                  <Th>Hospital</Th>
                  <Th>Workspace</Th>
                  <Th align="right">People</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="font-semibold text-ink">AIIMS Delhi</Td>
                  <Td className="font-mono text-[13px] text-teal-700">aiims-delhi</Td>
                  <Td align="right" className="tabular-nums">
                    42
                  </Td>
                  <Td>
                    <Badge tone="success" dot>
                      Active
                    </Badge>
                  </Td>
                </tr>
                <tr>
                  <Td className="font-semibold text-ink">NIMHANS</Td>
                  <Td className="font-mono text-[13px] text-teal-700">nimhans</Td>
                  <Td align="right" className="tabular-nums">
                    6
                  </Td>
                  <Td>
                    <Badge tone="info" dot>
                      Setting up
                    </Badge>
                  </Td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-5">
          <DsLabel>Overlays & feedback</DsLabel>
          <div className="flex w-full flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setDrawer(true)}>
              Open drawer
            </Button>
            <Button variant="secondary" onClick={() => toast.success('AIIMS Delhi onboarded', { description: 'Invite sent to admin@aiims.edu' })}>
              Success toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast('Dismissed Arohak Diagnostics', { action: { label: 'Undo', onClick: () => toast('Restored') } })}>
              
              Toast with undo
            </Button>
            <Button variant="secondary" onClick={() => toast.error('Couldn’t reach KEM_ARCH', { description: 'C-ECHO timed out after 10 s.' })}>
              Error toast
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title="Drawer example"
        description="Right-aligned, 480px wide. Escape or the backdrop closes it."
        footer={
        <>
            <Button variant="secondary" onClick={() => setDrawer(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDrawer(false)}>Save</Button>
          </>
        }>
        
        <Input label="Display name" placeholder="e.g. Main PACS" />
      </Drawer>
    </DsSection>);

}