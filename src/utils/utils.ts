import { Cat, Favorite } from "./types";

const apiUrl = "https://api.thecatapi.com/v1";

export function useAuth() {
  return localStorage.getItem("api-key");
}

export function checkId(id: string) {
  let pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return pattern.test(id);
}

export async function request<TResponse>(
  url: string,
  config?: RequestInit
): Promise<TResponse> {
  const response = await fetch(`${apiUrl}${url}`, config);
  console.log("config", config);
  return await response.json();
}

const apiKay = localStorage.getItem("api-key") || "";

const api = {
  get: <TResponse>(url: string) =>
    request<TResponse>(url, {
      headers: { "x-api-key": apiKay, "Content-Type": "application/json" },
    }),

  post: <TResponse>(url: string, body: any) =>
    request<TResponse>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "x-api-key": apiKay, "Content-Type": "application/json" },
    }),

  delete: <TResponse>(url: string) =>
    request<TResponse>(url, {
      method: "DELETE",
      headers: { "x-api-key": apiKay, "Content-Type": "application/json" },
    }),
};

export function checkApiKey(key: string) {
  return request("/favourites", { headers: { "x-api-key": key } });
}

export async function getCats(page: number) {
  return await api.get<Cat[]>(
    `/images/search?sub_id=catapp&limit=10&page=${page}&include_favourite=1`
  );
}

export async function getFavorites() {
  return await api.get<Favorite[]>(`/favourites`);
}

export async function addFavorite(image_id: string) {
  return await api.post(`/favourites`, { image_id, "sub_id": "catapp" });
}

export async function deleteFavorite(image_id: number) {
  return await api.delete(`/favourites/${image_id}`);
}

export default function getDimensions(dom: HTMLElement | null) {
  return { width: (dom as HTMLElement).offsetWidth, height: (dom as HTMLElement).offsetHeight };
}

