import { http } from "./http";

export type RegisterBody = { name: string; email: string; password: string };
export type LoginBody = { email: string; password: string };

export type AuthResponse = {
  token?: string;
  user?: { id: string; name: string; email: string };
};

export const authApi = {
  register: (body: RegisterBody) =>
    http.post<AuthResponse>("/user/register", body).then((r) => r.data),

  login: (body: LoginBody) =>
    http.post<AuthResponse>("/user/login", body).then((r) => r.data),
};
