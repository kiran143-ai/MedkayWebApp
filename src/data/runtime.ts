import type { PipelineStage, ServiceHealth, ThroughputPoint } from '../types/platform';

export const pipelineStages: PipelineStage[] = [
{ id: 'ingest', label: 'Ingest', description: 'DICOM received from hospital PACS', processed: 1198, queued: 14, failed: 0, status: 'healthy' },
{ id: 'normalize', label: 'Standardize metadata', description: 'Tags mapped to the MedKay schema', processed: 1184, queued: 22, failed: 3, status: 'healthy' },
{ id: 'deid', label: 'De-identify', description: 'PHI removed for research copies', processed: 1159, queued: 186, failed: 0, status: 'slow' },
{ id: 'ai', label: 'AI inference', description: 'Approved models run on eligible studies', processed: 742, queued: 41, failed: 7, status: 'healthy' },
{ id: 'archive', label: 'Archive', description: 'Stored in the hospital’s own archive', processed: 1181, queued: 3, failed: 0, status: 'healthy' }];


export const services: ServiceHealth[] = [
{ id: 'dicom-gw', name: 'DICOM gateway', description: 'C-STORE / C-FIND listener', version: '2.8.1', uptime: '99.99%', p95: '42 ms', status: 'operational' },
{ id: 'dicomweb', name: 'DICOMweb API', description: 'QIDO, WADO and STOW endpoints', version: '1.14.0', uptime: '99.97%', p95: '118 ms', status: 'operational' },
{ id: 'deid', name: 'De-identification workers', description: 'PHI scrubbing and pixel redaction', version: '0.9.6', uptime: '99.62%', p95: '2.4 s', status: 'degraded' },
{ id: 'consent', name: 'Consent service', description: 'Checks consent before any study moves', version: '1.3.2', uptime: '100%', p95: '18 ms', status: 'operational' },
{ id: 'ai-runner', name: 'AI model runner', description: 'GPU inference for approved models', version: '3.1.0', uptime: '99.91%', p95: '6.1 s', status: 'operational' },
{ id: 'audit', name: 'Audit ledger', description: 'Immutable access records', version: '1.0.8', uptime: '100%', p95: '9 ms', status: 'operational' }];


export const throughput1h: ThroughputPoint[] = [
{ label: '13:05', studies: 18 }, { label: '13:10', studies: 22 }, { label: '13:15', studies: 19 }, { label: '13:20', studies: 27 },
{ label: '13:25', studies: 31 }, { label: '13:30', studies: 24 }, { label: '13:35', studies: 29 }, { label: '13:40', studies: 35 },
{ label: '13:45', studies: 33 }, { label: '13:50', studies: 26 }, { label: '13:55', studies: 30 }, { label: '14:00', studies: 34 }];


export const throughput24h: ThroughputPoint[] = [
{ label: '00:00', studies: 42 }, { label: '02:00', studies: 28 }, { label: '04:00', studies: 19 }, { label: '06:00', studies: 36 },
{ label: '08:00', studies: 118 }, { label: '10:00', studies: 204 }, { label: '12:00', studies: 236 }, { label: '14:00', studies: 251 },
{ label: '16:00', studies: 222 }, { label: '18:00', studies: 164 }, { label: '20:00', studies: 97 }, { label: '22:00', studies: 61 }];


export const throughput7d: ThroughputPoint[] = [
{ label: 'Fri', studies: 1284 }, { label: 'Sat', studies: 902 }, { label: 'Sun', studies: 611 }, { label: 'Mon', studies: 1412 },
{ label: 'Tue', studies: 1506 }, { label: 'Wed', studies: 1458 }, { label: 'Thu', studies: 1398 }];