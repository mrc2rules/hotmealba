import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { dumplings } from "@/data/dumplings";
import { Stamp, SectionHeading } from "@/components/stamp";
import { useCart } from "@/components/cart-context";
import stampDumplings from "@/assets/stamp-dumplings.png";
import postmark from "@/assets/postmark.png";
import { getHomeMenuImage } from "@/lib/home-menu-images";
import { getMenuImage } from "@/lib/menu-images";
import homeD01 from "@/assets/home-d01.png";
import { toast } from "sonner";
import { Plus, ArrowRight, X, Minus, ShoppingBasket } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hot Meal Bar — Homemade Meals from KTF" },
      { name: "description", content: "Chinese Muslim kitchen at KTF, UTM — dumplings, noodles, satay & more. Browse our menu, place an order, or join as a student seller." },
      { property: "og:title", content: "Hot Meal Bar — Homemade Meals from KTF" },
      { property: "og:description", content: "Chinese Muslim kitchen at KTF, UTM — dumplings, noodles, satay & more." },
    ],
  }),
  component: Home,
});

function Home() {
  const { add, items, setQty, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [countdown, setCountdown] = useState(2026);
  const featured = dumplings.slice(0, 5);
  const quickPicks = [...dumplings].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const count = items.reduce((a, b) => a + b.qty, 0);

  const storyRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.3 }
    );
    if (storyRef.current) {
      observer.observe(storyRef.current);
    }
    return () => observer.disconnect();
  }, [hasTriggered]);

  // Countdown effect from 2026 to 1989
  useEffect(() => {
    if (!hasTriggered) return;
    const startYear = 2026;
    const endYear = 1989;
    const duration = 2000; // 2 seconds
    const steps = startYear - endYear;
    const intervalTime = duration / steps;

    let current = startYear;
    const interval = setInterval(() => {
      if (current > endYear) {
        current--;
        setCountdown(current);
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [hasTriggered]);

  // Typing effect for paragraph
  useEffect(() => {
    if (!hasTriggered) return;
    const text = "Hot Meal Bar is a small Chinese Muslim kitchen at Kolej Tun Fatimah, UTM. Dumplings, noodles, satay, and rice combos — all made fresh from halal-certified ingredients in Skudai. Most items are blast-frozen within the hour so when they land in your hostel freezer, they taste like they just left the kitchen.";
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [hasTriggered]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/15">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div
            className="absolute -top-10 -left-10 w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, var(--color-ochre), transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, var(--color-teal), transparent 70%)" }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7 animate-ink-bleed">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-sienna/80 mb-4">
              ✦ Postmarked KTF · UTM · est. 2019 ✦
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-ink">
              <span className="font-script text-sienna text-4xl md:text-6xl block italic -mb-2">a taste of</span>
              Hot Meal Ba
              <span className="block font-script text-3xl md:text-5xl text-teal italic mt-2">Authentic Halal Chinese Cuisine.</span>
            </h1>
            <p className="mt-6 max-w-xl font-serif text-lg text-ink/80 leading-relaxed">
            From hand-pleated dumplings to rich, home-style mains, Hot Meal Ba brings authentic Chinese Muslim cooking to your table - every dish prepared fresh, halal, and full of flavor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-sienna text-paper px-6 py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all"
              >
                Order Now! <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 border-2 border-ink/70 px-6 py-3 font-display text-lg text-ink hover:bg-ochre/30 transition-colors"
              >
                Work with us
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 font-serif text-sm text-ink/70">
              <div><span className="font-display text-2xl text-sienna">12k+</span> meals shipped</div>
              <div className="h-6 w-px bg-ink/30" />
              <div><span className="font-display text-2xl text-sienna">200+</span> orders / week</div>
              <div className="h-6 w-px bg-ink/30" />
              <div><span className="font-display text-2xl text-sienna">38</span> student sellers</div>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-[420px] md:h-[520px]">
            <img
              src={stampDumplings}
              alt="Vintage stamp of steaming dumpling basket"
              className="absolute inset-0 m-auto w-[78%] animate-float drop-shadow-[0_20px_40px_rgba(60,30,15,0.35)]"
              style={{ ["--r" as string]: "-4deg" }}
            />
            <img
              src={postmark}
              alt=""
              aria-hidden
              className="absolute -top-2 -right-2 w-32 opacity-80 animate-float"
              style={{ ["--r" as string]: "12deg" }}
            />
            <img
              src={homeD01}
              alt=""
              aria-hidden
              className="absolute bottom-0 left-0 w-28 opacity-90 animate-float"
              style={{ ["--r" as string]: "-15deg", animationDelay: "1.5s" }}
            />
          </div>
        </div>
      </section>

      {/* PROMO RIBBON */}
      <section className="ribbon py-3 border-y-2 border-ink/40 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee font-display text-xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {[
                "✦  FREE DELIVERY ON ORDERS RM50+  ✦",
                "✦  20% OFF YOUR FIRST PACK  ✦",
                "✦  HALAL CERTIFIED · JAKIM  ✦",
                "✦  JOIN US AND EARN 15% COMMISSION  ✦",
                "✦  STOCK YOUR FREEZER. EAT ALL WEEK.  ✦",
              ].map(t => (
                <span key={t} className="px-8">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* QUICK PICKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <SectionHeading eyebrow="Fast Reorder" script="our" title="QUICK PICKS" />
        <p className="text-center font-serif text-ink/70 max-w-xl mx-auto -mt-4 mb-8">
          One tap. Straight into the basket. The favourites our regulars order again and again.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickPicks.map((d, i) => (
            <div key={d.id} className="paper-card p-5 hover-wobble" style={{ ["--tw-rotate" as string]: `${(i % 2 ? 1 : -1) * 0.6}deg`, transform: `rotate(${(i % 2 ? 1 : -1) * 0.6}deg)` }}>
              <div className="flex items-baseline justify-between">
                <div className="font-mono text-xs text-sienna">№ {String(i + 1).padStart(2, "0")}</div>
                {d.badge && <div className="text-[10px] uppercase tracking-wider bg-ink text-paper px-1.5 py-0.5">{d.badge}</div>}
              </div>
              <div className="mt-3 font-display text-xl text-ink leading-tight">{d.name}</div>
              <div className="font-script text-lg text-sienna -mt-1">{d.cn}</div>
              <div className="mt-4 flex items-center justify-between">
                <div className="font-display text-2xl text-ink">RM{d.price}</div>
                <button
                  onClick={() => { add(d); toast.success(`${d.name} added to basket`); }}
                  className="inline-flex items-center gap-1 bg-teal text-paper px-3 py-1.5 text-sm font-display hover:bg-sienna transition-colors animate-stamp-thud-trigger"
                  aria-label={`Add ${d.name} to cart`}
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MENU */}
      <section className="bg-paper-deep/40 border-y border-ink/15 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading eyebrow="The Catalogue" script="our" title="MENU" />
          <div className="relative">
            <img src={postmark} aria-hidden alt="" className="hidden md:block absolute -top-8 right-8 w-24 opacity-60 rotate-12 pointer-events-none" />
            <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible">
              {featured.map((d, i) => (
                <Stamp key={d.id} tilt={(i % 2 ? 1 : -1) * 2} className="min-w-[200px] md:min-w-0 snap-start">
                  <div className="aspect-[3/4] flex flex-col items-center justify-between py-3">
                    <div className="text-center">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-sienna">
                        Hot Meal Bar · {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="font-script text-2xl text-sienna leading-none mt-1">{d.cn}</div>
                    </div>
                    <img src={getHomeMenuImage(d.id)} alt={d.name} className="w-32 h-32 object-contain" />
                    <div className="text-center">
                      <div className="font-display text-base text-ink leading-tight">{d.name}</div>
                      <div className="font-display text-xl text-sienna mt-1">RM {d.price}</div>
                    </div>
                  </div>
                </Stamp>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/menu" className="inline-flex items-center gap-2 font-display text-sienna text-lg hover:gap-3 transition-all">
                See full menu <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section ref={storyRef} className="mx-auto max-w-7xl px-4 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="paper-card p-8 relative">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-sienna/80 mb-3">— A Letter From The Kitchen —</div>
            <p className="font-serif text-lg text-ink/85 leading-relaxed">
              We started in 2019 with one rolling pin and a folding table in the
              KTF cafeteria. Today we ship hundreds of meals across UTM each
              week — still hand-made, still halal, still made the way Auntie
              Ling taught us.
            </p>
            <p className="font-serif text-lg text-ink/85 leading-relaxed mt-4">
              If you'd like a side income while studying — cook with us, sell
              with us, eat well with us.
            </p>
            <div className="mt-6 font-script text-2xl text-sienna">— Auntie Ling & team</div>
          </div>
          <img src={postmark} alt="" aria-hidden className="hidden md:block absolute -bottom-8 -left-8 w-28 -rotate-12 opacity-70" />
        </div>
        <div className="paper-card p-8 md:p-12 relative">
          <h2 className="font-display text-7xl md:text-8xl font-bold text-ink leading-none">
            {countdown}
          </h2>
          <p className="mt-5 font-serif text-ink/80 leading-relaxed min-h-[120px]">
            {typedText}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 border-2 border-dashed border-ink/40 px-4 py-2 bg-paper/50">
            <div className="font-display text-3xl text-sienna">JAKIM</div>
            <div className="font-mono text-xs text-ink/70 leading-tight">
              HALAL CERTIFIED<br />MS 1500:2019
            </div>
          </div>
        </div>
      </section>

      {/* TASTE OF HMB ONLINE */}
      <section className="bg-sienna text-paper py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, var(--color-paper) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
        <div className="mx-auto max-w-5xl px-4 md:px-8 text-center relative">
          <div className="font-script text-3xl italic">a taste of</div>
          <h2 className="font-display text-5xl md:text-6xl mt-1">HOT MEAL BA <span className="font-script italic">online</span></h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Order in 60 seconds", body: "Pick a pack, drop an address, pay. We'll handle the rest." },
              { title: "Track every step", body: "From kitchen to your hostel door — postmarked along the way." },
              { title: "Sell, earn, repeat", body: "Become a student seller. 15% commission per pack moved." },
            ].map(c => (
              <div key={c.title} className="bg-paper text-ink p-6 rotate-[-1deg] hover:rotate-0 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,0.4)]">
                <div className="font-display text-xl">{c.title}</div>
                <p className="font-serif text-sm text-ink/75 mt-2">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-sienna text-paper rounded-full px-5 py-3 font-display shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all flex items-center gap-2"
      >
        <ShoppingBasket className="w-5 h-5" />
        Basket · {count}
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
              {items.length === 0 && (
                <p className="font-serif text-ink/60 text-center py-12">Nothing on the receipt yet.</p>
              )}
              {items.map(({ dumpling: d, qty }) => (
                <div key={d.id} className="flex items-center gap-3 border-b border-dashed border-ink/20 pb-3">
                  <img src={getMenuImage(d.id)} alt="" className="w-12 h-12 object-cover opacity-80" />
                  <div className="flex-1">
                    <div className="font-display text-ink">{d.name}</div>
                    <div className="font-mono text-xs text-ink/60">RM {d.price} · pack of {d.packSize}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setQty(d.id, qty - 1)} className="p-1 border border-ink/30"><Minus className="w-3 h-3" /></button>
                    <span className="font-mono w-6 text-center">{qty}</span>
                    <button onClick={() => setQty(d.id, qty + 1)} className="p-1 border border-ink/30"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="font-display text-ink w-16 text-right">RM{qty * d.price}</div>
                </div>
              ))}
              {items.length > 0 && (
                <>
                  <div className="flex justify-between font-display text-xl pt-2">
                    <span>Total</span>
                    <span>RM {total}</span>
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
