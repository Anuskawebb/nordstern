'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownToLine, ArrowUpFromLine, ChevronRight, Calendar,
  Filter, Search, Clock, CheckCircle2, AlertCircle, Loader,
} from 'lucide-react';
import { useCustomer } from '@/components/customer-context';
import { useBrand } from '@/components/brand-context';
import { Card, CardBody, Badge, Skeleton, type Tone } from '@/components/ui';
import { myTransactions, type CustomerTx } from '@/lib/anchor';
import { inr, dateTime } from '@/lib/format';

const PHASE: Record<string, { label: string; tone: Tone; icon: React.ReactNode }> = {
  completed: { label: 'Completed', tone: 'success', icon: <CheckCircle2 className="h-4 w-4" /> },
  awaiting_payment: { label: 'Awaiting payment', tone: 'warning', icon: <Clock className="h-4 w-4" /> },
  payment_received: { label: 'Received', tone: 'info', icon: <CheckCircle2 className="h-4 w-4" /> },
  processing: { label: 'Processing', tone: 'info', icon: <Loader className="h-4 w-4 animate-spin" /> },
  completing: { label: 'Almost done', tone: 'info', icon: <Loader className="h-4 w-4 animate-spin" /> },
  failed: { label: 'Failed', tone: 'danger', icon: <AlertCircle className="h-4 w-4" /> },
  refunded: { label: 'Refunded', tone: 'neutral', icon: <AlertCircle className="h-4 w-4" /> },
};

export default function TransactionsPage() {
  const { customer } = useCustomer();
  const brand = useBrand();
  const [txns, setTxns] = useState<CustomerTx[] | null>(null);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    myTransactions().then(setTxns).catch(() => setTxns([]));
  }, []);

  const filteredTxns = (txns ?? [])
    .filter(t => filter === 'all' || t.kind === filter)
    .filter(t => {
      const query = searchQuery.toLowerCase();
      return (
        t.id.toLowerCase().includes(query) ||
        (t.assetAmount ?? '').toString().includes(query) ||
        (t.inrAmount ?? '').toString().includes(query)
      );
    });

  return (
    <div className="space-y-8 fade-up">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-brand-deep">Activity</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Transactions</h1>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <TransactionStat
          label="Total transactions"
          value={txns === null ? <Skeleton className="h-8 w-20" /> : txns.length}
          icon={<ArrowDownToLine className="h-5 w-5 text-brand-deep" />}
        />
        <TransactionStat
          label="Completed"
          value={txns === null ? <Skeleton className="h-8 w-20" /> : txns.filter(t => t.phase === 'completed').length}
          icon={<CheckCircle2 className="h-5 w-5 text-success" />}
        />
        <TransactionStat
          label="Processing"
          value={txns === null ? <Skeleton className="h-8 w-20" /> : txns.filter(t => t.phase === 'processing' || t.phase === 'completing').length}
          icon={<Clock className="h-5 w-5 text-warning" />}
        />
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-faint pointer-events-none" />
          <input
            type="text"
            placeholder="Search by ID or amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink placeholder:text-faint transition-colors focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30"
          />
        </div>
        <div className="flex gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
          <FilterButton active={filter === 'buy'} onClick={() => setFilter('buy')}>
            <ArrowDownToLine className="h-4 w-4" />
            Buy
          </FilterButton>
          <FilterButton active={filter === 'sell'} onClick={() => setFilter('sell')}>
            <ArrowUpFromLine className="h-4 w-4" />
            Sell
          </FilterButton>
        </div>
      </div>

      {/* Transactions list */}
      <Card>
        {txns === null ? (
          <div className="space-y-px">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 border-b border-line last:border-b-0">
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredTxns.length === 0 ? (
          <CardBody className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/10">
              <Calendar className="h-8 w-8 text-brand-deep" />
            </div>
            <div>
              <p className="font-semibold text-ink text-lg">No transactions found</p>
              <p className="text-sm text-muted mt-1">
                {searchQuery ? 'Try adjusting your search' : 'Your transactions will appear here'}
              </p>
            </div>
          </CardBody>
        ) : (
          <div className="divide-y divide-line">
            {filteredTxns.map((t, idx) => {
              const p = PHASE[t.phase] ?? { label: t.phase, tone: 'neutral' as Tone, icon: null };
              const Icon = t.kind === 'buy' ? ArrowDownToLine : ArrowUpFromLine;
              const iconColor = t.kind === 'buy' ? 'bg-blue-500/12' : 'bg-green-500/12';
              const iconTextColor = t.kind === 'buy' ? 'text-blue-600' : 'text-green-600';
              
              return (
                <Link
                  key={t.id}
                  href={`/transactions/${t.id}`}
                  className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-brand/5 group"
                >
                  {/* Transaction icon */}
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${iconColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${iconTextColor}`} />
                  </div>

                  {/* Transaction details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-ink">
                        {t.kind === 'buy' ? 'Bought' : 'Sold'} {t.assetAmount ?? '—'} {t.assetCode ?? brand.assetCode}
                      </p>
                    </div>
                    <p className="text-xs text-muted">{dateTime(t.createdAt)}</p>
                  </div>

                  {/* Amount and status */}
                  <div className="text-right">
                    <p className="font-semibold text-ink">{inr(t.inrAmount ?? 0)}</p>
                    <Badge tone={p.tone} className="mt-1 inline-flex items-center gap-1">
                      {p.icon}
                      {p.label}
                    </Badge>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="h-4 w-4 text-faint group-hover:text-brand transition-colors" />
                </Link>
              );
            })}
          </div>
        )}
      </Card>

      {/* Pagination info */}
      {filteredTxns.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted px-1">
          <p>Showing {filteredTxns.length} of {txns?.length ?? 0} transactions</p>
          <button className="inline-flex items-center gap-1 font-medium text-brand-deep hover:text-brand-strong transition-colors">
            Load more <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function TransactionStat({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Card>
      <CardBody className="p-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
          <p className="text-2xl font-bold text-ink mt-2">{value}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/12">
          {icon}
        </div>
      </CardBody>
    </Card>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
        active
          ? 'bg-brand text-[var(--color-brand-ink)] shadow-md'
          : 'bg-canvas border border-line text-ink hover:bg-surface'
      }`}
    >
      {children}
    </button>
  );
}
