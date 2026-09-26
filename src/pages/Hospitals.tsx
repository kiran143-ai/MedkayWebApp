import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { HospitalsSummary } from '../components/hospitals/HospitalsSummary';
import { WaitingQueue } from '../components/hospitals/WaitingQueue';
import { HospitalsTable } from '../components/hospitals/HospitalsTable';
import { OnboardDrawer } from '../components/hospitals/OnboardDrawer';
import { ReviewDrawer } from '../components/hospitals/ReviewDrawer';
import { useHospitals } from '../contexts/HospitalsContext';
import type { JoinRequest } from '../types/platform';

export function Hospitals() {
  const { hospitals, requests, approve, dismiss, restoreRequest, onboard, setStatus } = useHospitals();
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [reviewing, setReviewing] = useState<JoinRequest | null>(null);

  const handleDismiss = (r: JoinRequest) => {
    dismiss(r);
    setReviewing(null);
    toast(`Dismissed ${r.hospitalName}`, { action: { label: 'Undo', onClick: () => restoreRequest(r) } });
  };

  const handleApprove = (r: JoinRequest) => {
    approve(r);
    setReviewing(null);
    toast.success(`${r.hospitalName} onboarded`, { description: `Invite sent to ${r.contactEmail}` });
  };

  const handleOnboard = (name: string, email: string) => {
    onboard(name, email);
    setOnboardOpen(false);
    toast.success(`${name} onboarded`, { description: `Invite sent to ${email}` });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hospitals"
        description="Every hospital on MedKay, its imaging archive, and who is in it."
        actions={
        <Button leftIcon={<PlusIcon className="h-4 w-4" />} onClick={() => setOnboardOpen(true)}>
            Onboard hospital
          </Button>
        } />
      
      <HospitalsSummary hospitals={hospitals} />
      <WaitingQueue requests={requests} onReview={setReviewing} onDismiss={handleDismiss} />
      <HospitalsTable hospitals={hospitals} onSetStatus={setStatus} />

      <OnboardDrawer open={onboardOpen} onClose={() => setOnboardOpen(false)} onSubmit={handleOnboard} />
      <ReviewDrawer request={reviewing} onClose={() => setReviewing(null)} onApprove={handleApprove} onDismiss={handleDismiss} />
    </div>);

}