import React, { useEffect, useMemo, useState } from "react";
import { quickActions, type QuickActionId } from "../constants/quickActions";
import { quickActionsApi } from "../api/quickActionsApi";
import { reviewsApi } from "../api/reviewsApi";
import { useQuickActions } from "./QuickActionProvider";

const DrawerShell: React.FC<{
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, title, onClose, children }) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140]">
      <button
        type="button"
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
        aria-label="Закрыть"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-[560px] bg-white shadow-2xl">
        <div className="h-full animate-[qaSlideIn_.25s_ease-out] overflow-y-auto px-10 py-8">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-semibold text-neutral-900">{title}</h2>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()
              }
              onClick={onClose}
              aria-label="Закрыть"
              className="rounded-full p-2 text-neutral-300 hover:bg-neutral-50 hover:text-neutral-800"
            >
              ✕
            </button>
          </div>

          <div className="mt-6">{children}</div>
        </div>

        <style>{`@keyframes qaSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      </aside>
    </div>
  );
};

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({
                                                                                             label,
                                                                                             required,
                                                                                             children,
                                                                                           }) => (
  <label className="block">
    <div className="text-sm text-neutral-400">
      {label} {required && <span className="text-red-500">*</span>}
    </div>
    <div className="mt-3">{children}</div>
  </label>
);

const UnderlineInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={[
      "w-full border-0 border-b border-neutral-200 bg-transparent py-3 text-sm text-neutral-900 outline-none",
      "placeholder:text-neutral-300",
      props.className ?? "",
    ].join(" ")}
  />
);

const UnderlineTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={[
      "w-full resize-none border-0 border-b border-neutral-200 bg-transparent py-3 text-sm text-neutral-900 outline-none",
      "placeholder:text-neutral-300",
      props.className ?? "",
    ].join(" ")}
  />
);

const ConsentRow: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({
                                                                                      checked,
                                                                                      onChange,
                                                                                    }) => (
  <div className="flex items-center gap-3 pt-2 text-sm text-neutral-700">
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onChange(!checked)}
      className={[
        "relative h-5 w-10 rounded-full border transition",
        checked ? "bg-lime-400 border-lime-400" : "bg-neutral-200 border-neutral-200",
      ].join(" ")}
      aria-label="Согласие"
    >
      <span
        className={[
          "absolute top-0.5 h-4 w-4 rounded-full bg-white transition",
          checked ? "left-5" : "left-0.5",
        ].join(" ")}
      />
    </button>

    <div>
      Я согласен на обработку{" "}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        className="text-lime-500 hover:text-lime-600"
      >
        персональных данных
      </button>
    </div>
  </div>
);

const QuickActionsPanel: React.FC = () => {
  const { activeId, isOpen, openAction, closeAction } = useQuickActions();

  const panelIds: QuickActionId[] = ["callback", "question"];
  const panelActions = useMemo(() => quickActions.filter((a) => panelIds.includes(a.id)), []);

  const title = useMemo(() => {
    const found = quickActions.find((a) => a.id === activeId);
    return found?.title ?? "";
  }, [activeId]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const resetAlerts = () => {
    setError(null);
    setOk(null);
  };

  // callback
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbConsent, setCbConsent] = useState(false);

  // question
  const [qMsg, setQMsg] = useState("");
  const [qName, setQName] = useState("");
  const [qPhone, setQPhone] = useState("");
  const [qEmail, setQEmail] = useState("");
  const [qProduct, setQProduct] = useState("");
  const [qConsent, setQConsent] = useState(false);

  // review
  const [rName, setRName] = useState("");
  const [rPosition, setRPosition] = useState("");
  const [rText, setRText] = useState("");
  const [rRating, setRRating] = useState(5);
  const [rConsent, setRConsent] = useState(false);
  const [rPhoto, setRPhoto] = useState<File | null>(null);

  const mapConstructorId =
    "3841c843ec0107c8579967f19fb2eb1cb2e481f0ae5f08f418a32562a68e991d";

  const mapWidgetSrc = `https://yandex.ru/map-widget/v1/?um=constructor%3A${mapConstructorId}&source=constructor`;

  const mapOpenUrl = "https://yandex.ru/maps/";


  const submitCallback = async () => {
    resetAlerts();
    if (!cbName.trim()) return setError("Введите имя");
    if (!cbPhone.trim()) return setError("Введите телефон");
    if (!cbConsent) return setError("Нужно согласие на обработку персональных данных");

    setLoading(true);
    try {
      await quickActionsApi.sendCallback({
        name: cbName.trim(),
        phone: cbPhone.trim(),
        consent: cbConsent,
      });

      setOk("Спасибо! Мы скоро вам перезвоним.");
      setCbName("");
      setCbPhone("");
      setCbConsent(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось отправить. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const submitQuestion = async () => {
    resetAlerts();
    if (!qMsg.trim()) return setError("Введите сообщение");
    if (!qName.trim()) return setError("Введите имя");
    if (!qPhone.trim()) return setError("Введите телефон");
    if (!qConsent) return setError("Нужно согласие на обработку персональных данных");

    setLoading(true);
    try {
      await quickActionsApi.sendQuestion({
        message: qMsg.trim(),
        name: qName.trim(),
        phone: qPhone.trim(),
        email: qEmail.trim() || undefined,
        product: qProduct.trim() || undefined,
        consent: qConsent,
      });

      setOk("Вопрос отправлен! Мы свяжемся с вами.");
      setQMsg("");
      setQName("");
      setQPhone("");
      setQEmail("");
      setQProduct("");
      setQConsent(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось отправить. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    resetAlerts();
    if (!rName.trim()) return setError("Введите имя");
    if (!rPosition.trim()) return setError("Введите должность/компанию");
    if (!rText.trim()) return setError("Введите текст отзыва");
    if (!(rRating >= 1 && rRating <= 5)) return setError("Рейтинг должен быть от 1 до 5");
    if (!rConsent) return setError("Нужно согласие на обработку персональных данных");

    setLoading(true);
    try {
      await reviewsApi.create({
        name: rName.trim(),
        position: rPosition.trim(),
        text: rText.trim(),
        rating: rRating,
        consent: rConsent,
        photo: rPhoto,
      });

      setOk("Спасибо! Отзыв отправлен.");
      setRName("");
      setRPosition("");
      setRText("");
      setRRating(5);
      setRConsent(false);
      setRPhoto(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось отправить отзыв. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (): React.ReactNode => {
    switch (activeId) {
      case "callback":
        return (
          <div className="space-y-8">
            <div className="text-sm text-neutral-700">Представьтесь, мы вам перезвоним.</div>

            <Field label="Ваше имя" required>
              <UnderlineInput value={cbName} onChange={(e) => setCbName(e.target.value)} />
            </Field>

            <Field label="Телефон" required>
              <UnderlineInput value={cbPhone} onChange={(e) => setCbPhone(e.target.value)} />
            </Field>

            <ConsentRow checked={cbConsent} onChange={setCbConsent} />

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {ok && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {ok}
              </div>
            )}

            <button
              type="button"
              disabled={loading}
              onMouseDown={(e) => e.preventDefault()}
              onClick={submitCallback}
              className="h-11 w-[160px] bg-lime-400 text-sm font-semibold text-neutral-900 hover:bg-lime-300 disabled:opacity-60"
            >
              {loading ? "Отправляем..." : "Отправить"}
            </button>
          </div>
        );

      case "question":
        return (
          <div className="space-y-8">
            <div className="text-sm text-neutral-700">
              Менеджеры компании с радостью ответят на ваши вопросы, рассчитают стоимость услуг и подготовят коммерческое
              предложение.
            </div>

            <Field label="Сообщение" required>
              <UnderlineTextarea rows={4} value={qMsg} onChange={(e) => setQMsg(e.target.value)} />
            </Field>

            <Field label="Ваше имя" required>
              <UnderlineInput value={qName} onChange={(e) => setQName(e.target.value)} />
            </Field>

            <Field label="Телефон" required>
              <UnderlineInput value={qPhone} onChange={(e) => setQPhone(e.target.value)} />
            </Field>

            <Field label="E-mail">
              <UnderlineInput value={qEmail} onChange={(e) => setQEmail(e.target.value)} />
            </Field>

            <Field label="Товар">
              <UnderlineInput value={qProduct} onChange={(e) => setQProduct(e.target.value)} />
            </Field>

            <ConsentRow checked={qConsent} onChange={setQConsent} />

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {ok && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {ok}
              </div>
            )}

            <button
              type="button"
              disabled={loading}
              onMouseDown={(e) => e.preventDefault()}
              onClick={submitQuestion}
              className="h-11 w-[160px] bg-lime-400 text-sm font-semibold text-neutral-900 hover:bg-lime-300 disabled:opacity-60"
            >
              {loading ? "Отправляем..." : "Отправить"}
            </button>
          </div>
        );

      case "map":
        return (
          <div className="space-y-6">
            <div className="text-sm text-neutral-700">Как добраться до нас:</div>

            <div className="h-[520px] w-full overflow-hidden rounded-xl border bg-neutral-50">
              <iframe
                src={mapWidgetSrc}
                title="Yandex Map"
                className="h-full w-full"
                frameBorder={0}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="text-sm text-neutral-700">Адрес: г. Воронеж, Монтажный проезд, д. 5/1</div>

            <div className="flex items-center gap-4">
              <a
                href={mapOpenUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center bg-lime-400 px-6 text-sm font-semibold text-neutral-900 hover:bg-lime-300"
              >
                Открыть в Яндекс.Картах
              </a>

              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  resetAlerts();
                  openAction("question");
                }}
                className="inline-flex h-11 items-center justify-center border border-neutral-200 px-6 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Задать вопрос
              </button>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="space-y-8">
            <div className="text-sm text-neutral-700">Оставьте отзыв — можно прикрепить фото (необязательно).</div>

            <Field label="Ваше имя" required>
              <UnderlineInput value={rName} onChange={(e) => setRName(e.target.value)} />
            </Field>

            <Field label="Должность / компания" required>
              <UnderlineInput value={rPosition} onChange={(e) => setRPosition(e.target.value)} />
            </Field>

            <Field label="Текст отзыва" required>
              <UnderlineTextarea rows={5} value={rText} onChange={(e) => setRText(e.target.value)} />
            </Field>

            <Field label="Рейтинг (1–5)" required>
              <div className="flex items-center gap-3">
                <UnderlineInput
                  type="number"
                  min={1}
                  max={5}
                  value={rRating}
                  onChange={(e) => setRRating(Number(e.target.value))}
                />
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: Math.max(0, Math.min(5, rRating)) }).map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </Field>

            <Field label="Фото (необязательно)">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-neutral-700"
                onChange={(e) => setRPhoto(e.target.files?.[0] ?? null)}
              />
              {rPhoto && <div className="mt-2 text-xs text-neutral-500">{rPhoto.name}</div>}
            </Field>

            <ConsentRow checked={rConsent} onChange={setRConsent} />

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {ok && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {ok}
              </div>
            )}

            <button
              type="button"
              disabled={loading}
              onMouseDown={(e) => e.preventDefault()}
              onClick={submitReview}
              className="h-11 w-[200px] bg-lime-400 text-sm font-semibold text-neutral-900 hover:bg-lime-300 disabled:opacity-60"
            >
              {loading ? "Отправляем..." : "Отправить отзыв"}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed right-6 top-1/2 z-[120] -translate-y-1/2">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {panelActions.map((a) => {
            const isActive = a.id === activeId;
            const src = isActive && a.activeIcon ? a.activeIcon : a.icon;

            const accent =
              a.id === "callback"
                ? "border-[3px] border-lime-400"
                : "border-[3px] border-red-400";

            const activeRing =
              a.id === "callback"
                ? "ring-4 ring-lime-300/40"
                : "ring-4 ring-red-300/40";

            return (
              <button
                key={a.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  resetAlerts();
                  openAction(a.id);
                }}
                className={[
                  "flex h-[74px] w-[74px] items-center justify-center",
                  "rounded-xl",
                  "border-b last:border-b-0",
                  accent,
                  "transition-all duration-200",
                  "hover:bg-neutral-50",
                  isActive ? `bg-neutral-50 ${activeRing}` : "bg-white",
                ].join(" ")}
                title={a.title}
                aria-label={a.title}
              >
                <img src={src} alt="" className="h-8 w-8 object-contain" />
              </button>
            );
          })}
        </div>
      </div>

      <DrawerShell
        open={isOpen}
        title={title}
        onClose={() => {
          resetAlerts();
          closeAction();
        }}
      >
        {renderContent()}
      </DrawerShell>
    </>
  );
};

export default QuickActionsPanel;
