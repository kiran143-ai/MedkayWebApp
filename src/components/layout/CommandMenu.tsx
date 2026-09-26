import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2Icon, CornerDownLeftIcon, SearchIcon, BoxIcon } from "lucide-react";
import { navGroups } from "../../data/navigation";
import { hospitals } from "../../data/hospitals";
import { cn } from "../../utils/cn";
interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
}
interface CommandItem {
  id: string;
  label: string;
  hint: string;
  icon: BoxIcon;
  path: string;
  group: string;
}
const allItems: CommandItem[] = [...navGroups.flatMap((g) => g.items.map((i) => ({
  id: i.path,
  label: i.label,
  hint: i.description,
  icon: i.icon,
  path: i.path,
  group: 'Go to'
}))), ...hospitals.map((h) => ({
  id: h.id,
  label: h.name,
  hint: `${h.city} · ${h.slug}`,
  icon: Building2Icon,
  path: '/hospitals',
  group: 'Hospitals'
}))];
export function CommandMenu({
  open,
  onClose
}: CommandMenuProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? allItems.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q)) : allItems;
  }, [query]);
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);
  useEffect(() => setActive(0), [query]);
  if (!open) return null;
  const select = (item: CommandItem) => {
    navigate(item.path);
    onClose();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      select(results[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };
  let lastGroup = '';
  return <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <div className="absolute inset-0 bg-navy-900/40" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Search" className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-pop">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="h-5 w-5 text-ink-subtle" aria-hidden />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onKeyDown} placeholder="Search pages and hospitals…" aria-label="Search pages and hospitals" className="h-14 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none" />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-ink-subtle">Esc</kbd>
        </div>
        <ul role="listbox" className="max-h-[360px] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-10 text-center text-sm text-ink-muted">No matches for “{query}”</li>}
          {results.map((item, idx) => {
          const showGroup = item.group !== lastGroup;
          lastGroup = item.group;
          return <React.Fragment key={item.id}>
                {showGroup && <li className="px-3 pb-1 pt-2 text-xs font-medium text-ink-subtle">{item.group}</li>}
                <li role="option" aria-selected={idx === active} onMouseEnter={() => setActive(idx)} onClick={() => select(item)} className={cn('flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5', idx === active ? 'bg-teal-50' : '')}>
                  <item.icon className={cn('h-4 w-4', idx === active ? 'text-teal-700' : 'text-ink-subtle')} aria-hidden />
                  <span className="text-sm font-medium text-ink">{item.label}</span>
                  <span className="truncate text-xs text-ink-subtle">{item.hint}</span>
                  {idx === active && <CornerDownLeftIcon className="ml-auto h-3.5 w-3.5 text-teal-700" aria-hidden />}
                </li>
              </React.Fragment>;
        })}
        </ul>
      </div>
    </div>;
}