'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownToLine, ArrowUpFromLine, ChevronRight, Receipt,
  TrendingUp, Wallet, CheckCircle2, ArrowRight, Lock, Sparkles,
  Zap, Shield, DollarSign,
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

export default function HomePage() {
  const { customer } = useCustomer();
  const brand = useBrand();
  const router = useRouter();
  const firstName = customer?.fullName?.split(' ')[0] || 'there';
  const verified = customer?.kycStatus === 'approved';

  const [txns, setTxns] = useState<CustomerTx[] | null>(null);
  const [rate, setRate] = useState<string | null>(null);
  const [holdings, setHoldings] = useState<string | null>(null);

  useEffect(() => {
    myTransactions().then(setTxns).catch(() => setTxns([]));
    getQuote(1, 'buy').then((q) => setRate(q.inrPerUnit)).catch(() => {});
    // Holdings = the asset balance across the customer's linked wallets.
    customerApi.wallets().then(async (ws) => {
      if (!ws.length) { setHoldings('0'); return; }
      const bals = await Promise.all(ws.map((w) => getAccount(w.address).catch(() => null)));
      const total = bals.reduce((sum, b) => sum + (b?.anch ? Number(b.anch) : 0), 0);
      setHoldings(String(total));
    }).catch(() => setHoldings(null));
  }, []);

  // This-month volume (completed, INR).
  const now = new Date();
  const monthTx = (txns ?? []).filter((t) => {
    if (t.phase !== 'completed' || !t.completedAt) return false;
    const d = new Date(t.completedAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthVolume = monthTx.reduce((s, t) => s + (t.inrAmount ? Number(t.inrAmount) : 0), 0);
  const recent = (txns ?? []).slice(0, 5);

  return (
    <div className="space-y-8 fade-up">
      {/* Greeting with enhanced spacing and typography */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">Welcome back</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">Hi, {firstName}</h1>
          <p className="mt-1.5 text-sm text-muted">Manage your digital assets securely</p>
        </div>
        {verified && (
          <div className="flex gap-3">
            <Link href="/buy" className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105">
              <ArrowDownToLine className="h-4 w-4" /> Buy {brand.assetCode}
            </Link>
            <Link href="/sell" className="inline-flex h-12 items-center gap-2 rounded-2xl border border-purple-200 bg-white px-6 text-sm font-semibold text-ink transition hover:bg-purple-50 hover:border-purple-300">
              <ArrowUpFromLine className="h-4 w-4" /> Sell
            </Link>
          </div>
        )}
      </div>

      {/* KYC gate — verification (by DIDIT, for the NordStern network) comes before anything else */}
      {!verified && (
        <VerificationCard status={customer?.kycStatus ?? 'unverified'} onAction={() => router.push('/verify')} />
      )}

      {/* Stat row with enhanced design */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 transition hover:border-purple-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-100 p-3">
              <Wallet className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-muted">Your holdings</p>
          </div>
          <p className="mt-4 text-2xl font-bold text-ink">
            {holdings === null ? <Skeleton className="h-8 w-32" /> : `${Number(holdings).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${brand.assetCode}`}
          </p>
          <p className="mt-2 text-xs text-muted">{rate && holdings ? `≈ ${inr(Number(holdings) * Number(rate))}` : `Balance in ${brand.assetCode}`}</p>
        </div>

        <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 transition hover:border-purple-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-100 p-3">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-muted">This month</p>
          </div>
          <p className="mt-4 text-2xl font-bold text-ink">
            {txns === null ? <Skeleton className="h-8 w-32" /> : inr(monthVolume)}
          </p>
          <p className="mt-2 text-xs text-muted">{monthTx.length} completed {monthTx.length === 1 ? 'transaction' : 'transactions'}</p>
        </div>

        <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 transition hover:border-purple-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-100 p-3">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-muted">Latest rate</p>
          </div>
          <p className="mt-4 text-2xl font-bold text-ink">
            {rate === null ? <Skeleton className="h-8 w-32" /> : `1 ${brand.assetCode}`}
          </p>
          <p className="mt-2 text-xs text-muted">{rate ? `≈ ${inr(rate)}` : 'Fetching…'}</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: actions + activity */}
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <ActionCard
              href={verified ? '/buy' : '/verify'} locked={!verified}
              icon={<ArrowDownToLine className="h-5 w-5" />}
              title={`Buy ${brand.assetCode}`} desc={`Convert INR to ${brand.assetCode} and receive it in your wallet.`}
              cta="Buy now"
            />
            <ActionCard
              href={verified ? '/sell' : '/verify'} locked={!verified}
              icon={<ArrowUpFromLine className="h-5 w-5" />}
              title={`Sell ${brand.assetCode}`} desc={`Convert ${brand.assetCode} back to INR, paid to your bank.`}
              cta="Sell now"
            />
          </div>

          <div>
            <SectionHeader
              title="Recent activity"
              action={<Link href="/transactions" className="flex items-center text-sm font-medium text-brand-deep hover:underline">View all <ChevronRight className="h-4 w-4" /></Link>}
            />
            <Card>
              {txns === null ? (
                <div className="space-y-px">{[0, 1, 2].map((i) => <div key={i} className="p-4"><Skeleton className="h-10 w-full" /></div>)}</div>
              ) : !recent.length ? (
                <CardBody className="flex flex-col items-center gap-2 py-14 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface"><Receipt className="h-7 w-7 text-faint" /></div>
                  <p className="mt-1 font-medium text-ink">No transactions yet</p>
                  <p className="max-w-xs text-sm text-muted">Your activity will appear here after your first {verified ? 'purchase' : 'verification'}.</p>
                  {verified && <Link href="/buy" className="mt-2 inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-[var(--color-brand-ink)] transition hover:opacity-90">Buy your first {brand.assetCode} <ArrowRight className="h-4 w-4" /></Link>}
                </CardBody>
              ) : (
                <div>
                  {recent.map((t, i) => {
                    const p = PHASE[t.phase] ?? { label: t.phase, tone: 'neutral' as Tone };
                    const Icon = t.kind === 'buy' ? ArrowDownToLine : ArrowUpFromLine;
                    return (
                      <Link key={t.id} href={`/transactions/${t.id}`}
                        className={`flex items-center gap-3 px-4 py-3.5 transition hover:bg-surface/60 ${i > 0 ? 'border-t border-line' : ''}`}>
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/12"><Icon className="h-5 w-5 text-brand-deep" /></div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-ink">{t.kind === 'buy' ? 'Bought' : 'Sold'} {t.assetAmount ?? ''} {t.assetCode ?? brand.assetCode}</p>
                          <p className="text-xs text-muted">{dateTime(t.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-ink">{inr(t.inrAmount)}</p>
                          <Badge tone={p.tone}>{p.label}</Badge>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Right: insights / next steps */}
        <div className="space-y-6">
          <div>
            <SectionHeader title="Get started" />
            <Card><CardBody className="space-y-1 p-2">
              <Insight done={verified} label="Verify your identity" href="/verify" />
              <Insight done={(txns?.length ?? 0) > 0} label={`Make your first purchase`} href={verified ? '/buy' : '/verify'} />
              <Insight done={(holdings ? Number(holdings) : 0) > 0} label="Hold a balance" href={verified ? '/buy' : '/verify'} />
            </CardBody></Card>
          </div>

          <Card><CardBody className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-deep" />
              <p className="text-sm font-semibold text-ink">Today’s rate</p>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-ink">{rate ? `1 ${brand.assetCode}` : '—'}</p>
            <p className="text-sm text-muted">{rate ? `≈ ${inr(rate)}` : 'Fetching…'}</p>
            {verified && <Link href="/buy" className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-ink transition hover:bg-surface">Buy at this rate <ArrowRight className="h-4 w-4" /></Link>}
          </CardBody></Card>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ href, icon, title, desc, cta, locked }: { href: string; icon: React.ReactNode; title: string; desc: string; cta: string; locked?: boolean }) {
  return (
    <Link href={href} className="group block rounded-3xl border border-purple-200 bg-gradient-to-br from-white to-purple-50 p-8 transition hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50">
      <div className="flex items-center justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600">{icon}</div>
        {locked && <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-semibold text-yellow-700"><Lock className="h-3 w-3" /> Verify first</span>}
      </div>
      <p className="mt-6 text-xl font-bold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition group-hover:translate-x-1">
        {locked ? 'Verify to unlock' : cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function Insight({ done, label, href }: { done: boolean; label: string; href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3.5 rounded-2xl px-4 py-3 transition hover:bg-purple-50">
      {done
        ? <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
        : <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-white" />}
      <span className={`flex-1 text-sm ${done ? 'text-muted line-through' : 'font-medium text-ink'}`}>{label}</span>
      {!done && <ChevronRight className="h-4 w-4 text-purple-400" />}
    </Link>
  );
}
