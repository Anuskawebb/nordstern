'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownToLine, ArrowUpFromLine, ChevronRight, Receipt,
  TrendingUp, Wallet, CheckCircle2, ArrowRight, Lock, Sparkles,
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
      {/* Greeting with elegant presentation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-deep">Welcome back</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-ink lg:text-5xl">Hi, {firstName}</h1>
        </div>
        {verified && (
          <div className="flex gap-3">
            <Link href="/buy" className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-brand px-6 text-sm font-semibold text-[var(--color-brand-ink)] transition-all hover:bg-brand-strong hover:shadow-lg">
              <ArrowDownToLine className="h-4 w-4" /> Buy {brand.assetCode}
            </Link>
            <Link href="/sell" className="inline-flex h-12 items-center gap-2.5 rounded-2xl border border-line bg-canvas px-6 text-sm font-semibold text-ink transition-all hover:bg-surface hover:border-brand/30">
              <ArrowUpFromLine className="h-4 w-4" /> Sell
            </Link>
          </div>
        )}
      </div>

      {/* KYC gate — verification card with enhanced design */}
      {!verified && (
        <div className="transform transition-all duration-300 hover:shadow-md">
          <VerificationCard status={customer?.kycStatus ?? 'unverified'} onAction={() => router.push('/verify')} />
        </div>
      )}

      {/* Enhanced stat row with better spacing and typography */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Your holdings" icon={<Wallet className="h-5 w-5 text-brand-deep" />}
          value={holdings === null ? <Skeleton className="h-8 w-28" /> : `${Number(holdings).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${brand.assetCode}`}
          sub={rate && holdings ? `≈ ${inr(Number(holdings) * Number(rate))}` : `Balance in ${brand.assetCode}`}
        />
        <StatTile
          label="This month" icon={<TrendingUp className="h-5 w-5 text-brand-deep" />}
          value={txns === null ? <Skeleton className="h-8 w-28" /> : inr(monthVolume)}
          sub={`${monthTx.length} completed ${monthTx.length === 1 ? 'transaction' : 'transactions'}`}
        />
        <StatTile
          label={`Latest rate`} icon={<Sparkles className="h-5 w-5 text-brand-deep" />}
          value={rate === null ? <Skeleton className="h-8 w-28" /> : `1 ${brand.assetCode} ≈ ${inr(rate)}`}
          sub="Live conversion rate"
        />
      </div>

      {/* Enhanced main grid layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: actions + activity */}
        <div className="space-y-6 lg:col-span-2">
          {/* Action cards with enhanced hover effects */}
          <div className="grid gap-4 sm:grid-cols-2">
            <ActionCard
              href={verified ? '/buy' : '/verify'} locked={!verified}
              icon={<ArrowDownToLine className="h-6 w-6" />}
              title={`Buy ${brand.assetCode}`} desc={`Convert INR to ${brand.assetCode} and receive it in your wallet.`}
              cta="Buy now"
            />
            <ActionCard
              href={verified ? '/sell' : '/verify'} locked={!verified}
              icon={<ArrowUpFromLine className="h-6 w-6" />}
              title={`Sell ${brand.assetCode}`} desc={`Convert ${brand.assetCode} back to INR, paid to your bank.`}
              cta="Sell now"
            />
          </div>

          {/* Recent activity section */}
          <div className="space-y-4">
            <SectionHeader
              title="Recent activity"
              action={<Link href="/transactions" className="flex items-center gap-1 text-sm font-medium text-brand-deep hover:text-brand-strong transition-colors">View all <ChevronRight className="h-4 w-4" /></Link>}
            />
            <Card>
              {txns === null ? (
                <div className="space-y-px">{[0, 1, 2].map((i) => <div key={i} className="p-4"><Skeleton className="h-12 w-full rounded-xl" /></div>)}</div>
              ) : !recent.length ? (
                <CardBody className="flex flex-col items-center gap-3 py-16 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/10">
                    <Receipt className="h-8 w-8 text-brand-deep" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-lg">No transactions yet</p>
                    <p className="max-w-xs text-sm text-muted mt-1">Your activity will appear here after your first {verified ? 'purchase' : 'verification'}.</p>
                  </div>
                  {verified && <Link href="/buy" className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-[var(--color-brand-ink)] transition hover:bg-brand-strong">Buy your first {brand.assetCode} <ArrowRight className="h-4 w-4" /></Link>}
                </CardBody>
              ) : (
                <div className="divide-y divide-line">
                  {recent.map((t) => {
                    const p = PHASE[t.phase] ?? { label: t.phase, tone: 'neutral' as Tone };
                    const Icon = t.kind === 'buy' ? ArrowDownToLine : ArrowUpFromLine;
                    return (
                      <Link key={t.id} href={`/transactions/${t.id}`}
                        className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-brand/5 group">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/12 group-hover:bg-brand/20 transition-colors">
                          <Icon className="h-5 w-5 text-brand-deep" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-ink">{t.kind === 'buy' ? 'Bought' : 'Sold'} {t.assetAmount ?? ''} {t.assetCode ?? brand.assetCode}</p>
                          <p className="text-xs text-muted mt-0.5">{dateTime(t.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-ink">{inr(t.inrAmount)}</p>
                          <Badge tone={p.tone} className="mt-1">{p.label}</Badge>
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
          {/* Get started checklist */}
          <div className="space-y-3">
            <SectionHeader title="Get started" />
            <Card>
              <CardBody className="space-y-1 p-3">
                <Insight done={verified} label="Verify your identity" href="/verify" />
                <Insight done={(txns?.length ?? 0) > 0} label={`Make your first purchase`} href={verified ? '/buy' : '/verify'} />
                <Insight done={(holdings ? Number(holdings) : 0) > 0} label="Hold a balance" href={verified ? '/buy' : '/verify'} />
              </CardBody>
            </Card>
          </div>

          {/* Today's rate card */}
          <Card>
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/12">
                  <Sparkles className="h-5 w-5 text-brand-deep" />
                </div>
                <p className="font-semibold text-ink">Today&apos;s rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-ink">{rate ? `1 ${brand.assetCode}` : '—'}</p>
                <p className="text-sm text-muted mt-1">{rate ? `≈ ${inr(rate)}` : 'Fetching…'}</p>
              </div>
              {verified && <Link href="/buy" className="block mt-4 h-11 w-full flex items-center justify-center gap-2 rounded-xl border border-brand/30 bg-brand/5 text-sm font-semibold text-brand-deep transition-all hover:bg-brand/10 hover:border-brand/50">Buy at this rate <ArrowRight className="h-4 w-4" /></Link>}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ href, icon, title, desc, cta, locked }: { href: string; icon: React.ReactNode; title: string; desc: string; cta: string; locked?: boolean }) {
  return (
    <Link href={href} className="group block rounded-2xl border border-line bg-canvas p-6 transition-all hover:border-brand hover:shadow-lg hover:bg-surface/50">
      <div className="flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/12 group-hover:bg-brand/20 transition-colors text-brand-deep">
          {icon}
        </div>
        {locked && <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-bg px-2.5 py-1.5 text-[11px] font-semibold text-warning"><Lock className="h-3 w-3" /> Verify first</span>}
      </div>
      <p className="mt-4 text-lg font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep group-hover:translate-x-0.5 transition-transform">
        {locked ? 'Verify to unlock' : cta} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function Insight({ done, label, href }: { done: boolean; label: string; href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface/60 group">
      {done
        ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success transition-transform group-hover:scale-110" />
        : <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-line group-hover:border-brand/40" />}
      <span className={`flex-1 text-sm transition-all ${done ? 'text-muted line-through' : 'font-medium text-ink'}`}>{label}</span>
      {!done && <ChevronRight className="h-4 w-4 text-faint group-hover:text-brand transition-colors" />}
    </Link>
  );
}
