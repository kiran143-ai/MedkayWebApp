import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronsLeftIcon, ChevronsRightIcon, LifeBuoyIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../Logo';
import { navGroups } from '../../data/navigation';
import { cn } from '../../utils/cn';

interface SidebarProps {
  collapsed: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
  badges?: Record<string, number>;
}

export function Sidebar({ collapsed, onToggle, onNavigate, badges = {} }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className={cn('flex h-16 shrink-0 items-center border-b border-line', collapsed ? 'justify-center px-2' : 'px-5')}>
        {collapsed ? <Logo markOnly /> : <Logo className="h-10" />}
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) =>
        <div key={group.label} className="mb-5 last:mb-0">
            {!collapsed && <p className="mb-1.5 px-3 text-xs font-medium text-ink-subtle">{group.label}</p>}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
              const badge = badges[item.path];
              return (
                <li key={item.path}>
                    <NavLink
                    to={item.path}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                    cn(
                      'group relative flex h-10 items-center gap-3 rounded-lg text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
                      collapsed ? 'justify-center' : 'px-3',
                      isActive ? 'bg-teal-600 text-white' : 'text-ink-muted hover:bg-canvas hover:text-ink'
                    )
                    }>
                    
                      {({ isActive }) =>
                    <>
                          <item.icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                          {badge ?
                      collapsed ?
                      <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-warning-500 ring-2 ring-white" aria-label={`${badge} waiting`} /> :

                      <span
                        className={cn(
                          'ml-auto rounded-full px-1.5 text-[11px] font-semibold leading-5',
                          isActive ? 'bg-white/20 text-white' : 'bg-warning-50 text-warning-700'
                        )}>
                        
                                {badge}
                              </span> :

                      null}
                        </>
                    }
                    </NavLink>
                  </li>);

            })}
            </ul>
          </div>
        )}
      </nav>

      <div className="shrink-0 border-t border-line p-3">
        {!collapsed &&
        <div className="mb-3 rounded-lg bg-canvas p-3">
            <p className="text-sm font-semibold text-ink">Need help?</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">Our platform team replies within 2 hours on working days.</p>
            <button
            type="button"
            onClick={() => toast.success('Support request opened', { description: 'We’ll email you at sameena.shaik@arohak.com.' })}
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800">
            
              <LifeBuoyIcon className="h-3.5 w-3.5" aria-hidden />
              Contact support
            </button>
          </div>
        }
        {onToggle &&
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cn(
            'flex h-9 w-full items-center gap-2 rounded-lg text-xs font-medium text-ink-subtle transition-colors duration-150 hover:bg-canvas hover:text-ink',
            collapsed ? 'justify-center' : 'px-3'
          )}>
          
            {collapsed ? <ChevronsRightIcon className="h-4 w-4" /> : <ChevronsLeftIcon className="h-4 w-4" />}
            {!collapsed && 'Collapse'}
          </button>
        }
      </div>
    </div>);

}