import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { BoxIcon } from "lucide-react";
export interface MenuItem {
  label: string;
  icon?: BoxIcon;
  onSelect: () => void;
  danger?: boolean;
}
interface MenuProps {
  label: string;
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  triggerClassName?: string;
  header?: React.ReactNode;
}
export function Menu({
  label,
  trigger,
  items,
  align = 'right',
  triggerClassName,
  header
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return <div ref={ref} className="relative">
      <button type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={cn('rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500', triggerClassName)}>
        {trigger}
      </button>
      <AnimatePresence>
        {open && <motion.div role="menu" initial={{
        opacity: 0,
        scale: 0.96,
        y: -4
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.96,
        y: -4
      }} transition={{
        duration: 0.15,
        ease: [0.23, 1, 0.32, 1]
      }} className={cn('absolute z-40 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-line bg-white p-1 shadow-pop', align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left')}>
            {header}
            {items.map((item) => <button key={item.label} role="menuitem" type="button" onClick={() => {
          setOpen(false);
          item.onSelect();
        }} className={cn('flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150', item.danger ? 'text-danger-600 hover:bg-danger-50' : 'text-ink hover:bg-canvas')}>
                {item.icon && <item.icon className="h-4 w-4 opacity-70" aria-hidden />}
                {item.label}
              </button>)}
          </motion.div>}
      </AnimatePresence>
    </div>;
}