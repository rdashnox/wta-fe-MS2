import { API_BASE } from "$lib/api/config.js";
import { user, accessToken, authUpdated } from "$lib/stores/auth"; // Import stores

const API_URL = `${API_BASE}/auth`;

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}

export async function logout() {
  user.set(null);
  accessToken.set(null);
  authUpdated.update(n => n + 1); // Trigger TopNav update
  return Promise.resolve();
}
