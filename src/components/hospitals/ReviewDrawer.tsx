import React, { useState } from 'react';
import { CircleCheckIcon, CircleXIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Callout } from '../ui/Callout';
import { Drawer } from '../ui/Drawer';
import type { JoinRequest } from '../../types/platform';
import { wait } from '../../utils/format';

interface ReviewDrawerProps {
  request: JoinRequest | null;
  onClose: () => void;
  onApprove: (request: JoinRequest) => void;
  onDismiss: (request: JoinRequest) => void;
}

export function ReviewDrawer({ request, onClose, onApprove, onDismiss }: ReviewDrawerProps) {
  const [loading, setLoading] = useState(false);

  const checks = request ?
  [
  { label: 'Uses a hospital email domain', ok: request.domainVerified, detail: request.domain },
  { label: 'Not already on MedKay', ok: true, detail: 'No matching workspace' },
  { label: 'Domain receives email', ok: true, detail: 'Mail records found' }] :

  [];

  const approve = async () => {
    if (!request) return;
    setLoading(true);
    await wait(900);
    setLoading(false);
    onApprove(request);
  };

  return (
    <Drawer
      open={!!request}
      onClose={onClose}
      title="Review request"
      description={request ? `Submitted ${request.requestedOn} through the public form.` : undefined}
      footer={
      request &&
      <>
            <Button variant="secondary" onClick={() => onDismiss(request)}>
              Dismiss
            </Button>
            <Button onClick={approve} loading={loading} disabled={!request.domainVerified}>
              {loading ? 'Onboarding…' : 'Approve & onboard'}
            </Button>
          </>

      }>
      
      {request &&
      <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar name={request.hospitalName} size="lg" />
            <div>
              <p className="font-display text-lg font-semibold text-ink">{request.hospitalName}</p>
              <p className="text-sm text-ink-muted">{request.city}</p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <dt className="text-ink-muted">Requested by</dt>
            <dd className="text-ink">
              {request.contactName}
              <span className="block text-xs text-ink-muted">{request.contactTitle}</span>
            </dd>
            <dt className="text-ink-muted">Email</dt>
            <dd className="break-all text-ink">{request.contactEmail}</dd>
          </dl>

          <blockquote className="border-l-2 border-teal-200 pl-4 text-sm italic leading-relaxed text-ink-muted">“{request.message}”</blockquote>

          <div>
            <h3 className="text-sm font-semibold text-ink">Verification</h3>
            <ul className="mt-3 space-y-2.5">
              {checks.map((c) =>
            <li key={c.label} className="flex items-start gap-3 text-sm">
                  {c.ok ?
              <CircleCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success-600" aria-label="Passed" /> :

              <CircleXIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger-600" aria-label="Failed" />
              }
                  <span>
                    <span className="text-ink">{c.label}</span>
                    <span className="block text-xs text-ink-muted">{c.detail}</span>
                  </span>
                </li>
            )}
            </ul>
          </div>

          {!request.domainVerified &&
        <Callout
          tone="warning"
          title="Can’t onboard with a public email"
          action={
          <Button size="sm" variant="secondary" onClick={() => toast.success('Email sent', { description: `Asked ${request.contactName} for a hospital address.` })}>
                  Ask for one
                </Button>
          }>
          
              Anyone could create a @{request.domain} address, so it can’t decide who joins this hospital.
            </Callout>
        }
        </div>
      }
    </Drawer>);

}