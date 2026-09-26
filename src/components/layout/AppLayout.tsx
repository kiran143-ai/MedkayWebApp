import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandMenu } from './CommandMenu';
import { useHospitals } from '../../contexts/HospitalsContext';
import { cn } from '../../utils/cn';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { requests } = useHospitals();
  const badges = { '/hospitals': requests.length };

  return (
    <div className="flex min-h-full w-full bg-canvas">
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 border-r border-line transition-[width] duration-200 ease-out lg:block',
          collapsed ? 'w-[72px]' : 'w-64'
        )}>
        
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} badges={badges} />
      </aside>

      <AnimatePresence>
        {mobileOpen &&
        <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
            className="absolute inset-0 bg-navy-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)} />
          
            <motion.div
            className="absolute left-0 top-0 h-full w-72 shadow-pop"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
            
              <Sidebar collapsed={false} onNavigate={() => setMobileOpen(false)} badges={badges} />
            </motion.div>
          </div>
        }
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={() => setMobileOpen(true)} onOpenSearch={() => setSearchOpen(true)} />
        <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      <CommandMenu open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>);

}