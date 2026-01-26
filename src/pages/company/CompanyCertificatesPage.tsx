import React, { useEffect, useMemo, useState } from "react";
import { certificatesApi, type CertificateDto } from "../../api/certificatesApi";

const CompanyCertificatesPage: React.FC = () => {
  const [items, setItems] = useState<CertificateDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mainPdf = useMemo(() => certificatesApi.mainPdfUrl(), []);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await certificatesApi.list();
      setItems(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить сертификаты");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-neutral-700">
        Наша компания имеет все необходимые лицензионные разрешения на проводимые работы.
        Все материалы, которые мы используем в работе, имеют сертификаты качества.
      </p>

      <div className="rounded-xl border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-neutral-900">Сертификаты</div>

          <a
            href={mainPdf}
            download
            className="inline-flex h-10 items-center justify-center bg-lime-400 px-4 text-sm font-semibold text-neutral-900 hover:bg-lime-300"
          >
            Скачать
          </a>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && <div className="mt-4 text-sm text-neutral-600">Загрузка…</div>}

        {!loading && !error && (
          <div className="mt-4 text-sm text-neutral-600">
            {items.length > 0
              ? `Доступно сертификатов: ${items.length}. Основной файл можно скачать кнопкой выше.`
              : "Сертификатов пока нет."}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCertificatesPage;
