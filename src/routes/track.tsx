import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { findOrder, type Order, type OrderStatus } from "@/data/orders";
import { SectionHeading } from "@/components/stamp";
import postmark from "@/assets/postmark.png";
import { Search, Check } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order · Hot Meal Bar" },
      { name: "description", content: "Follow your dumpling delivery from kitchen to door." },
      { property: "og:title", content: "Track Your Order · Hot Meal Bar" },
      { property: "og:description", content: "Follow your dumpling delivery from kitchen to door." },
    ],
  }),
  component: TrackPage,
});

const STAGES: OrderStatus[] = ["Placed", "Packed", "Out for Delivery", "Delivered"];

function TrackPage() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Order | null | "miss">(null);
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const o = findOrder(q);
    setResult(o ?? "miss");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8 py-12">
      <SectionHeading eyebrow="Postal Journey" script="track" title="YOUR ORDER" />

      <form onSubmit={onSearch} className="paper-card p-6 flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Enter phone number (e.g., +60 13-555 0942) or order ID"
            className="w-full pl-10 pr-3 py-3 text-base border-2 border-ink/25 bg-paper/60 font-mono text-ink focus:outline-none focus:border-sienna"
          />
        </div>
        <button className="bg-sienna text-paper px-6 py-3 font-display shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all">
          Track →
        </button>
      </form>
      <p className="font-script text-lg text-sienna mt-2 text-center">
        Track by phone number or order ID — try {`"+60 13-555"`} or {`"HMB"`} for a sample
      </p>

      {result === "miss" && (
        <div className="mt-8 paper-card p-6 text-center">
          <p className="font-display text-xl text-ink">No envelope by that name.</p>
          <p className="font-serif text-ink/70 mt-1">Check the receipt we WhatsApp'd you.</p>
        </div>
      )}

      {result && result !== "miss" && <OrderTimeline order={result} />}
    </div>
  );
}

function OrderTimeline({ order }: { order: Order }) {
  const currentIndex = order.status === "Cancelled" ? -1 : STAGES.indexOf(order.status);
  const estimatedDelivery = new Date(order.deliveredAt);
  const isDelivered = order.status === "Delivered";
  
  return (
    <div className="mt-10 animate-ink-bleed">
      {/* Envelope header */}
      <div className="relative paper-card p-6 md:p-8">
        <img src={postmark} aria-hidden alt="" className="absolute -top-6 right-6 w-24 -rotate-12 opacity-90" />
        <div className="font-mono text-xs uppercase text-sienna">Postmarked · {order.campus}</div>
        <h3 className="font-display text-3xl text-ink mt-1">{order.id}</h3>
        <div className="grid sm:grid-cols-2 gap-4 mt-4 font-serif text-sm text-ink/80">
          <div><span className="text-ink/55">Customer</span><br />{order.customer}</div>
          <div><span className="text-ink/55">Phone</span><br />{order.phone}</div>
          <div><span className="text-ink/55">Items</span><br />{order.items}</div>
          <div><span className="text-ink/55">Total</span><br />RM {order.total}</div>
        </div>
        
        {/* Estimated delivery */}
        {!isDelivered && order.status !== "Cancelled" && (
          <div className="mt-4 p-3 bg-ochre/20 rounded-lg border border-ochre/30">
            <div className="font-mono text-xs uppercase text-sienna">Estimated Delivery</div>
            <div className="font-display text-lg text-ink">
              {estimatedDelivery.toLocaleDateString('en-MY', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        )}
      </div>

      {/* Status History */}
      {order.statusHistory && order.statusHistory.length > 0 && (
        <div className="mt-6 paper-card p-6">
          <h4 className="font-display text-lg text-ink mb-4">Status History</h4>
          <div className="space-y-3">
            {order.statusHistory.map((history, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-dashed border-ink/20 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  history.status === order.status ? 'bg-sienna' : 'bg-ink/30'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-ink">{history.status}</span>
                    <span className="font-mono text-xs text-ink/60">
                      {new Date(history.timestamp).toLocaleDateString('en-MY', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {history.note && (
                    <p className="font-serif text-sm text-ink/70 mt-1">{history.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="mt-10 relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 border-l-2 border-dashed border-ink/30 md:-translate-x-1/2" />
        {STAGES.map((s, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          return (
            <div key={s} className={`relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-12 py-6 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
              <div className={`${i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}>
                <div className={`inline-block paper-card p-4 ${active ? "ring-2 ring-sienna" : ""}`} style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
                  <div className="font-mono text-[10px] uppercase text-sienna">Stage {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display text-xl text-ink">{s}</div>
                  <div className="font-serif text-sm text-ink/70 mt-1">
                    {[
                      "Order stamped and queued at the kitchen.",
                      "Pleated, sealed, and packed into the cooler bag.",
                      "Runner on the way — keep your phone close.",
                      "Handed off. Eat while the steam still rises.",
                    ][i]}
                  </div>
                </div>
              </div>
              {/* dot */}
              <div className={`absolute left-6 md:left-1/2 md:-translate-x-1/2 top-10 w-7 h-7 -translate-x-1/2 rounded-full border-2 flex items-center justify-center ${done ? "bg-sienna border-sienna text-paper" : "bg-paper border-ink/30 text-ink/30"}`}>
                {done ? <Check className="w-4 h-4" /> : <span className="text-xs font-mono">{i + 1}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {order.status === "Cancelled" && (
        <div className="mt-6 paper-card p-6 border-l-4 border-destructive">
          <div className="font-display text-xl text-destructive">Order cancelled</div>
          <p className="font-serif text-sm text-ink/70">A refund is on the way to your bank.</p>
        </div>
      )}
    </div>
  );
}
