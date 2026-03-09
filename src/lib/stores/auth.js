// src/lib/stores/auth.js
import { writable } from "svelte/store";
import { browser } from "$app/environment";

const storedUser = browser ? localStorage.getItem("user") : null;
const storedToken = browser ? localStorage.getItem("access") : null;

// Store user data
export const user = writable(storedUser ? JSON.parse(storedUser) : null);

export const accessToken = writable(storedToken || null);

export const isAuthenticated = writable(!!storedToken);

// Store to force TopNav re-render
export const authUpdated = writable(0);

// Persist only in browser
if (browser) {
  // Sync user data with localStorage
  user.subscribe((value) => {
    if (value) {
      localStorage.setItem("user", JSON.stringify(value));
    } else {
      localStorage.removeItem("user");
    }
  });

  // Sync access token with localStorage
  accessToken.subscribe((value) => {
    if (value) {
      localStorage.setItem("access", value);
      isAuthenticated.set(true);
    } else {
      localStorage.removeItem("access");
      isAuthenticated.set(false);
    }
  });
}
