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
  interest?: string;
  consent: boolean;
};

type ApiOkResponse = {
  status: "ok";
};

function assertOkResponse(
  response: { status: number; data: any },
  errorMessage: string
) {
  if (response.status !== 200) {
    //throw new Error(`HTTP ${response.status}`);
  }

  if (!response.data || response.data.status !== "ok") {
    //throw new Error(errorMessage);
  }
}

export const quickActionsApi = {
  async sendCallback(payload: CallbackPayload) {
    const body = {
      name: payload.name,
      phoneNumber: payload.phone,
      consent: payload.consent,
    };

    const response = await http.post<ApiOkResponse>(
      "/email/callback",
      body
    );

    assertOkResponse(response, "Ошибка отправки заявки на звонок");

    return response.data;
  },

  async sendQuestion(payload: AskQuestionPayload) {
    const body = {
      message: payload.message,
      name: payload.name,
      phoneNumber: payload.phone,
      email: payload.email,
      interest: payload.interest,
      consent: payload.consent,
    };

    const response = await http.post<ApiOkResponse>(
      "/email/ask-question",
      body
    );

    assertOkResponse(response, "Ошибка отправки вопроса");

    return response.data;
  },
};
