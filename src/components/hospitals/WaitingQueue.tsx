import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCheckIcon, ShieldAlertIcon, ShieldCheckIcon } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import type { JoinRequest } from '../../types/platform';

interface WaitingQueueProps {
  requests: JoinRequest[];
  onReview: (request: JoinRequest) => void;
  onDismiss: (request: JoinRequest) => void;
}

export function WaitingQueue({ requests, onReview, onDismiss }: WaitingQueueProps) {
  return (
    <Panel
      title={
      <span className="flex items-center gap-2">
          Waiting for review
          {requests.length > 0 && <Badge tone="warning">{requests.length}</Badge>}
        </span>
      }
      description="Asked to join through the public form. Nothing is created until you review and onboard them."
      className={requests.length ? 'border-warning-500/30' : undefined}>
      
      {requests.length === 0 ?
      <div className="flex items-center gap-3 border-t border-line px-5 py-6 text-sm text-ink-muted">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-50 text-success-600">
            <CheckCheckIcon className="h-4 w-4" aria-hidden />
          </span>
          You’re all caught up. New requests will appear here.
        </div> :

      <ul className="border-t border-line">
          <AnimatePresence initial={false}>
            {requests.map((r) =>
          <motion.li
            key={r.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-b border-line last:border-b-0">
            
                <div className="grid items-center gap-4 px-5 py-4 md:grid-cols-[1.4fr_1.6fr_1fr_auto]">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={r.hospitalName} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{r.hospitalName}</p>
                      <p className="text-xs text-ink-muted">
                        {r.city} · {r.requestedOn}
                      </p>
                    </div>
                  </div>
                  <div className="min-w-0 text-sm">
                    <p className="truncate text-ink">{r.contactName}</p>
                    <p className="truncate text-xs text-ink-muted">{r.contactEmail}</p>
                  </div>
                  <div>
                    {r.domainVerified ?
                <Badge tone="success">
                        <ShieldCheckIcon className="h-3 w-3" aria-hidden />
                        {r.domain}
                      </Badge> :

                <Badge tone="warning">
                        <ShieldAlertIcon className="h-3 w-3" aria-hidden />
                        Public email
                      </Badge>
                }
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => onReview(r)}>
                      Review
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onDismiss(r)}>
                      Dismiss
                    </Button>
                  </div>
                </div>
              </motion.li>
          )}
          </AnimatePresence>
        </ul>
      }
    </Panel>);

}