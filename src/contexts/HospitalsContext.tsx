import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { hospitals as seedHospitals, joinRequests as seedRequests } from '../data/hospitals';
import type { Hospital, HospitalStatus, JoinRequest } from '../types/platform';
import { domainOf, slugify } from '../utils/format';

interface HospitalsContextValue {
  hospitals: Hospital[];
  requests: JoinRequest[];
  approve: (request: JoinRequest) => void;
  dismiss: (request: JoinRequest) => void;
  restoreRequest: (request: JoinRequest) => void;
  onboard: (name: string, adminEmail: string) => Hospital;
  setStatus: (id: string, status: HospitalStatus) => void;
}

const HospitalsContext = createContext<HospitalsContextValue | null>(null);

const today = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date('2026-09-25'));

function createHospital(name: string, adminEmail: string): Hospital {
  return {
    id: `h-${Date.now()}`,
    name,
    slug: slugify(name),
    city: '—',
    people: 1,
    servers: 0,
    studies: 0,
    status: 'setting-up',
    adminEmail,
    onboardedOn: today
  };
}

export function HospitalsProvider({ children }: {children: React.ReactNode;}) {
  const [hospitals, setHospitals] = useState<Hospital[]>(seedHospitals);
  const [requests, setRequests] = useState<JoinRequest[]>(seedRequests);

  const approve = useCallback((request: JoinRequest) => {
    setRequests((rs) => rs.filter((r) => r.id !== request.id));
    setHospitals((hs) => [{ ...createHospital(request.hospitalName, request.contactEmail), city: request.city }, ...hs]);
  }, []);

  const dismiss = useCallback((request: JoinRequest) => {
    setRequests((rs) => rs.filter((r) => r.id !== request.id));
  }, []);

  const restoreRequest = useCallback((request: JoinRequest) => {
    setRequests((rs) => rs.some((r) => r.id === request.id) ? rs : [request, ...rs]);
  }, []);

  const onboard = useCallback((name: string, adminEmail: string) => {
    const hospital = createHospital(name, adminEmail);
    setHospitals((hs) => [hospital, ...hs]);
    return hospital;
  }, []);

  const setStatus = useCallback((id: string, status: HospitalStatus) => {
    setHospitals((hs) => hs.map((h) => h.id === id ? { ...h, status } : h));
  }, []);

  const value = useMemo(
    () => ({ hospitals, requests, approve, dismiss, restoreRequest, onboard, setStatus }),
    [hospitals, requests, approve, dismiss, restoreRequest, onboard, setStatus]
  );

  return <HospitalsContext.Provider value={value}>{children}</HospitalsContext.Provider>;
}

export function useHospitals() {
  const ctx = useContext(HospitalsContext);
  if (!ctx) throw new Error('useHospitals must be used inside HospitalsProvider');
  return ctx;
}

export const PUBLIC_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'rediffmail.com', 'icloud.com'];

export function isPublicDomain(email: string) {
  return PUBLIC_DOMAINS.includes(domainOf(email));
}