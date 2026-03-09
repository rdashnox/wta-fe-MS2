// src/lib/utils/api.js
import { get } from "svelte/store";
import { accessToken } from "$lib/stores/auth";

export function authHeaders() {
  const token = get(accessToken);
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function fetchWithAuth(url, options = {}) {
  const headers = authHeaders();
  if (!headers) throw new Error("No access token found");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Request failed");
  }

  return res.json();
}
