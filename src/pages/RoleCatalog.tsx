import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { RoleList } from '../components/roles/RoleList';
import { RolePermissions } from '../components/roles/RolePermissions';
import { NewRoleDrawer } from '../components/roles/NewRoleDrawer';
import { permissionGroups, roles as seedRoles } from '../data/roles';
import type { Role, RoleScope } from '../types/platform';

type ScopeFilter = 'all' | RoleScope;

export function RoleCatalog() {
  const [roles, setRoles] = useState<Role[]>(seedRoles);
  const [scope, setScope] = useState<ScopeFilter>('all');
  const [selectedId, setSelectedId] = useState(seedRoles[3].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visible = roles.filter((r) => scope === 'all' || r.scope === scope);
  const selected = roles.find((r) => r.id === selectedId) ?? roles[0];

  const toggle = (permissionId: string) => {
    setRoles((rs) =>
    rs.map((r) =>
    r.id === selected.id ?
    {
      ...r,
      permissions: r.permissions.includes(permissionId) ?
      r.permissions.filter((p) => p !== permissionId) :
      [...r.permissions, permissionId]
    } :
    r
    )
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role catalog"
        description="What each role can do. System roles are locked so every hospital means the same thing by “Radiologist”."
        actions={
        <Button leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => setDrawerOpen(true)}>
            New role
          </Button>
        } />
      

      <div className="grid overflow-hidden rounded-xl border border-line bg-white shadow-card lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-line lg:border-b-0 lg:border-r">
          <div className="border-b border-line p-3">
            <SegmentedControl<ScopeFilter>
              label="Filter roles by scope"
              value={scope}
              onChange={setScope}
              options={[
              { value: 'all', label: 'All' },
              { value: 'platform', label: 'Platform' },
              { value: 'hospital', label: 'Hospital' }]
              } />
            
          </div>
          <RoleList roles={visible} selectedId={selected.id} onSelect={setSelectedId} />
        </aside>
        <RolePermissions role={selected} groups={permissionGroups} onToggle={toggle} />
      </div>

      <NewRoleDrawer
        open={drawerOpen}
        roles={roles}
        onClose={() => setDrawerOpen(false)}
        onCreate={(role) => {
          setRoles((rs) => [...rs, role]);
          setSelectedId(role.id);
          setScope('all');
          setDrawerOpen(false);
          toast.success(`${role.name} created`, { description: 'Toggle permissions on the right.' });
        }} />
      
    </div>);

}