import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { AuthHero } from '../components/auth/AuthHero';
import { MagicLinkForm } from '../components/auth/MagicLinkForm';
import { LinkSentState } from '../components/auth/LinkSentState';
import { PasswordForm } from '../components/auth/PasswordForm';
import { RequestAccessForm } from '../components/auth/RequestAccessForm';

type AuthMode = 'magic' | 'sent' | 'password' | 'request';

export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('magic');
  const [email, setEmail] = useState('sameena.shaik@arohak.com');

  const enter = () => navigate('/hospitals');

  return (
    <div className="flex min-h-screen w-full bg-white">
      <AuthHero />
      <main className="flex flex-1 flex-col px-6 py-8 sm:px-12">
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">
            <Logo className="mx-auto mb-10 block h-12" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
                
                {mode === 'magic' &&
                <MagicLinkForm
                  email={email}
                  onEmailChange={setEmail}
                  onSent={() => setMode('sent')}
                  onUsePassword={() => setMode('password')}
                  onRequestAccess={() => setMode('request')} />

                }
                {mode === 'sent' && <LinkSentState email={email} onBack={() => setMode('magic')} onContinue={enter} />}
                {mode === 'password' && <PasswordForm email={email} onEmailChange={setEmail} onBack={() => setMode('magic')} onSuccess={enter} />}
                {mode === 'request' && <RequestAccessForm onBack={() => setMode('magic')} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="text-center text-xs text-ink-subtle">
          Protected under the DPDP Act, 2023. Access is logged. ·{' '}
          <a href="#" className="hover:text-ink-muted">
            Privacy
          </a>
        </p>
      </main>
    </div>);

}