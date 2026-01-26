import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";
import { socialAuthProviders } from "../constants/socialAuth";
import type { RegisterInput } from "./authTypes";

type Props = { open: boolean; onClose: () => void };
type Mode = "login" | "register";

const AuthDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { login, register } = useAuth();

  const [mode, setMode] = useState<Mode>("login");

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [regLogin, setRegLogin] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => setError(null), [mode]);

  const title = useMemo(
    () => (mode === "login" ? "Вход в личный кабинет" : "Регистрация"),
    [mode]
  );

  if (!open) return null;

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ login: loginValue, password, remember });
      onClose();
    } catch {
      setError("Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!surname.trim()) return setError("Введите фамилию");
    if (!name.trim()) return setError("Введите имя");
    if (!regLogin.trim()) return setError("Введите логин");
    if (!email.trim()) return setError("Введите email");
    if (!phoneNumber.trim()) return setError("Введите телефон");
    if (regPassword.length < 3) return setError("Пароль слишком короткий");
    if (regPassword !== regPassword2) return setError("Пароли не совпадают");
    if (!agree) return setError("Необходимо согласие");

    const payload: RegisterInput = {
      surname: surname.trim(),
      name: name.trim(),
      login: regLogin.trim(),
      fathername: fathername.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      password: regPassword,
    };

    setLoading(true);
    try {
      await register(payload);

      setMode("login");
      setLoginValue(payload.login);
      setPassword(payload.password);
    } catch {
      setError("Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  const SocialButtons = () => (
    <div className="pt-8">
      <div className="flex items-center gap-4">
        <div className="text-sm text-neutral-700">Быстрый вход через соцсети</div>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <div className="mt-5 flex items-center gap-3">
        {socialAuthProviders.map((s) => (
          <button
            key={s.id}
            type="button"
            title={s.title}
            className="h-10 w-10 rounded-full border bg-white hover:bg-neutral-50"
          >
            <img src={s.icon} alt={s.title} className="h-full w-full object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[130]">
      <button className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-[560px] bg-white shadow-2xl">
        <div className="h-full animate-[slideIn_.25s_ease-out] overflow-y-auto px-10 py-8">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-black">
              ✕
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={submitLogin} className="mt-10 space-y-8">
              <input
                placeholder="Логин"
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />

              <label className="flex items-center gap-3 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Запомнить меня
              </label>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex gap-4">
                <button
                  disabled={loading}
                  className="h-11 w-32 bg-lime-400 font-semibold disabled:opacity-60"
                >
                  {loading ? "..." : "Войти"}
                </button>

                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="border px-6"
                  disabled={loading}
                >
                  Регистрация
                </button>
              </div>

              <SocialButtons />
            </form>
          ) : (
            <form onSubmit={submitRegister} className="mt-10 space-y-6">
              <input
                placeholder="Фамилия *"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                placeholder="Имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                placeholder="Отчество"
                value={fathername}
                onChange={(e) => setFathername(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                placeholder="Логин *"
                value={regLogin}
                onChange={(e) => setRegLogin(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                placeholder="Телефон *"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                type="password"
                placeholder="Пароль *"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />
              <input
                type="password"
                placeholder="Повтор пароля *"
                value={regPassword2}
                onChange={(e) => setRegPassword2(e.target.value)}
                className="w-full border-b py-3 outline-none"
              />

              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={agree} onChange={() => setAgree((v) => !v)} />
                Согласен на обработку персональных данных
              </label>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex gap-4">
                <button
                  disabled={loading}
                  className="h-11 w-40 bg-lime-400 font-semibold disabled:opacity-60"
                >
                  {loading ? "..." : "Регистрация"}
                </button>

                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="border px-6"
                  disabled={loading}
                >
                  Назад ко входу
                </button>
              </div>

              <SocialButtons />
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes slideIn { from {transform:translateX(100%)} to {transform:translateX(0)} }`}</style>
    </div>
  );
};

export default AuthDrawer;
