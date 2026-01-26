import { http, API_BASE_URL } from "./http";

export type CertificateDto = {
  id: number | string;
  title?: string;
  name?: string;
  file?: string;
  url?: string;
  createdAt?: string;
};

type ListResp<T> = T[] | { data: T[] };

const toArray = <T,>(x: ListResp<T>): T[] => (Array.isArray(x) ? x : x?.data ?? []);

function absUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${API_BASE_URL}${pathOrUrl}`;
}

export const certificatesApi = {
  mainPdfUrl(): string {
    return `${API_BASE_URL}/certificates/file/main.pdf`;
  },

  async list(): Promise<CertificateDto[]> {
    const res = await http.get<ListResp<any>>("/certificates/");
    return toArray(res.data).map((raw) => ({
      id: raw.id ?? raw.ID ?? raw._id ?? raw.name ?? raw.title,
      title: raw.title ?? raw.name ?? raw.label,
      name: raw.name ?? raw.title ?? raw.label,
      file: absUrl(raw.file ?? raw.path),
      url: absUrl(raw.url),
      createdAt: raw.createdAt ?? raw.created_at ?? raw.date,
    }));
  },

  async uploadMainPdf(file: File): Promise<void> {
    const fd = new FormData();
    // чаще всего бэки ждут field name "file"
    fd.append("file", file);

    const res = await http.put("/certificates/file/main.pdf", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status < 200 || res.status >= 300) {
      throw new Error(`HTTP ${res.status}`);
    }
  },
};
