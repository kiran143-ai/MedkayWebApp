import React, { useState } from 'react';
import { ArrowRightIcon, KeyRoundIcon, MailIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { isEmail, wait } from '../../utils/format';

interface MagicLinkFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSent: () => void;
  onUsePassword: () => void;
  onRequestAccess: () => void;
}

export function MagicLinkForm({ email, onEmailChange, onSent, onUsePassword, onRequestAccess }: MagicLinkFormProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError('Enter the email address your hospital gave you.');
      return;
    }
    setError('');
    setLoading(true);
    await wait(900);
    setLoading(false);
    onSent();
  };

  return (
    <div>
      <h1 className="font-display text-[28px] font-bold leading-tight tracking-tight text-navy-700">Sign in to MedKay AI</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">We’ll email you a one-time link. No password to remember.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          autoFocus
          placeholder="name@yourhospital.in"
          icon={<MailIcon />}
          value={email}
          onChange={(e) => {
            onEmailChange(e.target.value);
            if (error) setError('');
          }}
          error={error} />
        
        <Button type="submit" size="lg" fullWidth loading={loading} rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
          {loading ? 'Sending link…' : 'Email me a sign-in link'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-ink-subtle">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <Button variant="secondary" size="lg" fullWidth leftIcon={<KeyRoundIcon className="h-4 w-4" />} onClick={onUsePassword}>
        Use password instead
      </Button>

      <p className="mt-8 text-center text-sm text-ink-muted">
        New to MedKay?{' '}
        <button type="button" onClick={onRequestAccess} className="font-semibold text-teal-700 underline-offset-4 hover:underline">
          Request access for your hospital
        </button>
      </p>
    </div>);

}