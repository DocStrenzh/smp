import { http } from "./http";

export type CallbackPayload = {
  name: string;
  phone: string;
  consent: boolean;
};

export type AskQuestionPayload = {
  message: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  consent: boolean;
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

export const quickActionsApi = {
  async sendCallback(payload: CallbackPayload) {
    const body = {
      name: payload.name,
      phone: payload.phone,
      consent: payload.consent,
    };

    const response = await http.post<ApiOk>("/email/callback", body);
    assertOkResponse(response, "Ошибка отправки заявки на звонок");
    return response.data;
  },

  async sendQuestion(payload: AskQuestionPayload) {
    const body = {
      message: payload.message,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      product: payload.product,
      consent: payload.consent,
    };

    const response = await http.post<ApiOk>("/email/ask-question", body);
    assertOkResponse(response, "Ошибка отправки вопроса");
    return response.data;
  },
};
