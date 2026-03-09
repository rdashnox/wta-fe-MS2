<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { accessToken, user } from "$lib/stores/auth";
  import { showToast } from "$lib/stores/toast";
  import { getUserBookings, cancelBooking } from "$lib/services/bookings";
  import EditBookingModal from "$lib/components/EditBookingModal.svelte";
  import { get } from "svelte/store";

  let bookings = [];
  let loading = true;
  let error = null;

  let showEditModal = false;
  let selectedBooking = null;

  $: if ($user === null) {
    goto("/"); 
  }

  onMount(async () => {
    const token = get(accessToken);
    const currentUser = get(user);

    if (!token || !currentUser) {
      showToast("Please log in to view your bookings.", "error");
      await goto("/");
      return;
    }

    try {
      bookings = await getUserBookings();
    } catch (err) {
      console.error("Error fetching bookings:", err);
      error = err.message || "Failed to load bookings.";
      showToast(error, "error");
    } finally {
      loading = false;
    }
  });

  // Helper to format dates
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Add this function after the onMount block
  async function handleCancel(bookingId) {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return; // User cancelled the confirmation
    }

    try {
      await cancelBooking(bookingId);
      showToast("Booking cancelled successfully!", "success");
      // Refresh the list of bookings
      bookings = await getUserBookings();
    } catch (err) {
      console.error("Cancellation error:", err);
      showToast(err.message || "Failed to cancel booking.", "error");
    }
  }

  // Add this function after the handleCancel function
  function handleEdit(booking) {
    selectedBooking = booking;
    showEditModal = true;
  }

  // Add this function after the handleEdit function
  async function handleBookingUpdate(event) {
    const updatedBooking = event.detail;
    // Find the updated booking in the list and replace it
    bookings = bookings.map((b) =>
      b.id === updatedBooking.id ? updatedBooking : b,
    );
    showEditModal = false; // Close modal after update
    // Optionally, re-fetch all bookings if a simple map isn't enough (e.g., if sorting changes)
    // await fetchBookings();
  }
</script>

<div class="container py-5">
  <h2 class="mb-4">My Bookings</h2>

  {#if loading}
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="ms-2">Loading your bookings...</p>
    </div>
  {:else if error}
    <div class="alert alert-danger" role="alert">
      <strong>Error:</strong>
      {error}
    </div>
  {:else if bookings.length === 0}
    <div class="alert alert-info" role="alert">
      You don't have any bookings yet.
      <a href="/suites" class="alert-link">Explore rooms</a>.
    </div>
  {:else}
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {#each bookings as booking (booking.id)}
        <div class="col">
          <div class="card shadow-sm h-100">
            <div
              class="card-body"
              class:text-muted={booking.status === "cancelled"}
            >
              <h5 class="card-title">{booking.room?.type || "Unknown Room"}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Booking ID: {booking.id}
              </h6>
              <p class="card-text">
                Check-in: <strong>{formatDate(booking.checkInDate)}</strong><br
                />
                Check-out:
                <strong>{formatDate(booking.checkOutDate)}</strong><br />
                Guests: {booking.adults} Adults, {booking.children} Children<br
                />
                Board Type: {booking.boardType}<br />
                Total Cost:
                <strong>${booking.totalCost?.toFixed(2) || "N/A"}</strong><br />
                Status:
                <span
                  class="badge"
                  class:bg-primary={booking.status === "active"}
                  class:bg-secondary={booking.status === "cancelled"}
                  >{booking.status}</span
                >
              </p>
              <div class="d-flex justify-content-end">
                <!-- Placeholder for future Edit and Cancel buttons -->
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  on:click={() => handleEdit(booking)}
                  disabled={booking.status === "cancelled"}
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  on:click={() => handleCancel(booking.id)}
                  disabled={booking.status === "cancelled"}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

{#if showEditModal && selectedBooking}
  <EditBookingModal
    booking={selectedBooking}
    on:close={() => (showEditModal = false)}
    on:update={handleBookingUpdate}
  />
{/if}
