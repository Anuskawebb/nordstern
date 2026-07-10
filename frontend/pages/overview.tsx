'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownToLine, ArrowUpFromLine, ChevronRight, TrendingUp,
  Wallet, Sparkles, Lock, ArrowRight, BarChart3, Activity,
} from 'lucide-react';
import { useCustomer } from '@/components/customer-context';
import { useBrand } from '@/components/brand-context';
import { Card, CardBody, Badge, StatTile, SectionHeader, Skeleton, type Tone } from '@/components/ui';
import { myTransactions, getQuote, type CustomerTx } from '@/lib/anchor';
import { customer as customerApi } from '@/lib/customer';
import { getAccount } from '@/lib/api';
import { inr, dateTime } from '@/lib/format';
import { VerificationCard } from '@/components/ecosystem';
import { useRouter } from 'next/navigation';

const PHASE: Record<string, { label: string; tone: Tone }> = {
  completed: { label: 'Completed', tone: 'success' },
  awaiting_payment: { label: 'Awaiting payment', tone: 'warning' },
  payment_received: { label: 'Received', tone: 'info' },
  processing: { label: 'Processing', tone: 'info' },
  completing: { label: 'Almost done', tone: 'info' },
  failed: { label: 'Failed', tone: 'danger' },
  refunded: { label: 'Refunded', tone: 'neutral' },
};

export default function OverviewPage() {
  const { customer } = useCustomer();
  const brand = useBrand();
  const router = useRouter();
  const verified = customer?.kycStatus === 'approved';

  const [txns, setTxns] = useState<CustomerTx[] | null>(null);
  const [rate, setRate] = useState<string | null>(null);
  const [holdings, setHoldings] = useState<string | null>(null);

  useEffect(() => {
    myTransactions().then(setTxns).catch(() => setTxns([]));
    getQuote(1, 'buy').then((q) => setRate(q.inrPerUnit)).catch(() => {});
    customerApi.wallets().then(async (ws) => {
      if (!ws.length) { setHoldings('0'); return; }
      const bals = await Promise.all(ws.map((w) => getAccount(w.address).catch(() => null)));
      const total = bals.reduce((sum, b) => sum + (b?.anch ? Number(b.anch) : 0), 0);
      setHoldings(String(total));
    }).catch(() => setHoldings(null));
  }, []);

  const now = new Date();
  const monthTx = (txns ?? []).filter((t) => {
    if (t.phase !== 'completed' || !t.completedAt) return false;
    const d = new Date(t.completedAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthVolume = monthTx.reduce((s, t) => s + (t.inrAmount ? Number(t.inrAmount) : 0), 0);

  return (
    <div className="space-y-8 fade-up">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-brand-deep">Dashboard</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Overview</h1>
      </div>

      {/* KYC verification card */}
      {!verified && (
        <div className="transform transition-all duration-300 hover:shadow-md">
          <VerificationCard status={customer?.kycStatus ?? 'unverified'} onAction={() => router.push('/verify')} />
        </div>
      )}

      {/* Key metrics grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Your holdings" icon={<Wallet className="h-5 w-5 text-brand-deep" />}
          value={holdings === null ? <Skeleton className="h-8 w-28" /> : `${Number(holdings).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${brand.assetCode}`}
          sub={rate && holdings ? `≈ ${inr(Number(holdings) * Number(rate))}` : `Balance in ${brand.assetCode}`}
        />
        <StatTile
          label="This month" icon={<TrendingUp className="h-5 w-5 text-brand-deep" />}
          value={txns === null ? <Skeleton className="h-8 w-28" /> : inr(monthVolume)}
          sub={`${monthTx.length} completed transactions`}
        />
        <StatTile
          label="Latest rate" icon={<Sparkles className="h-5 w-5 text-brand-deep" />}
          value={rate === null ? <Skeleton className="h-8 w-28" /> : `1 ${brand.assetCode} ≈ ${inr(rate)}`}
          sub="Live conversion rate"
        />
      </div>

      {/* Main content area */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Actions and chart */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick action buttons */}
          <div className="grid gap-4 sm:grid-cols-2">
            <QuickActionCard
              href={verified ? '/buy' : '/verify'} locked={!verified}
              icon={<ArrowDownToLine className="h-6 w-6" />}
              title="Buy"
              description="Purchase assets"
              color="bg-brand"
            />
            <QuickActionCard
              href={verified ? '/sell' : '/verify'} locked={!verified}
              icon={<ArrowUpFromLine className="h-6 w-6" />}
              title="Sell"
              description="Convert to INR"
              color="bg-blue-500"
            />
          </div>

          {/* Analytics / Chart section */}
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/12">
                    <BarChart3 className="h-5 w-5 text-brand-deep" />
                  </div>
                  <h3 className="font-semibold text-ink">Market overview</h3>
                </div>
                <Badge tone="info">Live</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted">Current rate</p>
                    <p className="text-2xl font-bold text-ink mt-1">{rate ? `1 ${brand.assetCode}` : '—'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted">Conversion</p>
                    <p className="text-xl font-bold text-brand-deep">{rate ? `₹${inr(rate)}` : '—'}</p>
                  </div>
                </div>
                
                {/* Placeholder for chart visualization */}
                <div className="bg-surface rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <Activity className="h-8 w-8 text-faint mx-auto mb-2" />
                    <p className="text-sm text-muted">Chart visualization</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right column: Stats and info */}
        <div className="space-y-6">
          {/* Portfolio snapshot */}
          <Card>
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/12">
                  <Wallet className="h-5 w-5 text-brand-deep" />
                </div>
                <h3 className="font-semibold text-ink">Your portfolio</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <p className="text-sm text-muted">Holdings</p>
                  <p className="font-semibold text-ink">
                    {holdings === null ? <Skeleton className="h-5 w-16" /> : `${Number(holdings).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${brand.assetCode}`}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <p className="text-sm text-muted">Approx. value</p>
                  <p className="font-semibold text-ink">
                    {rate && holdings ? inr(Number(holdings) * Number(rate)) : '—'}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted">This month</p>
                  <p className="font-semibold text-success">{inr(monthVolume)}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Verification status */}
          <Card>
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/12">
                  <Lock className="h-5 w-5 text-brand-deep" />
                </div>
                <h3 className="font-semibold text-ink">Account status</h3>
              </div>
              
              <div className="bg-surface rounded-lg p-4">
                <Badge tone={verified ? 'success' : 'warning'}>
                  {verified ? 'Verified' : 'Pending verification'}
                </Badge>
                <p className="text-sm text-muted mt-3">
                  {verified ? 'Your identity has been verified. You can now buy and sell assets.' : 'Complete identity verification to unlock trading features.'}
                </p>
                {!verified && (
                  <Link href="/verify" className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-[var(--color-brand-ink)] transition hover:bg-brand-strong">
                    Verify identity <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ href, icon, title, description, color, locked }: { href: string; icon: React.ReactNode; title: string; description: string; color: string; locked?: boolean }) {
  return (
    <Link href={href} className={`group block rounded-2xl border border-line bg-canvas p-6 transition-all hover:shadow-lg hover:border-brand/40 ${locked ? 'opacity-75 cursor-not-allowed' : ''}`}>
      <div className="flex items-start justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-xl ${color} text-white`}>
          {icon}
        </div>
        {locked && <Lock className="h-4 w-4 text-warning" />}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep group-hover:translate-x-0.5 transition-transform">
        {locked ? 'Verify to unlock' : 'Go'} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
