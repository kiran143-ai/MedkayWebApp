import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { AppLayout } from './components/layout/AppLayout';
import { HospitalsProvider } from './contexts/HospitalsContext';
import { Login } from './pages/Login';
import { Hospitals } from './pages/Hospitals';
import { ImagingServers } from './pages/ImagingServers';
import { Runtime } from './pages/Runtime';
import { RoleCatalog } from './pages/RoleCatalog';
import { PlatformTeam } from './pages/PlatformTeam';
import { AuditLog } from './pages/AuditLog';
import { DesignSystem } from './pages/DesignSystem';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HospitalsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AppLayout />}>
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/servers" element={<ImagingServers />} />
              <Route path="/runtime" element={<Runtime />} />
              <Route path="/roles" element={<RoleCatalog />} />
              <Route path="/team" element={<PlatformTeam />} />
              <Route path="/audit" element={<AuditLog />} />
              <Route path="/design-system" element={<DesignSystem />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" toastOptions={{ style: { fontFamily: 'Inter, sans-serif', borderRadius: 12 } }} />
      </HospitalsProvider>
    </MotionConfig>);

}