import { Cat } from "./typs";

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
  return await response.json();
}

const apiKay = localStorage.getItem("api-key") || "";

const api = {
  get: <TResponse>(url: string) =>
    request<TResponse>(url, { headers: { "x-api-key": apiKay } }),

  // Using `extends` to set a type constraint:
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, {
      method: "POST",
      body,
      headers: { "x-api-key": apiKay },
    }),
};

export function checkApiKey(key: string) {
  return request("/favourites", { headers: { "x-api-key": key } });
}

export async function getCats() {
  return await api.get<Cat[]>("/images/search");
}

export function getFavorites() {}

export function addFavorite() {}

export function deleteFavorite() {}
