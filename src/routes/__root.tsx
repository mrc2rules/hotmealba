import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { CartProvider } from "@/components/cart-context";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center paper-card p-8">
        <div className="font-script text-sienna text-2xl">return to sender</div>
        <h1 className="font-display text-7xl text-ink mt-2">404</h1>
        <p className="mt-3 font-serif text-ink/70">
          This envelope didn't reach a recipient. Try the front desk.
        </p>
        <a href="/" className="mt-6 inline-block bg-sienna text-paper px-5 py-2 font-display shadow-[3px_3px_0_0_var(--color-ink)]">
          Take me home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center paper-card p-8">
        <h1 className="font-display text-2xl text-ink">A page got smudged in the press.</h1>
        <p className="mt-2 font-serif text-ink/70 text-sm">Try again — the ink may have set by now.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-sienna text-paper px-4 py-2 font-display shadow-[3px_3px_0_0_var(--color-ink)]"
          >Try again</button>
          <a href="/" className="border border-ink/30 px-4 py-2 font-display">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hot Meal Bar — Frozen Dumplings from KTF, UTM" },
      { name: "description", content: "Hand-pleated Chinese Muslim dumplings, delivered frozen across UTM campus. Order online or join us as a student seller." },
      { name: "author", content: "Hot Meal Bar" },
      { property: "og:title", content: "Hot Meal Bar — Frozen Dumplings from KTF, UTM" },
      { property: "og:description", content: "Hand-pleated Chinese Muslim dumplings, delivered frozen across UTM campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Caveat:wght@500;700&family=JetBrains+Mono:wght@400;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <SiteNav />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}
