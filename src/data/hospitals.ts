import type { Hospital, JoinRequest } from '../types/platform';

export const hospitals: Hospital[] = [
{ id: 'h1', name: 'AIIMS Delhi', slug: 'aiims-delhi', city: 'New Delhi', people: 42, servers: 4, studies: 812400, status: 'active', adminEmail: 'admin@aiims.edu', onboardedOn: '12 Jan 2026' },
{ id: 'h2', name: 'PGIMER Chandigarh', slug: 'pgimer-chandigarh', city: 'Chandigarh', people: 31, servers: 3, studies: 524100, status: 'active', adminEmail: 'it@pgimer.edu.in', onboardedOn: '03 Feb 2026' },
{ id: 'h3', name: 'CMC Vellore', slug: 'cmc-vellore', city: 'Vellore', people: 38, servers: 5, studies: 640900, status: 'active', adminEmail: 'radiology@cmcvellore.ac.in', onboardedOn: '21 Mar 2026' },
{ id: 'h4', name: 'Tata Memorial Hospital', slug: 'tata-memorial', city: 'Mumbai', people: 27, servers: 3, studies: 298300, status: 'active', adminEmail: 'pacs@tmc.gov.in', onboardedOn: '08 May 2026' },
{ id: 'h5', name: 'NIMHANS', slug: 'nimhans', city: 'Bengaluru', people: 6, servers: 1, studies: 0, status: 'setting-up', adminEmail: 'imaging@nimhans.ac.in', onboardedOn: '19 Sep 2026' },
{ id: 'h6', name: 'KEM Hospital', slug: 'kem-mumbai', city: 'Mumbai', people: 9, servers: 2, studies: 88200, status: 'suspended', adminEmail: 'it@kem.edu', onboardedOn: '14 Jun 2026' }];


export const joinRequests: JoinRequest[] = [
{
  id: 'r1',
  hospitalName: 'Arohak Diagnostics',
  city: 'Hyderabad',
  contactName: 'Dr. Vikram Rao',
  contactTitle: 'Head of Radiology',
  contactEmail: 'vikram.rao@arohak.com',
  domain: 'arohak.com',
  requestedOn: '24 Sep 2026',
  message: 'We run 3 CT and 2 MRI units and refer oncology patients to Tata Memorial. We want to share studies with consent instead of burning CDs.',
  domainVerified: true
},
{
  id: 'r2',
  hospitalName: 'Sanjeevani Multispeciality',
  city: 'Pune',
  contactName: 'Dr. Ramesh Kulkarni',
  contactTitle: 'Medical Director',
  contactEmail: 'ramesh.k@gmail.com',
  domain: 'gmail.com',
  requestedOn: '23 Sep 2026',
  message: 'Looking to connect our Orthanc PACS and try AI chest X-ray triage.',
  domainVerified: false
}];