import React, { useEffect, useState } from 'react';
import { MailIcon, UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { TeamMember } from '../../types/platform';
import { isEmail, wait } from '../../utils/format';

interface InviteDrawerProps {
  open: boolean;
  existingEmails: string[];
  onClose: () => void;
  onInvite: (member: TeamMember) => void;
}

export function InviteDrawer({ open, existingEmails, onClose, onInvite }: InviteDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Platform support');
  const [errors, setErrors] = useState<{name?: string;email?: string;}>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName('');
      setEmail('');
      setRole('Platform support');
      setErrors({});
    }
  }, [open]);

  const submit = async () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Enter their name.';
    if (!isEmail(email)) next.email = 'Enter a valid email.';else
    if (existingEmails.includes(email.trim().toLowerCase())) next.email = 'This person is already on the team.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await wait(800);
    setLoading(false);
    onInvite({ id: `t-${Date.now()}`, name: name.trim(), email: email.trim(), role, lastActive: '—', status: 'invited', mfa: false });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Invite a teammate"
      description="They’ll get a sign-in link and must turn on two-factor before their first session."
      footer={
      <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={loading}>
            {loading ? 'Sending…' : 'Send invite'}
          </Button>
        </>
      }>
      
      <div className="space-y-5">
        <Input label="Full name" icon={<UserIcon />} value={name} onChange={(e) => setName(e.target.value)} error={errors.name} autoFocus />
        <Input label="Email" type="email" icon={<MailIcon />} placeholder="name@medkay.ai" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={[
          { value: 'Platform support', label: 'Platform support — troubleshoot, no patient data' },
          { value: 'Platform admin', label: 'Platform admin — onboard hospitals, manage team' }]
          } />
        
      </div>
    </Drawer>);

}