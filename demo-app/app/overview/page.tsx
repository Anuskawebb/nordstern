'use client';

import Link from 'next/link';
import { Home, Eye, Shield, History, ArrowLeft, BarChart3, Wallet, TrendingUp, Lock, Download, Upload } from 'lucide-react';
import { useState } from 'react';

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-canvas">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-screen w-64 border-r border-line bg-surface p-6 hidden lg:flex flex-col">
        <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-semibold text-ink hover:text-brand transition-colors">
          <div className="h-10 w-10 rounded-lg bg-brand/20 flex items-center justify-center">
            <span className="text-brand font-bold">M</span>
          </div>
          Mizu Pay
        </Link>

        <nav className="space-y-2 flex-1">
          <NavItem href="/" icon={<Eye className="h-5 w-5" />} label="Overview" active />
          <NavItem href="/home" icon={<Home className="h-5 w-5" />} label="Home" />
          <NavItem href="/verify" icon={<Shield className="h-5 w-5" />} label="Verify" />
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/" className="lg:hidden flex items-center gap-2 text-brand hover:text-brand-strong">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold text-ink">Overview</h1>
            </div>
            <p className="text-muted">Welcome back, here's your dashboard</p>
          </div>
        </div>

        {/* KYC Card - Premium Style */}
        <div className="mb-8 fade-up">
          <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-50 to-canvas p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-brand/10">
                  <Shield className="h-4 w-4 text-brand" />
                  <span className="text-xs font-semibold text-brand uppercase tracking-wide">Required</span>
                </div>
                <h2 className="text-2xl font-bold text-ink mb-2">Identity Verification</h2>
                <p className="text-muted max-w-2xl">Complete your identity verification to unlock buying and selling. Takes just 2 minutes with secure verification.</p>
              </div>
              <button className="shrink-0 px-6 py-3 rounded-full bg-ink text-canvas font-semibold hover:bg-ink/90 transition-colors">
                Start now
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 grid-cols-1 sm:grid-cols-3 fade-up" style={{ animationDelay: '0.1s' }}>
          <StatCard
            icon={<Wallet className="h-6 w-6" />}
            label="Your Holdings"
            value="0 MIZU"
            subtext="≈ ₹0.00"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            label="This Month"
            value="₹0.00"
            subtext="0 completed transactions"
          />
          <StatCard
            icon={<BarChart3 className="h-6 w-6" />}
            label="Latest Rate"
            value="1 MIZU ≈ ₹88.50"
            subtext="Live conversion rate"
          />
        </div>

        {/* Action Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-ink mb-4">Get Started</h3>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 fade-up" style={{ animationDelay: '0.2s' }}>
            <ActionCard
              icon={<Download className="h-6 w-6" />}
              title="Buy MIZU"
              description="Convert INR to MIZU and receive it in your wallet"
              action="Start buying"
            />
            <ActionCard
              icon={<Upload className="h-6 w-6" />}
              title="Sell MIZU"
              description="Convert MIZU back to INR, paid to your bank"
              action="Start selling"
            />
          </div>
        </div>

        {/* Market Overview */}
        <div className="fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ink">Today's Rate</h3>
              <button className="text-sm text-brand hover:text-brand-strong font-medium">View history</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-line">
                <span className="text-muted">MIZU/INR</span>
                <span className="text-2xl font-bold text-ink">₹88.50</span>
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

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted">{label}</p>
        <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-ink">{value}</p>
      <p className="text-xs text-faint mt-1">{subtext}</p>
    </div>
  );
}

function ActionCard({ icon, title, description, action }: { icon: React.ReactNode; title: string; description: string; action: string }) {
  return (
    <div className="card p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer group">
      <div className="h-12 w-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="font-semibold text-ink mb-1">{title}</h4>
      <p className="text-sm text-muted mb-4">{description}</p>
      <button className="text-sm font-medium text-brand hover:text-brand-strong transition-colors">
        {action} →
      </button>
    </div>
  );
}
