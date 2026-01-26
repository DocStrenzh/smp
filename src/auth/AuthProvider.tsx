import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
  AuthContextValue,
  AuthState,
  LoginInput,
  RegisterInput,
  AppUser,
} from "./authTypes";
import { authApi } from "./authApi";
import { authStorage } from "./authStorage";

const AuthContext = createContext<AuthContextValue | null>(null);


const mapApiUserToAppUser = (u: any): AppUser => ({
  id: u.Id,
  surname: u.Surname ?? "",
  fathername: u.Fathername ?? "",
  login: u.LoginName ?? "",
  email: u.Email ?? "",
  phoneNumber: u.PhoneNumber ?? "",
  displayName: u.Surname || u.LoginName || "Пользователь",
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: null,
    isReady: false,
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");


  useEffect(() => {
    const persisted = authStorage.load();
    const session = authStorage.loadSession();
    const found = session ?? persisted;

    if (found) {
      setState({
        user: found.user,
        tokens: null,
        isReady: true,
      });
    } else {
      setState((s) => ({ ...s, isReady: true }));
    }
  }, []);


  const login = async (input: LoginInput) => {
    const apiUser = await authApi.login({
      login: input.login,
      password: input.password,
    });

    const user = mapApiUserToAppUser(apiUser);

    authStorage.clear();
    if (input.remember) {
      authStorage.savePersistent(user, null);
    } else {
      authStorage.saveSession(user, null);
    }

    setState({ user, tokens: null, isReady: true });
    setIsAuthOpen(false);
  };


  const register = async (input: RegisterInput) => {
    await authApi.register(input);
  };

  const logout = () => {
    authStorage.clear();
    setState({ user: null, tokens: null, isReady: true });
  };

  const openAuth = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      login,
      register,
      logout,
      openAuth,
      closeAuth,
      isAuthOpen,
      authMode,
    }),
    [state, isAuthOpen, authMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
