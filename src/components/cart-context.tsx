import { createContext, useContext, useState, type ReactNode } from "react";
import type { Dumpling } from "@/data/dumplings";

type CartItem = { dumpling: Dumpling; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (d: Dumpling) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (d: Dumpling) =>
    setItems((prev) => {
      const i = prev.find((x) => x.dumpling.id === d.id);
      return i
        ? prev.map((x) => (x.dumpling.id === d.id ? { ...x, qty: x.qty + 1 } : x))
        : [...prev, { dumpling: d, qty: 1 }];
    });
  const remove = (id: string) => setItems((prev) => prev.filter((x) => x.dumpling.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((x) => x.dumpling.id !== id)
        : prev.map((x) => (x.dumpling.id === id ? { ...x, qty } : x)),
    );
  const clear = () => setItems([]);
  const count = items.reduce((a, b) => a + b.qty, 0);
  const total = items.reduce((a, b) => a + b.qty * b.dumpling.price, 0);
  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
