import { http } from "./http";

export type OrderItemPayload = {
  productId: string;
  qty: number;
};

export type CreateOrderPayload = {
  companyName: string;
  email: string;
  deliveryAddress: string;
  comment: string;
  name: string;
  phone: string;
  consent: boolean;
  items: OrderItemPayload[];
};

type ApiOk = {
  status?: "ok";
  data?: { status?: "ok" };
};

function assertOkResponse(response: { status: number; data: ApiOk }, errorMessage: string) {
  if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
  const ok = response.data?.status === "ok" || response.data?.data?.status === "ok";
  //if (!ok) throw new Error(errorMessage);
}

export const ordersApi = {
  async createOrder(payload: CreateOrderPayload) {
    const res = await http.post<ApiOk>("/email/create-order", payload);
    assertOkResponse(res, "Ошибка отправки заказа");
    return res.data;
  },
};
