import React, { useEffect, useState } from 'react';
import { Building2Icon, GlobeIcon, LinkIcon, MailIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Callout } from '../ui/Callout';
import { Drawer } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { domainOf, isEmail, slugify, wait } from '../../utils/format';
import { isPublicDomain } from '../../contexts/HospitalsContext';

interface OnboardDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
}

export function OnboardDrawer({ open, onClose, onSubmit }: OnboardDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{name?: string;email?: string;}>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName('');
      setEmail('');
      setErrors({});
    }
  }, [open]);

  const slug = slugify(name);
  const domain = isEmail(email) ? domainOf(email) : '';

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Enter the hospital’s full name.';
    if (!isEmail(email)) next.email = 'Enter a valid admin email.';else
    if (isPublicDomain(email)) next.email = 'Public email domains can’t vouch for a hospital. Use a hospital address.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await wait(900);
    setLoading(false);
    onSubmit(name.trim(), email.trim());
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Onboard a hospital"
      description="Creates the hospital’s workspace and its own imaging archive, then invites the admin."
      footer={
      <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => submit()} loading={loading}>
            {loading ? 'Creating…' : 'Onboard hospital'}
          </Button>
        </>
      }>
      
      <form onSubmit={submit} noValidate className="space-y-5">
        <Input
          label="Hospital name"
          requiredMark
          icon={<Building2Icon />}
          placeholder="e.g. AIIMS Delhi"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((er) => ({ ...er, name: undefined }));
          }}
          error={errors.name}
          autoFocus />
        
        <Input
          label="Admin email"
          requiredMark
          type="email"
          icon={<MailIcon />}
          placeholder="e.g. admin@aiims.edu"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((er) => ({ ...er, email: undefined }));
          }}
          error={errors.email} />
        

        <div className="rounded-lg border border-line">
          <p className="border-b border-line px-4 py-2.5 text-xs font-medium text-ink-muted">What will be created</p>
          <dl className="divide-y divide-line text-sm">
            <div className="flex items-center gap-3 px-4 py-3">
              <LinkIcon className="h-4 w-4 text-ink-subtle" aria-hidden />
              <dt className="w-28 shrink-0 text-ink-muted">Workspace</dt>
              <dd className="truncate font-mono text-[13px] text-ink">{slug ? `medkay.ai/h/${slug}` : '—'}</dd>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <GlobeIcon className="h-4 w-4 text-ink-subtle" aria-hidden />
              <dt className="w-28 shrink-0 text-ink-muted">Who can join</dt>
              <dd className="truncate text-ink">{domain ? `Anyone with @${domain}` : '—'}</dd>
            </div>
          </dl>
        </div>

        <Callout tone="info">
          The admin’s own address decides which domain may ever join this hospital, so it has to be someone that domain can vouch for.
        </Callout>
      </form>
    </Drawer>);

}