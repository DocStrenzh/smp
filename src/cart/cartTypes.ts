export type CartItem = {
  productId: string;
  qty: number;
};

export type CartState = {
  items: CartItem[];
};
