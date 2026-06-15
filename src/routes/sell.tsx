import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/stamp";
import { toast } from "sonner";
import postmark from "@/assets/postmark.png";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell With Us · Hot Meal Bar" },
      { name: "description", content: "Earn extra pocket money as a Hot Meal Bar student seller. 15% commission, flexible hours, no inventory to keep." },
      { property: "og:title", content: "Sell With Us · Hot Meal Bar" },
      { property: "og:description", content: "Earn extra pocket money as a Hot Meal Bar student seller." },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const [sealed, setSealed] = useState(false);
  const [form, setForm] = useState({ name: "", studentId: "", university: "Universiti Teknologi Malaysia", course: "", phone: "", email: "", college: "KTF", why: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.studentId || !form.phone) {
      toast.error("Please fill in name, student ID and phone.");
      return;
    }
    setSealed(true);
  };

  if (sealed) return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="relative paper-card p-12 animate-ink-bleed">
        <img src={postmark} aria-hidden alt="" className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 animate-stamp-thud" />
        <div className="font-script text-3xl text-sienna italic">application sealed</div>
        <h1 className="font-display text-5xl text-ink mt-2">WELCOME, {form.name.split(" ")[0]?.toUpperCase()}</h1>
        <p className="mt-6 font-serif text-ink/80 max-w-md mx-auto">
          We'll WhatsApp you within 48 hours with the next step — a 30-minute kitchen tour, an apron, and your first sample pack.
        </p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 py-12">
      <SectionHeading eyebrow="Side Hustle" script="join the" title="SELLER ROSTER" />

      <div className="grid lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-2 space-y-6">
          <div className="paper-card p-6">
            <div className="font-mono text-xs uppercase text-sienna mb-2">Why pleat with us</div>
            <ul className="space-y-3 font-serif text-ink/80">
              {[
                ["15%", "Commission per pack you move. Cash out weekly."],
                ["0 RM", "Upfront cost. No inventory to hold. We deliver."],
                ["Flexible", "Sell between classes, in your DM, on campus."],
                ["Friends", "Join a community of 38 student sellers across UTM."],
              ].map(([h, b]) => (
                <li key={h} className="flex gap-4 border-b border-dashed border-ink/20 pb-3 last:border-0">
                  <div className="font-display text-2xl text-sienna w-20 shrink-0">{h}</div>
                  <div>{b}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="paper-card p-6" style={{ background: "var(--color-teal)", color: "var(--color-paper)" }}>
            <div className="font-script text-2xl italic">a quick word</div>
            <p className="font-serif mt-2">"My second semester I cleared RM 800 in a month, just selling to my block. It pays my coffee and my notes."</p>
            <p className="font-mono text-xs mt-3 opacity-80">— Hafiz, KTC, sem 5</p>
          </div>

        </aside>

        <form onSubmit={submit} className="lg:col-span-3 paper-card p-6 md:p-8 space-y-4">
          <h3 className="font-display text-2xl text-ink">Tell us about yourself</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" required><input className={input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Student ID" required><input className={input} value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} placeholder="A24EC0123" /></Field>
          </div>
          <Field label="University"><input className={input} value={form.university} onChange={e => setForm({ ...form, university: e.target.value })} /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Course / Programme"><input className={input} value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} /></Field>
            <Field label="College">
              <select className={input} value={form.college} onChange={e => setForm({ ...form, college: e.target.value })}>
                {["KTF", "KTC", "KTHO", "KTR", "Alumni", "Off-campus"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone (WhatsApp)" required><input className={input} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Email"><input type="email" className={input} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
          </div>
          <Field label="Why do you want to sell with us?">
            <textarea className={input + " min-h-[120px]"} value={form.why} onChange={e => setForm({ ...form, why: e.target.value })} placeholder="A sentence or two — keep it real." />
          </Field>
          <button type="submit" className="w-full bg-sienna text-paper py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all">
            Seal &amp; send application
          </button>
        </form>
      </div>
    </div>
  );
}

const input = "w-full border-2 border-ink/25 bg-paper/60 px-3 py-2 font-serif text-ink focus:outline-none focus:border-sienna transition-colors";
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-wider text-ink/70">{label}{required && <span className="text-sienna"> *</span>}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
