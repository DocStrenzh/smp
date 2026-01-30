import React, { useEffect, useMemo, useState } from "react";
import ServiceListLayout, { ServiceItem, Breadcrumb } from "../layouts/ServiceListLayout";
import { http } from "../api/http";

type ApiSectionListItem = {
  id: string;
  title: string;
  label: string;
  slug: string;
  image: string;
  hasGallery: boolean;
  hasCatalog: boolean;
};

type ApiSectionListResponse = {
  items: ApiSectionListItem[];
};

const breadcrumbs: Breadcrumb[] = [{ label: "Главная", href: "/" }, { label: "Услуги" }];

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const introParagraphs = useMemo(
    () => [
      "Компания СМП97 оказывает целый спектр услуг.",
      "Собственное производство. Выполняем полный цикл работ. По заявке наш специалист выезжает к вам на объект, согласовывает планируемую постройку, делает необходимые замеры, дает рекомендации. Выезд на замер бесплатный. Установка, изготовление, отправка по городу и Воронежской области.",
    ],
    []
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await http.get<ApiSectionListResponse>("/sections");

        const mapped: ServiceItem[] = (data.items ?? []).map((s) => ({
          id: s.id,
          name: s.title,
          image: s.image,
          slug: s.slug,
        }));

        if (mounted) setServices(mapped);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e?.message || "Не удалось загрузить список услуг.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm text-gray-700">Загрузка услуг…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <ServiceListLayout
      title="Услуги"
      breadcrumbs={breadcrumbs}
      supportImage="/images/support.jpg"
      introParagraphs={introParagraphs}
      services={services}
    />
  );
};

export default ServicesPage;
