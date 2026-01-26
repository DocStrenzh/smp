import type { CartState } from "./cartTypes";

const KEY = "smp97_cart_v1";

const safeParse = (raw: string | null): CartState | null => {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as CartState;
    if (!v || !Array.isArray(v.items)) return null;
    return { items: v.items.filter(i => typeof i?.productId === "string" && typeof i?.qty === "number") };
  } catch {
    return null;
  }
};

export const cartStorage = {
  load(): CartState {
    const parsed = safeParse(localStorage.getItem(KEY));
    return parsed ?? { items: [] };
  },
  save(state: CartState) {
    localStorage.setItem(KEY, JSON.stringify(state));
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};
