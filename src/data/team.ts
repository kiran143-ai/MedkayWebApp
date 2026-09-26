import type { TeamMember } from '../types/platform';

export const teamMembers: TeamMember[] = [
{ id: 't1', name: 'Sameena Shaik', email: 'sameena.shaik@arohak.com', role: 'Platform admin', lastActive: 'Now', status: 'active', mfa: true },
{ id: 't2', name: 'Arjun Mehta', email: 'arjun.mehta@medkay.ai', role: 'Platform admin', lastActive: '12 min ago', status: 'active', mfa: true },
{ id: 't3', name: 'Priya Nair', email: 'priya.nair@medkay.ai', role: 'Platform support', lastActive: '2 hours ago', status: 'active', mfa: true },
{ id: 't4', name: 'Rahul Verma', email: 'rahul.verma@medkay.ai', role: 'Platform support', lastActive: 'Yesterday', status: 'active', mfa: false },
{ id: 't5', name: 'Kavya Iyer', email: 'kavya.iyer@medkay.ai', role: 'Platform admin', lastActive: '3 days ago', status: 'active', mfa: true },
{ id: 't6', name: 'Farhan Qureshi', email: 'farhan.q@medkay.ai', role: 'Platform support', lastActive: '—', status: 'invited', mfa: false },
{ id: 't7', name: 'Neha Joshi', email: 'neha.joshi@medkay.ai', role: 'Platform support', lastActive: '14 Aug 2026', status: 'disabled', mfa: true }];