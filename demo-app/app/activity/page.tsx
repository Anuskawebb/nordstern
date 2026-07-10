'use client';

import Link from 'next/link';
import { Home, Eye, Shield, History, ArrowLeft, Search, Filter, Download, Upload, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

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
          <NavItem href="/verify" icon={<Shield className="h-5 w-5" />} label="Verify" />
          <NavItem href="/activity" icon={<History className="h-5 w-5" />} label="Activity" active />
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
            <h1 className="text-3xl font-bold text-ink">Transaction History</h1>
          </div>
          <p className="text-muted">Track all your buys, sells, and transfers</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 fade-up">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint pointer-events-none" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-line bg-canvas focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 rounded-lg border border-line bg-canvas focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                <option value="all">All Transactions</option>
                <option value="buy">Buys</option>
                <option value="sell">Sells</option>
                <option value="completed">Completed</option>
              </select>
              <button className="px-4 py-3 rounded-lg border border-line bg-canvas hover:bg-surface transition-colors flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">More</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 fade-up" style={{ animationDelay: '0.1s' }}>
          {/* Transactions List */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              {/* Empty State */}
              <div className="p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-faint/10 flex items-center justify-center">
                    <History className="h-8 w-8 text-faint/40" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">No transactions yet</h3>
                <p className="text-muted mb-6 max-w-sm mx-auto">
                  Your transaction history will appear here once you complete your identity verification and make your first trade.
                </p>
                <Link href="/verify" className="inline-flex px-6 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-strong transition-colors">
                  Start Verification
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <div className="card p-6">
                <p className="text-xs font-medium uppercase text-faint tracking-wide mb-3">Total Transactions</p>
                <p className="text-4xl font-bold text-ink">0</p>
                <p className="text-xs text-muted mt-2">All time</p>
              </div>

              <div className="card p-6">
                <p className="text-xs font-medium uppercase text-faint tracking-wide mb-3">Total Volume</p>
                <p className="text-3xl font-bold text-ink">₹0.00</p>
                <p className="text-xs text-muted mt-2">Bought and sold</p>
              </div>

              <div className="card p-6">
                <p className="text-xs font-medium uppercase text-faint tracking-wide mb-3">Success Rate</p>
                <p className="text-3xl font-bold text-success">100%</p>
                <p className="text-xs text-muted mt-2">All completed</p>
              </div>

              <div className="card p-6 bg-brand/5 border-brand/20">
                <h3 className="font-semibold text-ink mb-3">Transaction Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-muted">Completed: 0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-muted">Pending: 0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-danger" />
                    <span className="text-muted">Failed: 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Tips */}
        <div className="mt-8 fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <TipCard
              icon={<Download className="h-6 w-6" />}
              title="Buy MIZU"
              description="Exchange INR for MIZU directly to your wallet"
            />
            <TipCard
              icon={<Upload className="h-6 w-6" />}
              title="Sell MIZU"
              description="Convert MIZU back to INR with instant settlement"
            />
            <TipCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Track Rates"
              description="Monitor real-time MIZU exchange rates"
            />
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

function TipCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer group">
      <div className="h-12 w-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="font-semibold text-ink mb-2">{title}</h4>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}
