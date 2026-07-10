'use client';

import Link from 'next/link';
import { ArrowRight, Home, Eye, Shield, History } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute -bottom-52 -right-52 h-[38rem] w-[38rem]">
        <div className="absolute inset-0 rounded-full border border-brand/25" />
        <div className="absolute inset-[10%] rounded-full border border-brand/20" />
        <div className="absolute inset-[22%] rounded-full border border-brand/15" />
        <div className="absolute inset-[36%] rounded-full bg-brand-100" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold leading-tight text-ink lg:text-5xl">
            Dashboard Redesign Preview
          </h1>
          <p className="mt-3 text-lg text-muted">
            Explore all redesigned pages with landing page aesthetics
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NavCard
            href="/overview"
            icon={<Eye className="h-6 w-6" />}
            title="Overview"
            description="Dashboard overview with KYC card and stats"
          />
          <NavCard
            href="/home"
            icon={<Home className="h-6 w-6" />}
            title="Home"
            description="Welcome screen with holdings and activity"
          />
          <NavCard
            href="/verify"
            icon={<Shield className="h-6 w-6" />}
            title="Verify"
            description="Identity verification flow and process"
          />
          <NavCard
            href="/activity"
            icon={<History className="h-6 w-6" />}
            title="Activity"
            description="Transaction history and details"
          />
        </div>

        {/* Info Box */}
        <div className="mt-12 rounded-2xl border border-line bg-surface p-8">
          <h2 className="text-lg font-semibold text-ink">Design System Applied</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand"></span>
              Soft purple color palette (#ab9ff2, #8b7ee0, #6f5fd6)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand"></span>
              Smooth fade-up animations on load
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand"></span>
              Clean typography with semantic hierarchy
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand"></span>
              Subtle shadows and soft spacing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function NavCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="group fade-up">
      <div className="card flex h-full flex-col p-6 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 flex-1 text-sm text-muted">{description}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand transition-transform group-hover:translate-x-1">
          Explore <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
