import React from 'react';
import { CheckIcon, LockIcon, MinusIcon } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import type { PermissionGroup, Role } from '../../types/platform';

interface RolePermissionsProps {
  role: Role;
  groups: PermissionGroup[];
  onToggle: (permissionId: string) => void;
}

export function RolePermissions({ role, groups, onToggle }: RolePermissionsProps) {
  const total = groups.reduce((s, g) => s + g.permissions.length, 0);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-line px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">{role.name}</h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">{role.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone={role.scope === 'platform' ? 'navy' : 'teal'}>{role.scope === 'platform' ? 'Platform-wide' : 'Per hospital'}</Badge>
            <Badge>{role.members} people</Badge>
            {role.system ?
            <Badge>
                <LockIcon className="h-3 w-3" aria-hidden />
                System role
              </Badge> :

            <Badge tone="info">Custom</Badge>
            }
          </div>
        </div>
        <p className="shrink-0 text-sm text-ink-muted">
          <span className="font-display text-2xl font-semibold text-ink">{role.permissions.length}</span> of {total} allowed
        </p>
      </div>

      <div className="divide-y divide-line">
        {groups.map((g) =>
        <section key={g.id} className="px-6 py-4">
            <h3 className="mb-2 text-xs font-semibold text-ink-subtle">{g.label}</h3>
            <ul>
              {g.permissions.map((p) => {
              const on = role.permissions.includes(p.id);
              return (
                <li key={p.id} className="flex items-center justify-between gap-4 py-2">
                    <div className="min-w-0">
                      <p className={on ? 'text-sm font-medium text-ink' : 'text-sm text-ink-muted'}>{p.label}</p>
                      <p className="text-xs text-ink-subtle">{p.description}</p>
                    </div>
                    {role.system ?
                  on ?
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-50 text-success-600">
                          <CheckIcon className="h-3.5 w-3.5" aria-label="Allowed" />
                        </span> :

                  <span className="flex h-6 w-6 items-center justify-center text-ink-subtle">
                          <MinusIcon className="h-3.5 w-3.5" aria-label="Not allowed" />
                        </span> :


                  <Switch checked={on} onChange={() => onToggle(p.id)} label={`${p.label} for ${role.name}`} />
                  }
                  </li>);

            })}
            </ul>
          </section>
        )}
      </div>
    </div>);

}