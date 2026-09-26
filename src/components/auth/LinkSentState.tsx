import React, { useEffect, useState } from 'react';
import { MailCheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';

interface LinkSentStateProps {
  email: string;
  onBack: () => void;
  onContinue: () => void;
}

export function LinkSentState({ email, onBack, onContinue }: LinkSentStateProps) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <div>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <MailCheckIcon className="h-6 w-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-[28px] font-bold leading-tight tracking-tight text-navy-700">Check your inbox</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        We sent a sign-in link to <span className="font-semibold text-ink">{email}</span>. It works once and expires in 15 minutes.
      </p>

      <div className="mt-8 space-y-3">
        <Button size="lg" fullWidth onClick={onContinue}>
          Open demo workspace
        </Button>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          disabled={seconds > 0}
          onClick={() => {
            setSeconds(30);
            toast.success('New link sent', { description: email });
          }}>
          
          {seconds > 0 ? `Resend link in ${seconds}s` : 'Resend link'}
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-ink-muted">
        Wrong address?{' '}
        <button type="button" onClick={onBack} className="font-semibold text-teal-700 underline-offset-4 hover:underline">
          Use a different email
        </button>
      </p>
    </div>);

}