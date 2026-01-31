import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cartStorage } from "./cartStorage";
import type { CartItem, CartState } from "./cartTypes";

type CartContextValue = {
  items: CartItem[];
  isReady: boolean;

  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;

  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>({ items: [] });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loaded = cartStorage.load();
    setState(loaded);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    cartStorage.save(state);
  }, [state, isReady]);

  const add = (productId: string, qty: number = 1) => {
    setState(prev => {
      const next = [...prev.items];
      const idx = next.findIndex(i => i.productId === productId);
      if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      else next.push({ productId, qty: Math.max(1, qty) });
      return { items: next };
    });
  };

  const remove = (productId: string) => {
    setState(prev => ({ items: prev.items.filter(i => i.productId !== productId) }));
  };

  const setQty = (productId: string, qty: number) => {
    const safeQty = Math.max(1, Math.floor(qty || 1));
    setState(prev => ({
      items: prev.items.map(i => (i.productId === productId ? { ...i, qty: safeQty } : i)),
    }));
  };

  const clear = () => {
    setState({ items: [] });
    cartStorage.clear();
  };

  const count = useMemo(
    () => state.items.reduce((acc, i) => acc + i.qty, 0),
    [state.items]
  );

  const value: CartContextValue = useMemo(
    () => ({ items: state.items, isReady, add, remove, setQty, clear, count }),
    [state.items, isReady, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
