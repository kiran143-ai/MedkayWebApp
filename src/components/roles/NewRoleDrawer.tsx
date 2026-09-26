import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { Role, RoleScope } from '../../types/platform';
import { slugify } from '../../utils/format';

interface NewRoleDrawerProps {
  open: boolean;
  roles: Role[];
  onClose: () => void;
  onCreate: (role: Role) => void;
}

export function NewRoleDrawer({ open, roles, onClose, onCreate }: NewRoleDrawerProps) {
  const [name, setName] = useState('');
  const [scope, setScope] = useState<RoleScope>('hospital');
  const [baseId, setBaseId] = useState('none');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setScope('hospital');
      setBaseId('none');
      setError('');
    }
  }, [open]);

  const submit = () => {
    if (!name.trim()) return setError('Name the role after what people do, e.g. “Night-shift reader”.');
    if (roles.some((r) => r.name.toLowerCase() === name.trim().toLowerCase())) return setError('A role with this name already exists.');
    const base = roles.find((r) => r.id === baseId);
    onCreate({
      id: `${slugify(name)}-${Date.now()}`,
      name: name.trim(),
      description: base ? `Custom role based on ${base.name}.` : 'Custom role.',
      scope,
      members: 0,
      system: false,
      permissions: base ? [...base.permissions] : []
    });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="New custom role"
      description="Start from an existing role and adjust permissions after creating it."
      footer={
      <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>Create role</Button>
        </>
      }>
      
      <div className="space-y-5">
        <Input
          label="Role name"
          placeholder="e.g. Teleradiology reader"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          error={error}
          autoFocus />
        
        <Select
          label="Scope"
          value={scope}
          onChange={(e) => setScope(e.target.value as RoleScope)}
          options={[
          { value: 'hospital', label: 'Per hospital — granted inside one hospital' },
          { value: 'platform', label: 'Platform-wide — MedKay staff only' }]
          } />
        
        <Select
          label="Start from"
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
          options={[{ value: 'none', label: 'No permissions' }, ...roles.map((r) => ({ value: r.id, label: r.name }))]} />
        
      </div>
    </Drawer>);

}