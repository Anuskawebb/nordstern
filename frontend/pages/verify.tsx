'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ChevronRight, ArrowRight, Loader } from 'lucide-react';
import { useCustomer } from '@/components/customer-context';
import { useBrand } from '@/components/brand-context';
import { Button, Card, CardBody, Badge, Skeleton } from '@/components/ui';
import { BrandMark } from '@/components/brand-mark';
import { NordSternMark, DiditMark, StellarMark, ENVIRONMENT, IS_PRODUCTION } from '@/components/ecosystem';

export default function VerifyPage() {
  const brand = useBrand();
  const router = useRouter();
  const { customer, loading: sessionLoading } = useCustomer();
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle');

  useEffect(() => {
    if (!sessionLoading && !customer) {
      router.replace('/login');
    }
  }, [customer, sessionLoading, router]);

  const handleVerifyClick = async () => {
    setVerificationStatus('processing');
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus('completed');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-canvas py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandMark size={32} />
            <span className="text-lg font-semibold text-ink">{brand.name}</span>
          </div>
          <Badge tone={IS_PRODUCTION ? 'success' : 'info'}>{ENVIRONMENT}</Badge>
        </div>

        {/* Title section */}
        <div className="mb-8">
          <p className="text-sm font-medium text-brand-deep">Security</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">Verify Your Identity</h1>
          <p className="mt-3 text-lg text-muted leading-relaxed">Complete identity verification to unlock buying and selling capabilities on {brand.name}.</p>
        </div>

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column: Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why verify section */}
            <Card>
              <CardBody className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/12">
                    <ShieldCheck className="h-5 w-5 text-brand-deep" />
                  </div>
                  <h2 className="text-lg font-semibold text-ink">Why verify?</h2>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Identity verification ensures regulatory compliance and protects your account. It&apos;s a one-time secure check handled by industry-leading providers.
                </p>
              </CardBody>
            </Card>

            {/* Verification process steps */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-ink px-1">Verification process</h2>
              <VerificationStep
                number={1}
                title="Personal Information"
                description="Provide your name, email, and basic details"
                completed={verificationStatus !== 'idle'}
              />
              <VerificationStep
                number={2}
                title="Document Verification"
                description="Upload a valid ID for identity confirmation"
                completed={verificationStatus === 'completed'}
              />
              <VerificationStep
                number={3}
                title="Liveness Check"
                description="Quick selfie to confirm you match your ID"
                completed={verificationStatus === 'completed'}
              />
            </div>

            {/* Verification button */}
            <Card className="border-brand/30 bg-brand/5">
              <CardBody className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink">Ready to verify?</p>
                  <p className="text-sm text-muted mt-1">Takes approximately 5-10 minutes</p>
                </div>
                <Button
                  onClick={handleVerifyClick}
                  disabled={verificationStatus === 'processing'}
                  className="whitespace-nowrap flex items-center gap-2"
                >
                  {verificationStatus === 'processing' ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : verificationStatus === 'completed' ? (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Verified
                    </>
                  ) : (
                    <>
                      Start verification
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Right column: Info panels */}
          <div className="space-y-6">
            {/* Security info */}
            <Card>
              <CardBody className="p-6 space-y-4">
                <p className="font-semibold text-ink text-sm uppercase tracking-wide text-brand-deep">Security</p>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-deep shrink-0" />
                    <span className="text-muted">Bank-level encryption</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-deep shrink-0" />
                    <span className="text-muted">No data retention</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-deep shrink-0" />
                    <span className="text-muted">Regulatory compliant</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Partners info */}
            <Card>
              <CardBody className="p-6 space-y-4">
                <p className="font-semibold text-ink text-sm uppercase tracking-wide text-brand-deep">Verified by</p>
                <div className="space-y-3">
                  <PartnerInfo label="Identity" mark={<DiditMark />} />
                  <PartnerInfo label="Infrastructure" mark={<NordSternMark className="text-xs" />} />
                  <PartnerInfo label="Settlement" mark={<StellarMark className="text-xs" />} />
                </div>
              </CardBody>
            </Card>

            {/* FAQ section */}
            <Card>
              <CardBody className="p-6 space-y-3">
                <p className="font-semibold text-ink text-sm uppercase tracking-wide text-brand-deep">Questions?</p>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-ink hover:bg-surface transition-colors">
                  How long does it take?
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-ink hover:bg-surface transition-colors">
                  What data is needed?
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-ink hover:bg-surface transition-colors">
                  Is it secure?
                  <ChevronRight className="h-4 w-4" />
                </button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerificationStep({ number, title, description, completed }: { number: number; title: string; description: string; completed: boolean }) {
  return (
    <Card className={`border-line transition-all ${completed ? 'border-success/30 bg-success-bg/20' : ''}`}>
      <CardBody className="p-6 flex items-start gap-4">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-semibold text-sm ${completed ? 'bg-success text-white' : 'bg-brand/12 text-brand-deep'}`}>
          {completed ? '✓' : number}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-ink">{title}</p>
          <p className="text-sm text-muted mt-1">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}

function PartnerInfo({ label, mark }: { label: string; mark: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-line">
      <p className="text-xs font-medium text-muted uppercase tracking-wide">{label}</p>
      <div className="flex justify-center">{mark}</div>
    </div>
  );
}
