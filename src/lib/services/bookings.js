// src/lib/services/bookings.js
import { get } from "svelte/store";
import { accessToken } from "$lib/stores/auth.js";
import { API_BASE } from "$lib/api/config.js";
import { requireToken } from "$lib/utils/auth";

const API_URL = `${API_BASE}/booking`;

/** Create booking with auth */
export async function createBooking(bookingData) {
  const token = requireToken()

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      let message = "Booking failed";
      if (res.status === 401) {
        message = "Authentication expired. Please log in again.";
      } else {
        try {
          const error = await res.json();
          message = error.message || message;
        } catch (_) {}
      }
      throw new Error(message);
    }

    return await res.json();
  } catch (error) {
    console.error("Booking error:", error);
    throw error;
  }
}

/** Get current user's bookings */
export async function getUserBookings() {
  const token = requireToken();

  if (!token) {
    throw new Error("Authentication required to view bookings");
  }

  try {
    const res = await fetch(API_URL, { // Backend route is /api/booking
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      let message = "Failed to fetch bookings";
      try {
        const error = await res.json();
        message = error.message || message;
      } catch (_) {}
      throw new Error(message);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch bookings error:", error);
    throw error;
  }
}

/** Cancel a specific booking */
export async function cancelBooking(bookingId) {
  const token = requireToken();

  if (!token) {
    throw new Error("Authentication required to cancel a booking");
  }

  try {
    const res = await fetch(`${API_URL}/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      let message = "Failed to cancel booking";
      try {
        const error = await res.json();
        message = error.message || message;
      } catch (_) {}
      throw new Error(message);
    }

    return await res.json(); // Backend might return { message: "Booking cancelled successfully" }
  } catch (error) {
    console.error("Cancel booking error:", error);
    throw error;
  }
}

/** Update a specific booking */
export async function updateBooking(bookingId, updateData) {
  const token = requireToken();

  if (!token) {
    throw new Error("Authentication required to update a booking");
  }

  try {
    const res = await fetch(`${API_URL}/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      let message = "Failed to update booking";
      try {
        const error = await res.json();
        message = error.message || message;
      } catch (_) {}
      throw new Error(message);
    }

    return await res.json(); // Backend returns the updated booking
  } catch (error) {
    console.error("Update booking error:", error);
    throw error;
  }
}
