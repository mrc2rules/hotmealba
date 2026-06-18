import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { orders, type OrderStatus } from "@/data/orders";
import { SectionHeading } from "@/components/stamp";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Search } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Seller Desk · Hot Meal Bar" },
      { name: "description", content: "Seller dashboard for Hot Meal Bar — manage 200+ delivery records, settlement and tracking." },
      { property: "og:title", content: "Seller Desk · Hot Meal Bar" },
      { property: "og:description", content: "Seller dashboard for Hot Meal Bar — manage 200+ delivery records, settlement and tracking." },
    ],
  }),
  component: OrdersPage,
});

const STATUSES: ("All" | OrderStatus)[] = ["All", "Placed", "Packed", "Out for Delivery", "Delivered", "Cancelled"];

function OrdersPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [campus, setCampus] = useState<"All" | "KTF" | "Alumni" | "KTC" | "KTHO" | "KTR">("All");

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (status !== "All" && o.status !== status) return false;
      if (campus !== "All" && o.campus !== campus) return false;
      if (q) {
        const s = q.toUpperCase();
        if (!o.id.includes(s) && !o.deliveryId.includes(s) && !o.customer.toUpperCase().includes(s)) return false;
      }
      return true;
    });
  }, [q, status, campus]);

  const settled = filtered.filter(o => o.status === "Delivered");
  const settlementTotal = settled.reduce((a, b) => a + b.total, 0);
  const commission = Math.round(settlementTotal * 0.15);

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-12">
      <SectionHeading eyebrow="Admin Desk" script="the" title="ORDER LEDGER" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Stat label="All orders" value={orders.length} />
        <Stat label="In view" value={filtered.length} />
        <Stat label="Settled (RM)" value={settlementTotal} tone="teal" />
        <Stat label="Commission (15%)" value={commission} tone="sienna" />
      </div>

      <div className="paper-card p-4 mb-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search by order #, delivery ID, or customer…"
            className="w-full pl-10 pr-3 py-2 h-11 text-base border-2 border-ink/25 bg-paper/60 font-mono text-ink focus:outline-none focus:border-sienna"
          />
        </div>
        <select className="border-2 border-ink/25 bg-paper/60 px-3 py-2 h-11 text-base font-serif" value={status} onChange={e => setStatus(e.target.value as typeof status)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="border-2 border-ink/25 bg-paper/60 px-3 py-2 h-11 text-base font-serif" value={campus} onChange={e => setCampus(e.target.value as typeof campus)}>
          {["All", "KTF", "Alumni", "KTC", "KTHO", "KTR"].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Desktop virtualized table */}
      <div className="hidden md:block paper-card overflow-hidden">
        <div className="grid grid-cols-[1.3fr_1fr_1fr_2fr_0.8fr_1.4fr_1fr_0.6fr] gap-3 bg-ink text-paper px-4 py-3 font-mono text-xs uppercase tracking-wider">
          <div>Order №</div><div>Delivery ID</div><div>Customer</div><div>Items</div><div>Campus</div><div>Ordered</div><div>Status</div><div className="text-right">RM</div>
        </div>
        <VirtualRows rows={filtered} />
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.slice(0, 80).map(o => (
          <div key={o.id} className="paper-card p-4">
            <div className="flex justify-between items-baseline">
              <div className="font-mono text-xs text-sienna">{o.id}</div>
              <StatusPill s={o.status} />
            </div>
            <div className="font-display text-lg text-ink mt-1">{o.customer}</div>
            <div className="font-serif text-sm text-ink/75">{o.items}</div>
            <div className="flex justify-between mt-3 pt-3 border-t border-dashed border-ink/20 text-sm">
              <div className="font-mono text-ink/60">{o.campus} · {new Date(o.orderedAt).toLocaleDateString()}</div>
              <div className="font-display text-ink">RM {o.total}</div>
            </div>
          </div>
        ))}
        {filtered.length > 80 && (
          <p className="text-center font-script text-sienna text-lg">{filtered.length - 80} more — narrow your search to see them.</p>
        )}
      </div>
    </div>
  );
}

function VirtualRows({ rows }: { rows: typeof orders }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 10,
  });
  return (
    <div ref={parentRef} className="max-h-[640px] overflow-auto">
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map(v => {
          const o = rows[v.index];
          return (
            <div
              key={o.id}
              className="grid grid-cols-[1.3fr_1fr_1fr_2fr_0.8fr_1.4fr_1fr_0.6fr] gap-3 items-center px-4 border-b border-dashed border-ink/15 text-sm font-serif hover:bg-ochre/10"
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: v.size, transform: `translateY(${v.start}px)` }}
            >
              <div className="font-mono text-xs text-ink/80">{o.id}</div>
              <div className="font-mono text-xs text-ink/60">{o.deliveryId}</div>
              <div className="truncate">{o.customer}</div>
              <div className="truncate text-ink/75">{o.items}</div>
              <div className="font-mono text-xs">{o.campus}</div>
              <div className="font-mono text-xs text-ink/60">{new Date(o.orderedAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</div>
              <div><StatusPill s={o.status} /></div>
              <div className="text-right font-display">RM{o.total}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusPill({ s }: { s: OrderStatus }) {
  const tone =
    s === "Delivered" ? "bg-teal text-paper" :
    s === "Out for Delivery" ? "bg-ochre text-ink" :
    s === "Packed" ? "bg-paper-deep text-ink border border-ink/30" :
    s === "Cancelled" ? "bg-destructive text-destructive-foreground" :
    "bg-sienna text-paper";
  return <span className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${tone}`}>{s}</span>;
}

function Stat({ label, value, tone = "cream" }: { label: string; value: number; tone?: "cream" | "sienna" | "teal" }) {
  const styles =
    tone === "sienna"
      ? { background: "var(--color-sienna)", color: "var(--color-paper)" }
      : tone === "teal"
        ? { background: "var(--color-teal)", color: "var(--color-paper)" }
        : undefined;
  return (
    <div className="paper-card p-4" style={styles}>
      <div className="font-mono text-[10px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="font-display text-3xl mt-1">{value.toLocaleString()}</div>
    </div>
  );
}

