export type HospitalStatus = 'active' | 'setting-up' | 'suspended';

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  city: string;
  people: number;
  servers: number;
  studies: number;
  status: HospitalStatus;
  adminEmail: string;
  onboardedOn: string;
}

export interface JoinRequest {
  id: string;
  hospitalName: string;
  city: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  domain: string;
  requestedOn: string;
  message: string;
  domainVerified: boolean;
}

export type RoleScope = 'platform' | 'hospital';

export interface Permission {
  id: string;
  label: string;
  description: string;
}

export interface PermissionGroup {
  id: string;
  label: string;
  permissions: Permission[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  scope: RoleScope;
  members: number;
  system: boolean;
  permissions: string[];
}

export type MemberStatus = 'active' | 'invited' | 'disabled';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: MemberStatus;
  mfa: boolean;
}

export type ServerStatus = 'online' | 'degraded' | 'offline';

export interface ImagingServer {
  id: string;
  name: string;
  hospital: string;
  aeTitle: string;
  host: string;
  port: number;
  vendor: string;
  modalities: string[];
  status: ServerStatus;
  lastSync: string;
  studiesToday: number;
  latencyMs: number | null;
}

export interface PipelineStage {
  id: string;
  label: string;
  description: string;
  processed: number;
  queued: number;
  failed: number;
  status: 'healthy' | 'slow' | 'failing';
}

export interface ServiceHealth {
  id: string;
  name: string;
  description: string;
  version: string;
  uptime: string;
  p95: string;
  status: 'operational' | 'degraded' | 'down';
}

export interface ThroughputPoint {
  label: string;
  studies: number;
}

export type AuditCategory = 'access' | 'sharing' | 'admin' | 'auth' | 'ai';

export interface AuditEvent {
  id: string;
  day: string;
  time: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  hospital: string;
  category: AuditCategory;
  ip: string;
  detail: string;
  consentId?: string;
}