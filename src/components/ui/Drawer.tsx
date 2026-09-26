import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({ open, onClose, title, description, children, footer }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50">
          <motion.div
          className="absolute inset-0 bg-navy-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose} />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-white shadow-pop"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
                {description && <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p>}
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="rounded-lg p-1.5 text-ink-subtle transition-colors duration-150 hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
              
                <XIcon className="h-5 w-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            {footer && <footer className="flex justify-end gap-2 border-t border-line bg-canvas px-6 py-4">{footer}</footer>}
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}