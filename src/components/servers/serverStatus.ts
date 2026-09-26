import type { BadgeTone } from '../ui/Badge';
import type { ServerStatus } from '../../types/platform';

export const serverStatusMeta: Record<ServerStatus, {label: string;tone: BadgeTone;}> = {
  online: { label: 'Online', tone: 'success' },
  degraded: { label: 'Slow', tone: 'warning' },
  offline: { label: 'Offline', tone: 'danger' }
};