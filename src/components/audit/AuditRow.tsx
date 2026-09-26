import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuitIcon, ChevronDownIcon, EyeIcon, KeyRoundIcon, SettingsIcon, Share2Icon, BoxIcon } from "lucide-react";
import { AuditCategory, AuditEvent } from "../../types/platform";
import { cn } from "../../utils/cn";
interface AuditRowProps {
  event: AuditEvent;
  expanded: boolean;
  onToggle: () => void;
}
export const auditCategoryMeta: Record<AuditCategory, {
  label: string;
  icon: BoxIcon;
  chip: string;
}> = {
  access: {
    label: 'Access',
    icon: EyeIcon,
    chip: 'bg-info-50 text-info-700'
  },
  sharing: {
    label: 'Sharing',
    icon: Share2Icon,
    chip: 'bg-teal-50 text-teal-700'
  },
  ai: {
    label: 'AI',
    icon: BrainCircuitIcon,
    chip: 'bg-navy-50 text-navy-700'
  },
  admin: {
    label: 'Admin',
    icon: SettingsIcon,
    chip: 'bg-canvas text-ink-muted ring-1 ring-inset ring-line'
  },
  auth: {
    label: 'Sign-in',
    icon: KeyRoundIcon,
    chip: 'bg-warning-50 text-warning-700'
  }
};
export function AuditRow({
  event,
  expanded,
  onToggle
}: AuditRowProps) {
  const meta = auditCategoryMeta[event.category];
  const failed = event.action.toLowerCase().startsWith('failed');
  return <li className="border-b border-line last:border-b-0">
      <button type="button" onClick={onToggle} aria-expanded={expanded} className="grid w-full grid-cols-[48px_32px_1fr_auto] items-center gap-3 px-5 py-3 text-left transition-colors duration-150 hover:bg-canvas/60 focus-visible:bg-canvas focus-visible:outline-none md:grid-cols-[56px_32px_1fr_200px_20px]">
        <span className="font-mono text-xs tabular-nums text-ink-subtle">{event.time}</span>
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', failed ? 'bg-danger-50 text-danger-600' : meta.chip)}>
          <meta.icon className="h-4 w-4" aria-label={meta.label} />
        </span>
        <span className="min-w-0 text-sm">
          <span className="font-semibold text-ink">{event.actor}</span>{' '}
          <span className={failed ? 'font-medium text-danger-600' : 'text-ink-muted'}>{event.action.toLowerCase()}</span>{' '}
          <span className="text-ink">{event.target}</span>
        </span>
        <span className="hidden truncate text-sm text-ink-muted md:block">{event.hospital}</span>
        <ChevronDownIcon className={cn('h-4 w-4 text-ink-subtle transition-transform duration-200 ease-out', expanded && 'rotate-180')} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {expanded && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1]
      }} className="overflow-hidden">
            <div className="mb-3 ml-5 mr-5 rounded-lg bg-canvas px-4 py-3 md:ml-[124px]">
              <p className="text-sm leading-relaxed text-ink">{event.detail}</p>
              <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs">
                <div className="flex gap-1.5">
                  <dt className="text-ink-subtle">Role</dt>
                  <dd className="text-ink-muted">{event.actorRole}</dd>
                </div>
                <div className="flex gap-1.5 md:hidden">
                  <dt className="text-ink-subtle">Hospital</dt>
                  <dd className="text-ink-muted">{event.hospital}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-ink-subtle">IP</dt>
                  <dd className="font-mono text-ink-muted">{event.ip}</dd>
                </div>
                {event.consentId && <div className="flex gap-1.5">
                    <dt className="text-ink-subtle">Consent</dt>
                    <dd className="font-mono text-teal-700">{event.consentId}</dd>
                  </div>}
                <div className="flex gap-1.5">
                  <dt className="text-ink-subtle">Event ID</dt>
                  <dd className="font-mono text-ink-muted">evt_{event.id}_8f2c</dd>
                </div>
              </dl>
            </div>
          </motion.div>}
      </AnimatePresence>
    </li>;
}