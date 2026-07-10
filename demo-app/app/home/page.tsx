'use client';

import Link from 'next/link';
import { Home, Eye, Shield, History, ArrowLeft, Wallet, ArrowUpRight, ArrowDownLeft, MoreVertical } from 'lucide-react';

export default function HomePage() {
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
          <NavItem href="/home" icon={<Home className="h-5 w-5" />} label="Home" active />
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="lg:hidden flex items-center gap-2 text-brand hover:text-brand-strong">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-ink">Welcome back</h1>
          </div>
          <p className="text-muted">Hi, there</p>
        </div>

        {/* Welcome Card */}
        <div className="mb-8 fade-up">
          <div className="rounded-2xl border-2 border-brand/30 bg-gradient-to-br from-brand-50 to-brand-100/30 p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-6 w-6 rounded-full bg-brand/20 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-brand" />
              </div>
              <p className="text-sm font-semibold text-brand">Verify your identity</p>
            </div>
            <h2 className="text-2xl font-bold text-ink mb-2">One quick check unlocks buying and selling.</h2>
            <p className="text-muted mb-6">Get verified through DIDIT. A one-time check that lets you buy and sell here and across participating NordStern-powered services.</p>
            <button className="px-6 py-3 rounded-full bg-ink text-canvas font-semibold hover:bg-ink/90 transition-colors inline-flex items-center gap-2">
              Start verification <ArrowDownLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 grid-cols-1 sm:grid-cols-3 fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="card p-6">
            <p className="text-sm text-muted mb-2">Your holdings</p>
            <p className="text-3xl font-bold text-ink">0 MIZU</p>
            <p className="text-xs text-faint mt-1">≈ ₹0.00</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-muted mb-2">This month</p>
            <p className="text-3xl font-bold text-ink">₹0.00</p>
            <p className="text-xs text-faint mt-1">0 completed transactions</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-muted mb-2">Latest rate</p>
            <p className="text-3xl font-bold text-ink">1 MIZU ≈ ₹88.50</p>
            <p className="text-xs text-faint mt-1">Live conversion rate</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-ink mb-4">Get started</h3>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="card p-8 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer group">
              <div className="h-12 w-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
                <ArrowDownLeft className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-ink mb-2">Buy MIZU</h4>
              <p className="text-sm text-muted mb-6">Convert INR to MIZU and receive it in your wallet.</p>
              <p className="text-sm font-medium text-brand group-hover:text-brand-strong transition-colors">Verify to unlock →</p>
            </div>

            <div className="card p-8 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer group">
              <div className="h-12 w-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
                <ArrowUpRight className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-ink mb-2">Sell MIZU</h4>
              <p className="text-sm text-muted mb-6">Convert MIZU back to INR, paid to your bank.</p>
              <p className="text-sm font-medium text-brand group-hover:text-brand-strong transition-colors">Verify to unlock →</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-ink">Recent activity</h3>
            <button className="text-sm text-brand hover:text-brand-strong font-medium">View all</button>
          </div>
          <div className="card p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <Wallet className="h-12 w-12 text-faint/40 mb-3" />
              <p className="font-semibold text-muted mb-1">No transactions yet</p>
              <p className="text-sm text-faint">Your activity will appear here after your first verification.</p>
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
