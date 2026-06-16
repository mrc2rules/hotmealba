import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/foodpanda")({
  head: () => ({
    meta: [
      { title: "Foodpanda - Hot Meal Bar" },
      { name: "description", content: "Order Hot Meal Bar dumplings through foodpanda for quick delivery." },
    ],
  }),
  component: Foodpanda,
});

function Foodpanda() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <div className="text-center">
        {/* Vintage Foodpanda Branding */}
        <div className="mb-8">
          <div className="inline-block bg-pink-400 text-white px-8 py-4 rounded-lg shadow-lg border-4 border-pink-600 paper-card">
            <h1 className="font-display text-4xl md:text-5xl font-bold">foodpanda</h1>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-paper rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto border-4 border-pink-400 paper-card relative">
          {/* Vintage decorative elements */}
          <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full border-4 border-pink-300 opacity-60"></div>
          <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full border-4 border-pink-300 opacity-60"></div>

          <div className="mb-8">
            <h2 className="font-display text-3xl text-ink mb-4 font-script italic">Order on foodpanda</h2>
            <p className="font-serif text-lg text-ink/80 leading-relaxed">
              Get our hand-pleated dumplings delivered straight to your doorstep through foodpanda.
              Quick, convenient, and delicious — just a few taps away.
            </p>
          </div>

          {/* Vintage Foodpanda Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 paper-card">
              <div className="text-3xl mb-2">🚴</div>
              <div className="font-display text-lg text-ink">Fast Delivery</div>
              <p className="font-serif text-sm text-ink/70 mt-1">Quick delivery to your location</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 paper-card">
              <div className="text-3xl mb-2">📱</div>
              <div className="font-display text-lg text-ink">Easy Ordering</div>
              <p className="font-serif text-sm text-ink/70 mt-1">Simple app-based ordering</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 paper-card">
              <div className="text-3xl mb-2">💳</div>
              <div className="font-display text-lg text-ink">Multiple Payment</div>
              <p className="font-serif text-sm text-ink/70 mt-1">Various payment options</p>
            </div>
          </div>

          {/* Vintage CTA Button */}
          <a
            href="https://www.foodpanda.my/restaurant/can2/hot-meal-ba-ktf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-pink-400 text-paper px-8 py-4 font-display text-xl rounded-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all border-2 border-pink-600"
          >
            <span>Order Now on foodpanda</span>
            <span className="text-2xl">→</span>
          </a>
        </div>

        {/* Alternative Option */}
        <div className="mt-8">
          <p className="font-serif text-ink/70 mb-4">Or order directly from our menu:</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-sienna text-paper px-6 py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all"
          >
            Order from our menu
          </Link>
        </div>
      </div>
    </div>
  );
}
