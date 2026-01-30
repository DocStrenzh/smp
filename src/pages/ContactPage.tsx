import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuickActions } from "../components/QuickActionProvider";
import { http } from "../api/http";

type ApiEmailResponse = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type ApiPhoneItem = {
  id: string;
  phone: string;
  label: string;
  sortOrder: number;
  created_at: string;
  updated_at: string;
};

type ApiPhonesResponse = {
  items: ApiPhoneItem[];
};

type ApiAddressItem = {
  id: string;
  title: string;
  address: string;
  lat: number;
  lon: number;
  sortOrder: number;
  created_at: string;
  updated_at: string;
};

type ApiAddressesResponse = {
  items: ApiAddressItem[];
};

const ContactPage: React.FC = () => {
  const { openAction } = useQuickActions();

  const mapSrc =
    "https://yandex.ru/map-widget/v1/?um=constructor%3A3841c843ec0107c8579967f19fb2eb1cb2e481f0ae5f08f418a32562a68e991d&source=constructor";


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [phones, setPhones] = useState<ApiPhoneItem[]>([]);
  const [addresses, setAddresses] = useState<ApiAddressItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [emailRes, phonesRes, addrRes] = await Promise.all([
          http.get<ApiEmailResponse>("/contacts/email"),
          http.get<ApiPhonesResponse>("/contacts/numbers"),
          http.get<ApiAddressesResponse>("/contacts/addresses"),
        ]);

        if (!mounted) return;

        setEmail((emailRes.data?.email ?? "").trim());

        const sortedPhones = [...(phonesRes.data?.items ?? [])].sort(
          (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
        );
        setPhones(sortedPhones);

        const sortedAddresses = [...(addrRes.data?.items ?? [])].sort(
          (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
        );
        setAddresses(sortedAddresses);
      } catch (e: any) {
        if (!mounted) return;
        setError(
          e?.response?.data?.message ||
          e?.message ||
          "Не удалось загрузить контакты."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const primaryAddress = useMemo(() => addresses[0] ?? null, [addresses]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-8">
        <div className="text-xs text-gray-400">
          <Link to="/" className="hover:text-gray-600">
            Главная
          </Link>
          <span> &nbsp;-&nbsp; </span>
          <span>Контакты</span>
        </div>

        <h1 className="mt-4 text-4xl font-medium text-gray-900">Контакты</h1>

        {loading && (
          <p className="mt-4 text-sm text-gray-600">Загрузка контактов…</p>
        )}

        {!loading && error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className="w-full">
        <div className="h-[420px] w-full md:h-[520px]">
          <iframe
            src={mapSrc}
            title="Yandex Map"
            className="h-full w-full"
            frameBorder={0}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-medium text-gray-900">
          {primaryAddress?.title ?? "Контакты"}
        </h2>

        <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 md:grid-cols-[260px,1fr,1fr,160px] md:items-center">
            <div className="h-40 w-full overflow-hidden bg-gray-100">
              <img
                src="/images/office.jpg"
                alt="Офис СМП-97"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-800">
              <p className="font-semibold">
                {primaryAddress?.address ?? "Адрес не указан"}
              </p>

              <p className="text-xs text-gray-500">
                Режим работы: <span className="font-medium">09:00 – 20:00</span>
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              {phones.length > 0 ? (
                phones.map((p) => (
                  <div key={p.id}>
                    <p className="font-semibold">{p.phone}</p>
                    <p className="text-xs text-gray-500">{p.label}</p>
                  </div>
                ))
              ) : (
                <div>
                  <p className="font-semibold">Телефон не указан</p>
                </div>
              )}

              <div>
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-lime-400 hover:text-lime-300"
                  >
                    {email}
                  </a>
                ) : (
                  <span className="font-semibold text-gray-800">
                    Email не указан
                  </span>
                )}
                <p className="text-xs text-gray-500">электронная почта</p>
              </div>
            </div>

            <div className="flex md:justify-end">
              <button
                type="button"
                onClick={() => openAction("question")}
                className="w-full bg-lime-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300"
              >
                Написать
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => openAction("map")}
            className="text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            Открыть карту в боковом меню →
          </button>
        </div>

        {addresses.length > 1 && (
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Другие адреса
            </h3>
            <ul className="space-y-3">
              {addresses.slice(1).map((a) => (
                <li key={a.id} className="border border-gray-200 bg-white p-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {a.title}
                  </div>
                  <div className="text-sm text-gray-700">{a.address}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactPage;
