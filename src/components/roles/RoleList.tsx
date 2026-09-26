import React from 'react';
import { LockIcon } from 'lucide-react';
import type { Role } from '../../types/platform';
import { cn } from '../../utils/cn';

interface RoleListProps {
  roles: Role[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function RoleList({ roles, selectedId, onSelect }: RoleListProps) {
  if (roles.length === 0) {
    return <p className="px-4 py-8 text-center text-sm text-ink-muted">No roles in this scope.</p>;
  }
  return (
    <ul className="space-y-1 p-2" role="listbox" aria-label="Roles">
      {roles.map((r) => {
        const active = r.id === selectedId;
        return (
          <li key={r.id}>
            <button
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => onSelect(r.id)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
                active ? 'bg-teal-50' : 'hover:bg-canvas'
              )}>
              
              <div className="min-w-0 flex-1">
                <p className={cn('flex items-center gap-1.5 text-sm font-semibold', active ? 'text-teal-800' : 'text-ink')}>
                  {r.name}
                  {r.system && <LockIcon className="h-3 w-3 text-ink-subtle" aria-label="System role" />}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">{r.description}</p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-ink-subtle">{r.members}</span>
            </button>
          </li>);

      })}
    </ul>);

}