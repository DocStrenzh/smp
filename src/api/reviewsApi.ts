import { http, API_BASE_URL } from "./http";

export type ReviewDto = {
  id: string | number;
  name: string;
  position?: string;
  text: string;
  rating: number;
  photo?: string;
  date?: string;
};

export type CreateReviewPayload = {
  name: string;
  position: string;
  text: string;
  rating: number;
  consent: boolean;
  photo?: File | null;
};

type ReviewsApiResponse =
  | ReviewDto[]
  | { data?: ReviewDto[] }
  | { items?: any[] }
  | { data?: { items?: any[] } };

function absUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${API_BASE_URL}${pathOrUrl}`;
}

function toItems(raw: ReviewsApiResponse): any[] {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray((raw as any)?.items)) return (raw as any).items;
  if (Array.isArray((raw as any)?.data)) return (raw as any).data;
  if (Array.isArray((raw as any)?.data?.items)) return (raw as any).data.items;
  return [];
}

function mapReview(r: any): ReviewDto {
  return {
    id: String(r.id ?? r.Id ?? r.reviewId ?? r.ReviewId),
    name: String(r.name ?? r.Name ?? "Без имени"),
    position: r.position ?? r.Position ?? undefined,
    text: String(r.text ?? r.Text ?? ""),
    rating: Number(r.rating ?? r.Rating ?? 0) || 0,
    photo: absUrl(r.imagePath ?? r.photo ?? r.avatar),
    date: r.createdAt ?? r.date ?? undefined,
  };
}

export const reviewsApi = {
  async list(): Promise<ReviewDto[]> {
    const res = await http.get<ReviewsApiResponse>("/reviews");
    const items = toItems(res.data)
      .filter((r) => r?.canPublish !== false)
      .map(mapReview);

    return items;
  },

  async create(payload: CreateReviewPayload): Promise<{ id: string | number }> {
    const fd = new FormData();
    fd.append("name", payload.name);
    fd.append("position", payload.position);
    fd.append("text", payload.text);
    fd.append("rating", String(payload.rating));
    fd.append("consent", payload.consent ? "true" : "false");
    if (payload.photo) fd.append("photo", payload.photo);

    const res = await http.post<{ id: string | number }>("/reviews", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status !== 200 || !res.data?.id) throw new Error("Ошибка отправки отзыва");
    return res.data;
  },
};
