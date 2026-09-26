import type { PermissionGroup, Role } from '../types/platform';

export const permissionGroups: PermissionGroup[] = [
{
  id: 'studies',
  label: 'Studies',
  permissions: [
  { id: 'studies.view', label: 'View studies', description: 'Open studies in the viewer' },
  { id: 'studies.upload', label: 'Upload studies', description: 'Send new DICOM studies to the archive' },
  { id: 'studies.download', label: 'Download originals', description: 'Export full-fidelity DICOM files' },
  { id: 'studies.delete', label: 'Delete studies', description: 'Permanently remove studies' }]

},
{
  id: 'patients',
  label: 'Patients & consent',
  permissions: [
  { id: 'patients.identify', label: 'See identifiable data', description: 'Names, MRNs and dates of birth' },
  { id: 'consent.record', label: 'Record consent', description: 'Capture a patient’s sharing consent' },
  { id: 'consent.revoke', label: 'Revoke consent', description: 'Withdraw consent on a patient’s behalf' }]

},
{
  id: 'sharing',
  label: 'Sharing',
  permissions: [
  { id: 'share.hospital', label: 'Share with another hospital', description: 'Move studies under consent' },
  { id: 'share.dataset', label: 'Export de-identified datasets', description: 'Build AI-ready research cohorts' }]

},
{
  id: 'ai',
  label: 'AI workflows',
  permissions: [
  { id: 'ai.run', label: 'Run AI models', description: 'Send studies to approved models' },
  { id: 'ai.validate', label: 'Validate AI results', description: 'Accept or reject model findings' }]

},
{
  id: 'admin',
  label: 'Administration',
  permissions: [
  { id: 'admin.users', label: 'Manage people', description: 'Invite, change roles and remove' },
  { id: 'admin.servers', label: 'Manage imaging servers', description: 'Connect and configure PACS' },
  { id: 'admin.audit', label: 'View audit log', description: 'See who accessed what' },
  { id: 'admin.hospitals', label: 'Onboard hospitals', description: 'Approve and create hospitals' }]

}];


export const roles: Role[] = [
{
  id: 'platform-admin',
  name: 'Platform admin',
  description: 'Runs MedKay itself. Onboards hospitals and manages platform-wide settings.',
  scope: 'platform',
  members: 3,
  system: true,
  permissions: ['admin.users', 'admin.servers', 'admin.audit', 'admin.hospitals']
},
{
  id: 'platform-support',
  name: 'Platform support',
  description: 'Helps hospitals troubleshoot connections without seeing patient data.',
  scope: 'platform',
  members: 4,
  system: true,
  permissions: ['admin.servers', 'admin.audit']
},
{
  id: 'hospital-admin',
  name: 'Hospital admin',
  description: 'Manages people and imaging servers inside one hospital.',
  scope: 'hospital',
  members: 11,
  system: true,
  permissions: ['studies.view', 'admin.users', 'admin.servers', 'admin.audit']
},
{
  id: 'radiologist',
  name: 'Radiologist',
  description: 'Reads and reports studies, runs AI and shares under consent.',
  scope: 'hospital',
  members: 68,
  system: true,
  permissions: ['studies.view', 'studies.upload', 'studies.download', 'patients.identify', 'consent.record', 'share.hospital', 'ai.run', 'ai.validate']
},
{
  id: 'technologist',
  name: 'Technologist',
  description: 'Acquires and uploads studies from modalities.',
  scope: 'hospital',
  members: 54,
  system: true,
  permissions: ['studies.view', 'studies.upload', 'patients.identify']
},
{
  id: 'referring-clinician',
  name: 'Referring clinician',
  description: 'Views studies and reports for their own patients.',
  scope: 'hospital',
  members: 37,
  system: true,
  permissions: ['studies.view', 'patients.identify', 'consent.record']
},
{
  id: 'research-analyst',
  name: 'Research analyst',
  description: 'Builds de-identified datasets for model training. Never sees identities.',
  scope: 'hospital',
  members: 5,
  system: false,
  permissions: ['share.dataset', 'ai.run']
}];