import { API_BASE } from "$lib/api/config";
import { fetchWithAuth } from "$lib/utils/api";

export async function fetchAdminData() {
  const [usersData, bookingsData, messagesData, subscriptionsData] =
    await Promise.all([
      fetchWithAuth(`${API_BASE}/users`),
      fetchWithAuth(`${API_BASE}/booking/all?status=active`),
      fetchWithAuth(`${API_BASE}/contact`),
      fetchWithAuth(`${API_BASE}/subscription`),
    ]);

  return {
    users: Array.isArray(usersData) ? usersData : [usersData],
    bookings: bookingsData,
    messages: messagesData.messages || messagesData,
    subscriptions: subscriptionsData,
  };
}
