import React, { useState } from 'react';
import { ArrowLeftIcon, Building2Icon, CircleCheckIcon, MailIcon, UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { isEmail, wait } from '../../utils/format';
import { isPublicDomain } from '../../contexts/HospitalsContext';

interface RequestAccessFormProps {
  onBack: () => void;
}

export function RequestAccessForm({ onBack }: RequestAccessFormProps) {
  const [form, setForm] = useState({ hospital: '', name: '', email: '', role: 'radiology' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: '' }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.hospital.trim()) next.hospital = 'Tell us which hospital you’re from.';
    if (!form.name.trim()) next.name = 'Enter your full name.';
    if (!isEmail(form.email)) next.email = 'Enter a valid email.';
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setLoading(true);
    await wait(1000);
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-50 text-success-600">
          <CircleCheckIcon className="h-6 w-6" aria-hidden />
        </span>
        <h1 className="mt-6 font-display text-[28px] font-bold leading-tight tracking-tight text-navy-700">Request received</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          A MedKay platform admin will review <span className="font-semibold text-ink">{form.hospital}</span> within one working day and email{' '}
          <span className="font-semibold text-ink">{form.email}</span>.
        </p>
        <Button variant="secondary" size="lg" fullWidth className="mt-8" onClick={onBack}>
          Back to sign in
        </Button>
      </div>);

  }

  const publicEmail = isEmail(form.email) && isPublicDomain(form.email);

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden />
        Back to sign in
      </button>
      <h1 className="font-display text-[28px] font-bold leading-tight tracking-tight text-navy-700">Bring your hospital to MedKay</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">Nothing is created until our team verifies your hospital.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        <Input label="Hospital name" icon={<Building2Icon />} placeholder="e.g. AIIMS Delhi" value={form.hospital} onChange={update('hospital')} error={errors.hospital} />
        <Input label="Your name" icon={<UserIcon />} placeholder="Dr. Anita Desai" value={form.name} onChange={update('name')} error={errors.name} />
        <Input
          label="Work email"
          type="email"
          icon={<MailIcon />}
          placeholder="name@yourhospital.in"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
          hint={publicEmail ? 'Personal addresses slow down verification — use your hospital email if you can.' : 'Your email domain decides who else can join.'} />
        
        <Select
          label="Your department"
          value={form.role}
          onChange={update('role')}
          options={[
          { value: 'radiology', label: 'Radiology' },
          { value: 'it', label: 'Hospital IT' },
          { value: 'admin', label: 'Administration' },
          { value: 'research', label: 'Research' }]
          } />
        
        <Button type="submit" size="lg" fullWidth loading={loading}>
          {loading ? 'Sending request…' : 'Request access'}
        </Button>
      </form>
    </div>);

}