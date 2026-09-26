import React from 'react';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

type CalloutTone = 'info' | 'success' | 'warning' | 'danger';

interface CalloutProps {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const styles: Record<CalloutTone, {wrap: string;icon: string;Icon: typeof InfoIcon;}> = {
  info: { wrap: 'bg-info-50 text-info-700', icon: 'text-info-600', Icon: InfoIcon },
  success: { wrap: 'bg-success-50 text-success-700', icon: 'text-success-600', Icon: CircleCheckIcon },
  warning: { wrap: 'bg-warning-50 text-warning-700', icon: 'text-warning-600', Icon: TriangleAlertIcon },
  danger: { wrap: 'bg-danger-50 text-danger-700', icon: 'text-danger-600', Icon: CircleAlertIcon }
};

export function Callout({ tone = 'info', title, children, action, className }: CalloutProps) {
  const { wrap, icon, Icon } = styles[tone];
  return (
    <div role={tone === 'danger' ? 'alert' : 'status'} className={cn('flex items-start gap-3 rounded-lg px-4 py-3', wrap, className)}>
      <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', icon)} aria-hidden />
      <div className="min-w-0 flex-1 text-sm leading-relaxed">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn(title && 'mt-0.5 opacity-90')}>{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}