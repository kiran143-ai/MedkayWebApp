import { ActivityIcon, Building2Icon, PaletteIcon, ScrollTextIcon, ServerIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
{
  label: 'Platform',
  items: [
  { label: 'Hospitals', path: '/hospitals', icon: Building2Icon, description: 'Onboard and manage hospitals' },
  { label: 'Imaging servers', path: '/servers', icon: ServerIcon, description: 'PACS and DICOM connections' },
  { label: 'Runtime', path: '/runtime', icon: ActivityIcon, description: 'Pipeline and service health' }]

},
{
  label: 'Governance',
  items: [
  { label: 'Role catalog', path: '/roles', icon: ShieldCheckIcon, description: 'What each role can do' },
  { label: 'Platform team', path: '/team', icon: UsersIcon, description: 'People who run MedKay' },
  { label: 'Audit log', path: '/audit', icon: ScrollTextIcon, description: 'Every access, recorded' }]

},
{
  label: 'Resources',
  items: [{ label: 'Design system', path: '/design-system', icon: PaletteIcon, description: 'Tokens and components' }]
}];