import { get } from "svelte/store";
import { user, accessToken } from "$lib/stores/auth";
import { goto } from "$app/navigation";
import { showToast } from "$lib/stores/toast";

/**
 * Protect a page for authenticated users
 * @param {string} [role] Optional role requirement (e.g. 'admin')
 */
export function protectPage(requiredRole = null) {
  const currentUser = get(user);
  const token = get(accessToken);

  if (!token || !currentUser) {
    showToast("You must be logged in", "warning");
    goto("/");
    return false;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    showToast("Unauthorized access", "warning");
    goto("/");
    return false;
  }

  return true;
}