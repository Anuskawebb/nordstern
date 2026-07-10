'use client';

import Link from 'next/link';
import { Home, Eye, Shield, History, ArrowLeft, Check, ChevronRight, Lock, AlertCircle, Zap, Server } from 'lucide-react';
import { useState } from 'react';

export default function VerifyPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 border-r border-line bg-surface p-6 hidden lg:flex flex-col">
        <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-semibold text-ink hover:text-brand transition-colors">
          <div className="h-10 w-10 rounded-lg bg-brand/20 flex items-center justify-center">
            <span className="text-brand font-bold">M</span>
          </div>
          Mizu Pay
        </Link>

        <nav className="space-y-2 flex-1">
          <NavItem href="/overview" icon={<Eye className="h-5 w-5" />} label="Overview" />
          <NavItem href="/home" icon={<Home className="h-5 w-5" />} label="Home" />
          <NavItem href="/verify" icon={<Shield className="h-5 w-5" />} label="Verify" active />
          <NavItem href="/activity" icon={<History className="h-5 w-5" />} label="Activity" />
        </nav>

        <div className="rounded-xl border border-line bg-canvas p-4">
          <p className="text-xs font-medium uppercase text-faint tracking-wide">Account</p>
          <p className="mt-2 text-sm text-muted truncate">user@email.com</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="lg:hidden flex items-center gap-2 text-brand hover:text-brand-strong">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-ink">Identity Verification</h1>
          </div>
          <p className="text-muted">Complete your verification to unlock trading</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 fade-up">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <StepCard
              number={1}
              title="Personal Details"
              description="Enter your basic information"
              active={step === 1}
              completed={step > 1}
            />
            <StepCard
              number={2}
              title="Document Upload"
              description="Verify your identity document"
              active={step === 2}
              completed={step > 2}
            />
            <StepCard
              number={3}
              title="Face Verification"
              description="Confirm your identity with a selfie"
              active={step === 3}
              completed={step > 3}
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 fade-up" style={{ animationDelay: '0.1s' }}>
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step Content */}
            <div className="card p-8 mb-8">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-ink mb-4">Personal Details</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-lg border border-line bg-canvas focus:outline-none focus:ring-2 focus:ring-brand/30"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">Date of Birth</label>
                        <input type="date" className="w-full px-4 py-3 rounded-lg border border-line bg-canvas focus:outline-none focus:ring-2 focus:ring-brand/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">Gender</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-line bg-canvas focus:outline-none focus:ring-2 focus:ring-brand/30">
                          <option>Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full px-6 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-strong transition-colors"
                    >
                      Continue
                    </button>
                  </form>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-ink mb-4">Upload Identity Document</h2>
                  <div className="rounded-lg border-2 border-dashed border-line p-8 text-center bg-surface mb-6">
                    <Lock className="h-12 w-12 text-faint/40 mx-auto mb-3" />
                    <p className="font-semibold text-ink mb-1">Upload your document</p>
                    <p className="text-sm text-muted mb-4">Passport, Aadhar, or Driving License</p>
                    <button className="px-6 py-2 rounded-lg bg-brand text-white font-medium hover:bg-brand-strong transition-colors">
                      Choose file
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 rounded-lg border border-line text-ink font-semibold hover:bg-surface transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 px-6 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-strong transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-ink mb-4">Face Verification</h2>
                  <div className="rounded-lg border-2 border-dashed border-line p-12 text-center bg-surface mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-brand/30 flex items-center justify-center">
                      <Shield className="h-16 w-16 text-faint/40" />
                    </div>
                    <p className="font-semibold text-ink mb-1">Ready to verify?</p>
                    <p className="text-sm text-muted mb-4">We'll use your camera to confirm your identity</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 px-6 py-3 rounded-lg border border-line text-ink font-semibold hover:bg-surface transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="flex-1 px-6 py-3 rounded-lg bg-success text-white font-semibold hover:bg-success/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="h-5 w-5" />
                      Verification Complete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="card p-6 mb-6">
              <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-info-bg">
                <AlertCircle className="h-5 w-5 text-info shrink-0" />
                <p className="text-sm text-info">Handled securely by DIDIT</p>
              </div>
              <p className="text-xs text-faint">Your data is encrypted and verified through industry-leading security providers.</p>
            </div>

            <div className="space-y-4">
              <div className="card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center text-info">
                    <Lock className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-sm text-ink">Secure Identity</p>
                </div>
                <p className="text-xs text-muted">Verified through DIDIT</p>
              </div>

              <div className="card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
                    <Zap className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-sm text-ink">Fast Settlements</p>
                </div>
                <p className="text-xs text-muted">Powered by Stellar</p>
              </div>

              <div className="card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                    <Server className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-sm text-ink">Trusted Infrastructure</p>
                </div>
                <p className="text-xs text-muted">Provisioned by NordStern</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
      active
        ? 'bg-brand/10 text-brand font-medium'
        : 'text-muted hover:text-ink hover:bg-surface-2'
    }`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function StepCard({ number, title, description, active, completed }: { number: number; title: string; description: string; active: boolean; completed: boolean }) {
  return (
    <div className={`card p-4 transition-all ${active ? 'ring-2 ring-brand border-brand/30' : completed ? 'bg-success/5 border-success/30' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          completed
            ? 'bg-success text-white'
            : active
              ? 'bg-brand text-white'
              : 'bg-surface-2 text-muted'
        }`}>
          {completed ? <Check className="h-4 w-4" /> : number}
        </div>
        <h3 className={`font-semibold ${active || completed ? 'text-ink' : 'text-muted'}`}>{title}</h3>
      </div>
      <p className="text-xs text-faint ml-11">{description}</p>
    </div>
  );
}
