import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { SectionHeading } from "@/components/stamp";
import { toast } from "sonner";
import postmark from "@/assets/postmark.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout · Hot Meal Bar" },
      { name: "description", content: "Confirm your delivery details and place your dumpling order." },
      { property: "og:title", content: "Checkout · Hot Meal Bar" },
      { property: "og:description", content: "Confirm your delivery details and place your dumpling order." },
    ],
  }),
  component: CheckoutPage,
});

// Zod schema for form validation
const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  college: z.string().min(1, "Please select a college"),
  room: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  notes: z.string().optional(),
  payment: z.enum(["fpx", "card", "cod"]),
  card: z.string().optional(),
  exp: z.string().optional(),
  cvc: z.string().optional(),
}).refine(
  (data) => {
    if (data.payment === "card") {
      return data.card && data.card.length >= 13 && data.exp && data.cvc && data.cvc.length >= 3;
    }
    return true;
  },
  {
    message: "Please complete all card details",
    path: ["card"],
  }
);

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type Step = "details" | "payment" | "done";

function CheckoutPage() {
  const cart = useCart();
  const [step, setStep] = useState<Step>("details");
  const [orderNo] = useState(() => `HMB-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 900 + 100)}`);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      college: "KTF",
      room: "",
      address: "",
      notes: "",
      payment: "fpx",
      card: "",
      exp: "",
      cvc: "",
    },
  });

  const paymentMethod = watch("payment");
  const subtotal = cart.total;
  const delivery = subtotal >= 50 ? 0 : 4;
  const total = subtotal + delivery;

  const goPay = async (data: CheckoutFormData) => {
    const isValid = await trigger();
    if (isValid) {
      setStep("payment");
    }
  };

  const place = async (data: CheckoutFormData) => {
    const isValid = await trigger();
    if (isValid) {
      setStep("done");
      cart.clear();
    }
  };

  if (step === "done") return <ConfirmationReceipt orderNo={orderNo} total={total} />;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <SectionHeading eyebrow="One more step" script="the" title="CHECKOUT" />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 paper-card p-6 md:p-8">
          <Steps step={step} />
          {step === "details" && (
            <form onSubmit={handleSubmit(goPay)} className="space-y-4 mt-6">
              <h3 className="font-display text-xl text-ink">Where should we deliver?</h3>
              <Field label="Full name" required error={errors.name?.message}>
                <input 
                  className={inputCls} 
                  {...register("name")}
                  placeholder="Your full name"
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Phone (WhatsApp)" required error={errors.phone?.message}>
                  <input 
                    className={inputCls} 
                    {...register("phone")}
                    placeholder="+60 13-…" 
                  />
                </Field>
                <Field label="College" error={errors.college?.message}>
                  <select className={inputCls} {...register("college")}>
                    {["KTF", "KTC", "KTHO", "KTR", "Alumni", "Off-campus"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Room / Block" error={errors.room?.message}>
                  <input 
                    className={inputCls} 
                    {...register("room")}
                    placeholder="e.g. Block B, Rm 214" 
                  />
                </Field>
                <Field label="Address" required error={errors.address?.message}>
                  <input 
                    className={inputCls} 
                    {...register("address")}
                    placeholder="UTM Skudai, Johor" 
                  />
                </Field>
              </div>
              <Field label="Notes for the runner" error={errors.notes?.message}>
                <textarea 
                  className={inputCls + " min-h-[80px]"} 
                  {...register("notes")}
                  placeholder="Any special instructions?"
                />
              </Field>
              <button type="submit" className="bg-sienna text-paper px-6 py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all">
                Continue to payment →
              </button>
            </form>
          )}
          {step === "payment" && (
            <form onSubmit={handleSubmit(place)} className="space-y-4 mt-6">
              <h3 className="font-display text-xl text-ink">How would you like to pay?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { v: "fpx", label: "FPX Banking" },
                  { v: "card", label: "Card" },
                  { v: "cod", label: "Cash on Delivery" },
                ].map(opt => (
                  <label key={opt.v} className={`cursor-pointer border-2 p-4 text-center font-display transition-all ${paymentMethod === opt.v ? "border-sienna bg-ochre/20" : "border-ink/30 hover:border-sienna"}`}>
                    <input 
                      type="radio" 
                      {...register("payment")}
                      value={opt.v} 
                      className="sr-only" 
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {paymentMethod === "card" && (
                <div className="space-y-3 pt-2">
                  <Field label="Card number" error={errors.card?.message}>
                    <input 
                      className={errors.card ? inputErrorCls : inputCls} 
                      {...register("card")}
                      placeholder="•••• •••• •••• ••••" 
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Expiry" error={errors.exp?.message}>
                      <input 
                        className={errors.exp ? inputErrorCls : inputCls} 
                        {...register("exp")}
                        placeholder="MM/YY" 
                      />
                    </Field>
                    <Field label="CVC" error={errors.cvc?.message}>
                      <input 
                        className={errors.cvc ? inputErrorCls : inputCls} 
                        {...register("cvc")}
                        placeholder="•••" 
                      />
                    </Field>
                  </div>
                </div>
              )}
              {errors.card && (
                <p className="text-sm text-destructive font-serif">{errors.card.message}</p>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep("details")} className="border-2 border-ink/30 px-5 py-3 font-display">← Back</button>
                <button type="submit" className="bg-sienna text-paper px-6 py-3 font-display text-lg shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all">
                  Place order · RM {total}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Summary */}
        <aside className="paper-card p-6 h-fit"
          style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, oklch(0.78 0.04 70 / 0.4) 27px, oklch(0.78 0.04 70 / 0.4) 28px)" }}>
          <div className="font-mono text-xs uppercase text-sienna mb-1">Order Summary</div>
          <h3 className="font-display text-2xl text-ink mb-4">Your basket</h3>
          {cart.items.length === 0 && (
            <div className="text-sm text-ink/60 font-serif">
              No items. <Link to="/menu" className="text-sienna underline">Pick some dumplings →</Link>
            </div>
          )}
          {cart.items.map(({ dumpling: d, qty }) => (
            <div key={d.id} className="flex justify-between font-mono text-sm py-1 border-b border-dashed border-ink/20">
              <span>{qty}× {d.name}</span>
              <span>RM{qty * d.price}</span>
            </div>
          ))}
          {cart.items.length > 0 && (
            <>
              <div className="flex justify-between font-mono text-sm pt-3"><span>Subtotal</span><span>RM{subtotal}</span></div>
              <div className="flex justify-between font-mono text-sm"><span>Delivery</span><span>{delivery === 0 ? "FREE" : `RM${delivery}`}</span></div>
              <div className="flex justify-between font-display text-2xl pt-3 mt-2 border-t-2 border-dashed border-ink/30">
                <span>Total</span><span>RM{total}</span>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function ConfirmationReceipt({ orderNo, total }: { orderNo: string; total: number }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="relative paper-card p-8 md:p-12 animate-ink-bleed"
        style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, oklch(0.78 0.04 70 / 0.4) 27px, oklch(0.78 0.04 70 / 0.4) 28px)" }}>
        <img src={postmark} alt="" aria-hidden className="absolute -top-8 -right-6 w-32 -rotate-12 animate-stamp-thud" />
        <div className="text-center">
          <div className="font-script text-3xl text-sienna italic">thank you,</div>
          <h1 className="font-display text-5xl text-ink">ORDER RECEIVED</h1>
          <div className="font-mono text-sm text-ink/70 mt-3">№ {orderNo}</div>
        </div>
        <div className="mt-8 space-y-2 font-serif text-ink/80">
          <p>We've stamped your order and the kitchen is pleating now.</p>
          <p>We'll WhatsApp you when the runner sets off.</p>
        </div>
        <div className="mt-6 pt-6 border-t-2 border-dashed border-ink/30 flex justify-between font-display text-2xl">
          <span>PAID</span><span>RM {total}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/track" className="bg-sienna text-paper px-5 py-3 font-display shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] transition-all">
            Track this order →
          </Link>
          <Link to="/" className="border-2 border-ink/40 px-5 py-3 font-display">Back home</Link>
        </div>
      </div>
    </div>
  );
}

function Steps({ step }: { step: Step }) {
  const items = [
    { k: "details", n: "01", l: "Delivery" },
    { k: "payment", n: "02", l: "Payment" },
    { k: "done", n: "03", l: "Confirm" },
  ];
  return (
    <div className="flex items-center gap-4 border-b-2 border-dashed border-ink/25 pb-4">
      {items.map((it, i) => (
        <div key={it.k} className="flex items-center gap-4 flex-1">
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-display ${step === it.k ? "bg-sienna text-paper border-sienna" : "border-ink/30 text-ink/50"}`}>
            {it.n}
          </div>
          <div className={`font-display ${step === it.k ? "text-ink" : "text-ink/50"}`}>{it.l}</div>
          {i < items.length - 1 && <div className="flex-1 border-t-2 border-dashed border-ink/25" />}
        </div>
      ))}
    </div>
  );
}

const inputCls = "w-full border-2 border-ink/25 bg-paper/60 px-3 py-2 h-11 text-base font-serif text-ink focus:outline-none focus:border-sienna transition-colors";
const inputErrorCls = "w-full border-2 border-destructive bg-paper/60 px-3 py-2 h-11 text-base font-serif text-ink focus:outline-none focus:border-destructive transition-colors";

function Field({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-wider text-ink/70">
        {label} {required && <span className="text-sienna">*</span>}
      </span>
      <div className="mt-1">{children}</div>
      {error && (
        <p className="mt-1 text-xs text-destructive font-serif">{error}</p>
      )}
    </label>
  );
}
