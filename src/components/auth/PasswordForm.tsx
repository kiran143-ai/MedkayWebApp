import React, { useState } from 'react';
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { isEmail, wait } from '../../utils/format';

interface PasswordFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onBack: () => void;
  onSuccess: () => void;
}

export function PasswordForm({ email, onEmailChange, onBack, onSuccess }: PasswordFormProps) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = 'Enter a valid work email.';
    if (password.length < 8) next.password = 'Passwords are at least 8 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await wait(900);
    setLoading(false);
    onSuccess();
  };

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden />
        Back to email link
      </button>
      <h1 className="font-display text-[28px] font-bold leading-tight tracking-tight text-navy-700">Sign in with password</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">For shared reading-room workstations without email access.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          icon={<MailIcon />}
          placeholder="name@yourhospital.in"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          error={errors.email} />
        
        <Input
          label="Password"
          type={show ? 'text' : 'password'}
          autoComplete="current-password"
          icon={<LockIcon />}
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          trailing={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="rounded p-1 text-ink-subtle hover:text-ink">
            
              {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          } />
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => toast('Reset link sent', { description: 'If this email is registered, you’ll receive a reset link.' })}
            className="text-sm font-medium text-teal-700 hover:underline">
            
            Forgot password?
          </button>
        </div>
        <Button type="submit" size="lg" fullWidth loading={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>);

}