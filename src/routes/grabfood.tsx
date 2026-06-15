import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/grabfood")({
  head: () => ({
    meta: [
      { title: "GrabFood - Hot Meal Bar" },
      { name: "description", content: "Order Hot Meal Bar dumplings on GrabFood for quick delivery." },
    ],
  }),
  component: GrabFood,
});

function GrabFood() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <div className="text-center paper-card p-12">
        <h1 className="font-display text-5xl text-ink mb-4">GrabFood</h1>
        <p className="font-serif text-lg text-ink/80 mb-8">
          Order our hand-pleated dumplings through GrabFood for quick delivery to your location.
        </p>
        <div className="bg-ochre/20 p-8 rounded-lg">
          <p className="font-display text-2xl text-sienna mb-4">Coming Soon!</p>
          <p className="font-serif text-ink/70">
            We're currently setting up our GrabFood partnership. Check back soon to order your favorite dumplings with just a few taps.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-sienna text-paper px-6 py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all"
          >
            Order from our menu instead
          </Link>
        </div>
      </div>
    </div>
  );
}
