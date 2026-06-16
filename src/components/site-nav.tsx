import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoPlaceholder from "@/assets/logo-placeholder.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/track", label: "Track Order" },
  { to: "/sell", label: "Sell With Us" },
  { to: "/orders", label: "Seller Ledger" },
  { to: "/foodpanda", label: "Foodpanda" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const leftLinks = links.slice(0, Math.ceil(links.length / 2));
  const rightLinks = links.slice(Math.ceil(links.length / 2));

  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
        {/* Left navigation links */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {leftLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 font-serif text-ink/80 hover:text-sienna transition-colors text-sm"
              activeProps={{ className: "px-3 py-2 font-serif text-sienna ink-underline" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Centered logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setOpen(false)}>
          <img
            src={logoPlaceholder}
            alt="Hot Meal Bar Logo"
            className="h-12 w-12 object-contain group-hover:animate-stamp-thud"
          />
          <div className="leading-tight hidden sm:block">
            <div className="font-display text-lg text-ink">Hot Meal Bar</div>
            <div className="font-script text-sienna text-sm -mt-1">est. KTF · UTM</div>
          </div>
        </Link>

        {/* Right navigation links */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-end">
          {rightLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 font-serif text-ink/80 hover:text-sienna transition-colors text-sm"
              activeProps={{ className: "px-3 py-2 font-serif text-sienna ink-underline" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/menu"
            className="ml-3 inline-flex items-center rounded-sm bg-sienna px-4 py-2 font-display text-paper shadow-[3px_3px_0_0_var(--color-ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all"
          >
            Order Now
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-lg border-2 border-ink/20 bg-paper text-ink hover:border-sienna hover:text-sienna transition-all"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu with Vintage Stamp Styling */}
      {open && (
        <div className="lg:hidden border-t border-ink/15 bg-paper/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6">
            {/* Stamp-style menu container */}
            <div className="relative paper-card p-6 mb-4" style={{ transform: "rotate(-0.5deg)" }}>
              {/* Decorative postmark */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full border-4 border-sienna/30 flex items-center justify-center">
                <div className="font-display text-xs text-sienna/60">MENU</div>
              </div>
              
              <nav className="space-y-2">
                {links.map((l, i) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-4 font-serif text-lg text-ink/80 hover:text-sienna hover:bg-ochre/10 rounded-lg transition-all duration-300"
                    activeProps={{ className: "block py-3 px-4 font-serif text-lg text-sienna bg-ochre/20 rounded-lg" }}
                    style={{
                      animationDelay: `${i * 50}ms`,
                      animation: "fadeInSlide 0.3s ease-out forwards",
                      opacity: 0,
                      transform: "translateX(-10px)"
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-sienna/40" />
                      {l.label}
                    </span>
                  </Link>
                ))}
              </nav>
              
              {/* CTA Button */}
              <Link
                to="/menu"
                onClick={() => setOpen(false)}
                className="mt-6 block w-full text-center bg-sienna text-paper py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all duration-300 rounded-lg"
                style={{
                  animation: "fadeInSlide 0.3s ease-out forwards",
                  animationDelay: "250ms",
                  opacity: 0,
                  transform: "translateX(-10px)"
                }}
              >
                Order Now →
              </Link>
            </div>
            
            {/* Decorative Chinese element */}
            <div className="text-center">
              <div className="font-script text-sienna/60 text-sm">华美热食</div>
              <div className="font-mono text-[10px] text-ink/40 mt-1">vintage paper · since 2019</div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-2 border-dashed border-ink/30 bg-paper-deep/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        {/* Centered Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-sienna bg-paper-deep font-display text-sienna text-2xl leading-none mb-4">
            HM
          </div>
          <div className="text-center">
            <div className="font-display text-3xl text-ink">Hot Meal Bar</div>
            <p className="font-script text-xl text-ink/70 -mt-1">华美热食 · since 2019</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="font-serif text-sm text-ink/75 space-y-2">
            <div className="font-display text-ink mb-2 text-lg">Navigation</div>
            <Link to="/" className="block hover:text-sienna transition-colors">Home</Link>
            <Link to="/menu" className="block hover:text-sienna transition-colors">Menu</Link>
            <Link to="/track" className="block hover:text-sienna transition-colors">Track Order</Link>
            <Link to="/sell" className="block hover:text-sienna transition-colors">Sell With Us</Link>
          </div>
          <div className="font-serif text-sm text-ink/75 space-y-2">
            <div className="font-display text-ink mb-2 text-lg">Company</div>
            <Link to="/foodpanda" className="block hover:text-sienna transition-colors">Foodpanda</Link>
            <Link to="/orders" className="block hover:text-sienna transition-colors">Seller Ledger</Link>
            <div className="hover:text-sienna transition-colors cursor-pointer">About Us</div>
            <div className="hover:text-sienna transition-colors cursor-pointer">Careers</div>
          </div>
          <div className="font-serif text-sm text-ink/75 space-y-2">
            <div className="font-display text-ink mb-2 text-lg">Contact</div>
            <p>WhatsApp · +60 13-555 0942</p>
            <p>hello@hotmealbar.my</p>
            <div className="hover:text-sienna transition-colors cursor-pointer">Contact Us</div>
          </div>
          <div className="font-serif text-sm text-ink/75 space-y-2">
            <div className="font-display text-ink mb-2 text-lg">Location</div>
            <p>Lot 2, KTF Cafeteria</p>
            <p>Universiti Teknologi Malaysia</p>
            <p>81310 Skudai, Johor</p>
            <p className="pt-2">Open daily · 11:00 — 22:00</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ink/20 pt-6 text-center">
          <p className="text-xs text-ink/55">
            © 2026 Hot Meal Bar. All flavours reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
