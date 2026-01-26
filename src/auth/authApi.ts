import { http } from "../api/http";
import type { ApiLoginResponse, ApiRegisterResponse, RegisterInput } from "./authTypes";

export const authApi = {
  async register(input: RegisterInput): Promise<void> {
    const res = await http.post<ApiRegisterResponse>("/user/register", input);

    if (res.data?.status !== "ok" && res.data?.data?.status !== "ok") {
      throw new Error("REGISTER_FAILED");
    }
  },

  async login(input: { login: string; password: string }) {
    const res = await http.post<ApiLoginResponse>("/user/login", input);
    if (!res.data?.user?.Id) throw new Error("LOGIN_FAILED");
    return res.data.user;
  },
};
