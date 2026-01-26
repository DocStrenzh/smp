import type { AppUser, AuthTokens } from "./authTypes";

const LS_KEY = "smp97_auth";
const SS_KEY = "smp97_auth_session";

export type StoredAuth = {
  user: AppUser;
  tokens: AuthTokens; // сейчас null
};

const safeParse = (raw: string | null): StoredAuth | null => {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as StoredAuth;
    if (!v?.user?.id) return null;
    return v;
  } catch {
    return null;
  }
};

export const authStorage = {
  load(): StoredAuth | null {
    return safeParse(localStorage.getItem(LS_KEY));
  },

  loadSession(): StoredAuth | null {
    return safeParse(sessionStorage.getItem(SS_KEY));
  },

  savePersistent(user: AppUser, tokens: AuthTokens) {
    const payload: StoredAuth = { user, tokens };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    sessionStorage.removeItem(SS_KEY);
  },

  saveSession(user: AppUser, tokens: AuthTokens) {
    const payload: StoredAuth = { user, tokens };
    sessionStorage.setItem(SS_KEY, JSON.stringify(payload));
    localStorage.removeItem(LS_KEY);
  },

  clear() {
    localStorage.removeItem(LS_KEY);
    sessionStorage.removeItem(SS_KEY);
  },
};
