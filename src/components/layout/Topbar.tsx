import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, ChevronDownIcon, LogOutIcon, MenuIcon, PaletteIcon, SearchIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../ui/Avatar';
import { Menu } from '../ui/Menu';

interface TopbarProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
}

export function Topbar({ onOpenMenu, onOpenSearch }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation"
        className="rounded-lg p-2 text-ink-muted hover:bg-canvas lg:hidden">
        
        <MenuIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onOpenSearch}
        className="flex h-10 w-full max-w-md items-center gap-2.5 rounded-lg border border-line bg-canvas px-3 text-left text-sm text-ink-subtle transition-colors duration-150 hover:border-ink-subtle/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
        
        <SearchIcon className="h-4 w-4" aria-hidden />
        <span className="flex-1 truncate">Search hospitals, people, servers…</span>
        <kbd className="hidden rounded border border-line bg-white px-1.5 py-0.5 font-mono text-[11px] text-ink-muted sm:inline">⌘K</kbd>
      </button>

      <div className="ml-auto flex items-center gap-1 sm:gap-3">
        <Menu
          label="Notifications"
          triggerClassName="relative p-2 text-ink-muted hover:bg-canvas hover:text-ink"
          trigger={
          <>
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
            </>
          }
          header={
          <div className="w-72 border-b border-line px-3 pb-2 pt-2">
              <p className="text-sm font-semibold text-ink">Notifications</p>
            </div>
          }
          items={[
          { label: '2 hospitals are waiting for review', onSelect: () => navigate('/hospitals') },
          { label: 'PGI_RAD latency above 500 ms', onSelect: () => navigate('/servers') },
          { label: 'De-identification queue is slow', onSelect: () => navigate('/runtime') }]
          } />
        

        <Menu
          label="Account"
          triggerClassName="flex items-center gap-2.5 p-1 pr-2 hover:bg-canvas"
          trigger={
          <>
              <Avatar name="Sameena Shaik" size="md" className="bg-navy-700 text-white" />
              <span className="hidden text-left md:block">
                <span className="block text-sm font-semibold leading-tight text-ink">Sameena Shaik</span>
                <span className="block text-xs leading-tight text-ink-subtle">Platform admin</span>
              </span>
              <ChevronDownIcon className="hidden h-4 w-4 text-ink-subtle md:block" aria-hidden />
            </>
          }
          header={
          <div className="border-b border-line px-3 pb-2.5 pt-2">
              <p className="text-sm font-semibold text-ink">Sameena Shaik</p>
              <p className="text-xs text-ink-subtle">sameena.shaik@arohak.com</p>
            </div>
          }
          items={[
          { label: 'Profile & security', icon: UserIcon, onSelect: () => toast('Profile settings are coming soon') },
          { label: 'Design system', icon: PaletteIcon, onSelect: () => navigate('/design-system') },
          { label: 'Sign out', icon: LogOutIcon, danger: true, onSelect: () => navigate('/login') }]
          } />
        
      </div>
    </header>);

}