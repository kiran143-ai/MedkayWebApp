import React from 'react';
import { DatabaseIcon, HeartHandshakeIcon, ShieldCheckIcon } from 'lucide-react';

const HERO_URL = "/00bd696f-a109-4d76-845e-b87dda781e81.jpg";

const promises = [
{ icon: DatabaseIcon, text: 'Each hospital keeps its own archive' },
{ icon: HeartHandshakeIcon, text: 'Studies move only with the patient’s consent' },
{ icon: ShieldCheckIcon, text: 'Every access is recorded' }];


export function AuthHero() {
  return (
    <section className="relative hidden flex-col justify-between overflow-hidden bg-teal-900 p-12 text-white lg:flex lg:w-[52%] xl:p-16">
      <img src={HERO_URL} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-teal-900/75" aria-hidden />

      <div className="relative max-w-lg">
        <p className="text-sm font-medium text-teal-200">India’s AI-ready medical imaging platform</p>
        <h2 className="mt-4 font-display text-[44px] font-bold leading-[1.1] tracking-tight xl:text-5xl">
          Central imaging for <span className="text-teal-300">hospitals</span> that share patients
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
          One ecosystem for PACS connectivity, standardized metadata, governed access and AI workflows — instead of four separate tools.
        </p>
        <ul className="mt-10 space-y-5">
          {promises.map((p) =>
          <li key={p.text} className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-inset ring-white/15">
                <p.icon className="h-5 w-5 text-teal-200" aria-hidden />
              </span>
              <span className="text-[15px] text-white/90">{p.text}</span>
            </li>
          )}
        </ul>
      </div>

      <p className="relative text-sm text-white/60">
        AI by <span className="font-display font-semibold text-white">Cognivance</span>
      </p>
    </section>);

}