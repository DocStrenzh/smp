export type LoginInput = {
  login: string;
  password: string;
  remember: boolean;
};

export type RegisterInput = {
  surname: string;
  name: string;
  login: string;
  fathername: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type ApiLoginResponse = {
  user: {
    Id: string;
    Surname: string;
    LoginName: string;
    Fathername: string;
    Email: string;
    PhoneNumber: string;
    HashedPassword: string;
  };
};

export type ApiRegisterResponse = {
  data: { status: "ok" | string };
  status: "ok" | string;
};

export type AppUser = {
  id: string;
  surname: string;
  name?: string;
  fathername: string;
  login: string;
  email: string;
  phoneNumber: string;

  displayName: string;
};

export type AuthTokens = null;

export type AuthState = {
  user: AppUser | null;
  tokens: AuthTokens;
  isReady: boolean;
};

export type AuthContextValue = AuthState & {
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;

  openAuth: (mode?: "login" | "register") => void;
  closeAuth: () => void;

  isAuthOpen: boolean;
  authMode: "login" | "register";
};
