import React, { useMemo, useState } from 'react';
import { BanIcon, CheckIcon, EllipsisIcon as MoreHorizontalIcon, RotateCcwIcon, SendIcon, ShieldIcon, UserPlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import type { BadgeTone } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Callout } from '../components/ui/Callout';
import { Menu } from '../components/ui/Menu';
import type { MenuItem } from '../components/ui/Menu';
import { PageHeader } from '../components/ui/PageHeader';
import { Panel } from '../components/ui/Panel';
import { SearchInput } from '../components/ui/SearchInput';
import { Table, Td, Th } from '../components/ui/Table';
import { InviteDrawer } from '../components/team/InviteDrawer';
import { teamMembers } from '../data/team';
import type { MemberStatus, TeamMember } from '../types/platform';

const statusMeta: Record<MemberStatus, {label: string;tone: BadgeTone;}> = {
  active: { label: 'Active', tone: 'success' },
  invited: { label: 'Invited', tone: 'info' },
  disabled: { label: 'Disabled', tone: 'neutral' }
};

export function PlatformTeam() {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const update = (id: string, patch: Partial<TeamMember>) => setMembers((ms) => ms.map((m) => m.id === id ? { ...m, ...patch } : m));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => !q || `${m.name} ${m.email} ${m.role}`.toLowerCase().includes(q));
  }, [members, query]);

  const withoutMfa = members.filter((m) => m.status === 'active' && !m.mfa);

  const actionsFor = (m: TeamMember): MenuItem[] => {
    const otherRole = m.role === 'Platform admin' ? 'Platform support' : 'Platform admin';
    const items: MenuItem[] = [
    {
      label: `Make ${otherRole.toLowerCase()}`,
      icon: ShieldIcon,
      onSelect: () => {
        update(m.id, { role: otherRole });
        toast.success(`${m.name} is now ${otherRole.toLowerCase()}`);
      }
    }];

    if (m.status === 'invited') items.push({ label: 'Resend invite', icon: SendIcon, onSelect: () => toast.success('Invite resent', { description: m.email }) });
    if (m.status === 'disabled') {
      items.push({ label: 'Re-enable', icon: RotateCcwIcon, onSelect: () => update(m.id, { status: 'active' }) });
    } else if (m.name !== 'Sameena Shaik') {
      items.push({
        label: 'Disable access',
        icon: BanIcon,
        danger: true,
        onSelect: () => {
          const prev = m.status;
          update(m.id, { status: 'disabled' });
          toast(`${m.name} disabled`, { action: { label: 'Undo', onClick: () => update(m.id, { status: prev }) } });
        }
      });
    }
    return items;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform team"
        description="People who run MedKay. They manage hospitals and connections, and never see patient data unless a hospital grants it."
        actions={
        <Button leftIcon={<UserPlusIcon className="h-4 w-4" />} onClick={() => setDrawerOpen(true)}>
            Invite teammate
          </Button>
        } />
      

      {withoutMfa.length > 0 &&
      <Callout
        tone="warning"
        title={`${withoutMfa.map((m) => m.name).join(', ')} hasn’t turned on two-factor`}
        action={
        <Button size="sm" variant="secondary" onClick={() => toast.success('Reminder sent')}>
              Send reminder
            </Button>
        }>
        
          Two-factor will be required for all platform staff from 1 Oct 2026.
        </Callout>
      }

      <Panel
        title={`${members.filter((m) => m.status !== 'disabled').length} people`}
        actions={<SearchInput value={query} onChange={setQuery} placeholder="Search people…" label="Search team" className="w-full sm:w-64" />}>
        
        <Table>
          <thead>
            <tr>
              <Th>Person</Th>
              <Th>Role</Th>
              <Th>Two-factor</Th>
              <Th>Last active</Th>
              <Th>Status</Th>
              <Th>
                <span className="sr-only">Actions</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 &&
            <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-ink-muted">
                  No one matches “{query}”.
                </td>
              </tr>
            }
            {rows.map((m) =>
            <tr key={m.id} className={m.status === 'disabled' ? 'opacity-60' : 'transition-colors duration-150 hover:bg-canvas/60'}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} />
                    <div>
                      <p className="font-semibold text-ink">
                        {m.name}
                        {m.name === 'Sameena Shaik' && <span className="ml-1.5 text-xs font-normal text-ink-subtle">(you)</span>}
                      </p>
                      <p className="text-xs text-ink-muted">{m.email}</p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <Badge tone={m.role === 'Platform admin' ? 'navy' : 'neutral'}>{m.role}</Badge>
                </Td>
                <Td>
                  {m.mfa ?
                <span className="inline-flex items-center gap-1.5 text-sm text-success-700">
                      <CheckIcon className="h-4 w-4" aria-hidden /> On
                    </span> :

                <span className="text-sm text-ink-subtle">Off</span>
                }
                </Td>
                <Td className="text-ink-muted">{m.lastActive}</Td>
                <Td>
                  <Badge tone={statusMeta[m.status].tone} dot>
                    {statusMeta[m.status].label}
                  </Badge>
                </Td>
                <Td align="right">
                  <Menu
                  label={`Actions for ${m.name}`}
                  triggerClassName="p-1.5 text-ink-subtle hover:bg-white hover:text-ink"
                  trigger={<MoreHorizontalIcon className="h-4 w-4" />}
                  items={actionsFor(m)} />
                
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </Panel>

      <InviteDrawer
        open={drawerOpen}
        existingEmails={members.map((m) => m.email.toLowerCase())}
        onClose={() => setDrawerOpen(false)}
        onInvite={(m) => {
          setMembers((ms) => [...ms, m]);
          setDrawerOpen(false);
          toast.success(`Invite sent to ${m.email}`);
        }} />
      
    </div>);

}