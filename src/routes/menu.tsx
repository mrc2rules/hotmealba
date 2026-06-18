import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { dumplings, filterCategories, type Dumpling } from "@/data/dumplings";
import { useCart } from "@/components/cart-context";
import { SectionHeading } from "@/components/stamp";
import { getMenuImage } from "@/lib/menu-images";
import { Plus, Minus, X, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu · Hot Meal Bar" },
      { name: "description", content: "Browse the full Hot Meal Bar menu — dumplings, noodles, satay, and more. Halal-certified, made fresh at KTF." },
      { property: "og:title", content: "Menu · Hot Meal Bar" },
      { property: "og:description", content: "Browse the full Hot Meal Bar menu — dumplings, noodles, satay, and more." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [filter, setFilter] = useState<string>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();
  const filtered = useMemo(
    () => (filter === "all" ? dumplings : dumplings.filter(d => d.filling === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <SectionHeading eyebrow="The Catalogue" script="our" title="MENU" />

      {/* filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {filterCategories.map(c => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-4 py-2 font-serif border-2 transition-all ${
              filter === c.key
                ? "border-sienna bg-sienna text-paper shadow-[3px_3px_0_0_var(--color-ink)]"
                : "border-ink/30 text-ink hover:border-sienna hover:text-sienna"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d, i) => (
          <ProductCard key={d.id} d={d} tilt={(i % 3 - 1) * 0.5} onAdd={() => { cart.add(d); toast.success(`${d.name} added`); }} />
        ))}
      </div>

      {/* floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-sienna text-paper rounded-full px-5 py-3 font-display shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all flex items-center gap-2"
      >
        <ShoppingBasket className="w-5 h-5" />
        Basket · {cart.count}
      </button>

      {/* receipt drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-start animate-ink-bleed" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-full sm:max-w-md bg-card overflow-y-auto shadow-2xl"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, oklch(0.78 0.04 70 / 0.4) 27px, oklch(0.78 0.04 70 / 0.4) 28px)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b-2 border-dashed border-ink/30 p-4 flex justify-between items-center">
              <div>
                <div className="font-mono text-xs uppercase text-sienna">Receipt № {Math.floor(Math.random() * 9000 + 1000)}</div>
                <div className="font-display text-2xl text-ink">Your Basket</div>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close"><X /></button>
            </div>
            <div className="p-4 space-y-3">
              {cart.items.length === 0 && (
                <p className="font-serif text-ink/60 text-center py-12">Nothing on the receipt yet.</p>
              )}
              {cart.items.map(({ dumpling: d, qty }) => (
                <div key={d.id} className="flex items-center gap-3 border-b border-dashed border-ink/20 pb-3">
                  <img src={getMenuImage(d.id)} alt="" className="w-12 h-12 object-cover opacity-80" />
                  <div className="flex-1">
                    <div className="font-display text-ink">{d.name}</div>
                    <div className="font-mono text-xs text-ink/60">RM {d.price} · pack of {d.packSize}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => cart.setQty(d.id, qty - 1)} className="p-1 border border-ink/30"><Minus className="w-3 h-3" /></button>
                    <span className="font-mono w-6 text-center">{qty}</span>
                    <button onClick={() => cart.setQty(d.id, qty + 1)} className="p-1 border border-ink/30"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="font-display text-ink w-16 text-right">RM{qty * d.price}</div>
                </div>
              ))}
              {cart.items.length > 0 && (
                <>
                  <div className="flex justify-between font-display text-xl pt-2">
                    <span>Total</span>
                    <span>RM {cart.total}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="block text-center bg-sienna text-paper py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all"
                  >
                    Proceed to checkout →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ d, tilt, onAdd }: { d: Dumpling; tilt: number; onAdd: () => void }) {
  const menuImage = getMenuImage(d.id);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* Background Image */}
      <img
        src={menuImage}
        alt={d.name}
        className="w-full h-64 object-cover"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
        {d.badge && (
          <div className="absolute top-3 left-3 bg-sienna text-paper px-2 py-0.5 text-[10px] uppercase tracking-wider font-mono rounded">
            {d.badge}
          </div>
        )}

        <div className="text-white">
          <div className="font-mono text-[10px] uppercase tracking-widest text-sienna/80">№ {d.id}</div>
          <div className="font-display text-xl text-white mt-1 leading-none">{d.name}</div>
          <div className="font-script text-lg text-sienna -mt-1">{d.cn}</div>
          <p className="font-serif text-xs text-white/90 italic leading-snug mt-2 line-clamp-2">"{d.desc}"</p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-white">
            <div className="font-display text-xl leading-none">
              RM {d.price}
              {d.originalPrice && <span className="font-serif text-sm text-white/60 line-through ml-2">RM{d.originalPrice}</span>}
            </div>
            <div className="font-mono text-[10px] text-white/70 mt-1">pack of {d.packSize}</div>
          </div>
          <button
            onClick={onAdd}
            className="bg-teal text-paper px-3 py-2 text-sm font-display hover:bg-sienna transition-colors shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.3)]"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
