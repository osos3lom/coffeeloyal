"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { menuItems, type MenuItem } from "@/lib/content/menu";

export type Size = "regular" | "large";

export interface CartLine {
  slug: string;
  size: Size;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  item: MenuItem;
  unitPrice: number;
  lineTotal: number;
  key: string;
}

interface CartState {
  branch: string | null;
  lines: CartLine[];
}

interface CartContextValue {
  branch: string | null;
  lines: ResolvedLine[];
  count: number;
  total: number;
  ready: boolean;
  setBranch: (slug: string) => void;
  add: (slug: string, size?: Size) => void;
  setQty: (slug: string, size: Size, qty: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
}

const STORAGE_KEY = "princes.cart";

const CartContext = createContext<CartContextValue | null>(null);

function unitPriceOf(item: MenuItem, size: Size) {
  return size === "large" && item.priceLarge ? item.priceLarge : item.price;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({ branch: null, lines: [] });
  const [ready, setReady] = useState(false);

  // Rehydrate after mount so server and client markup match. The read is
  // deferred to a microtask rather than run in the commit phase: setting
  // state synchronously here would cascade a second render before paint,
  // which is what react-hooks/set-state-in-effect guards against.
  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CartState;
          if (parsed && Array.isArray(parsed.lines)) setState(parsed);
        }
      } catch {
        /* private mode or blocked storage — start empty */
      }
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* non-fatal */
    }
  }, [state, ready]);

  const setBranch = useCallback((slug: string) => {
    setState((s) =>
      s.branch === slug ? s : { branch: slug, lines: s.branch ? [] : s.lines },
    );
  }, []);

  const add = useCallback((slug: string, size: Size = "regular") => {
    setState((s) => {
      const i = s.lines.findIndex((l) => l.slug === slug && l.size === size);
      if (i === -1) return { ...s, lines: [...s.lines, { slug, size, qty: 1 }] };
      const lines = [...s.lines];
      lines[i] = { ...lines[i], qty: lines[i].qty + 1 };
      return { ...s, lines };
    });
  }, []);

  const setQty = useCallback((slug: string, size: Size, qty: number) => {
    setState((s) => ({
      ...s,
      lines:
        qty <= 0
          ? s.lines.filter((l) => !(l.slug === slug && l.size === size))
          : s.lines.map((l) =>
              l.slug === slug && l.size === size ? { ...l, qty } : l,
            ),
    }));
  }, []);

  const remove = useCallback((slug: string, size: Size) => {
    setState((s) => ({
      ...s,
      lines: s.lines.filter((l) => !(l.slug === slug && l.size === size)),
    }));
  }, []);

  const clear = useCallback(() => setState((s) => ({ ...s, lines: [] })), []);

  const lines = useMemo<ResolvedLine[]>(() => {
    return state.lines.flatMap((l) => {
      const item = menuItems.find((m) => m.slug === l.slug);
      if (!item) return [];
      const unitPrice = unitPriceOf(item, l.size);
      return [
        {
          ...l,
          item,
          unitPrice,
          lineTotal: unitPrice * l.qty,
          key: `${l.slug}:${l.size}`,
        },
      ];
    });
  }, [state.lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      branch: state.branch,
      lines,
      count: lines.reduce((a, l) => a + l.qty, 0),
      // Display only. The server recomputes every price from the database
      // when the order is placed, so a tampered client total changes nothing.
      total: lines.reduce((a, l) => a + l.lineTotal, 0),
      ready,
      setBranch,
      add,
      setQty,
      remove,
      clear,
    }),
    [state.branch, lines, ready, setBranch, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
