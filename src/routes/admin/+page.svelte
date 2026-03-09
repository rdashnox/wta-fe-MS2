<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { get } from "svelte/store";

  import { API_BASE } from "$lib/api/config";
  import { user, accessToken } from "$lib/stores/auth";
  import { showToast } from "$lib/stores/toast";
  import { fetchWithAuth } from "$lib/utils/api";
  import { fetchAdminData } from "$lib/utils/admin";

  // Admin page state
  let users = [];
  let bookings = [];
  let messages = [];
  let subscriptions = [];

  let loading = true;
  let errorMessage = "";
  let currentTab = "users";
  let adminEmail = "";

  async function reloadAdminDashboards() {
    loading = true;
    errorMessage = "";

    try {
      const data = await fetchAdminData();

      users = data.users;
      bookings = data.bookings;
      messages = data.messages;
      subscriptions = data.subscriptions;
    } catch (err) {
      console.error(err);
      errorMessage = "Failed to load dashboard data";
      showToast("Failed to load admin dashboard", "error");
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const currentUser = get(user);

    if (!currentUser) {
      showToast("Not logged in", "warning");
      goto("/");
      return;
    }

    if (currentUser.role !== "admin") {
      showToast("Unauthorized access", "warning");
      goto("/");
      return;
    }

    adminEmail = currentUser.email;

    await reloadAdminDashboards();

    window.$reloadAdminDashboards = reloadAdminDashboards;
  });

  async function handleDelete(type, id) {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const url =
        type === "booking"
          ? `${API_BASE}/booking/${id}`
          : `${API_BASE}/users/${id}`;

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${get(accessToken)}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      if (type === "booking") {
        bookings = bookings.filter((b) => (b._id || b.id) !== id);
        showToast("Booking cancelled successfully", "success");
      }

      if (type === "user") {
        users = users.filter((u) => (u._id || u.id) !== id);
        showToast("User deleted successfully", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Operation failed", "error");
    }
  }
</script>

<div class="container mt-5 mb-5">
  <div class="card shadow border-0 overflow-hidden">
    <div class="card-header p-4" style="background:#2c2c2c;color:white;">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="mb-0 fw-bold">Admin Dashboard</h2>
        <span class="badge bg-danger rounded-pill">
          Admin: {adminEmail}
        </span>
      </div>

      <div class="mt-4 d-flex gap-2">
        <button
          class="btn btn-sm {currentTab === 'users'
            ? 'btn-light'
            : 'btn-outline-light'}"
          on:click={() => (currentTab = "users")}
        >
          Users ({users.length})
        </button>

        <button
          class="btn btn-sm {currentTab === 'bookings'
            ? 'btn-light'
            : 'btn-outline-light'}"
          on:click={() => (currentTab = "bookings")}
        >
          Bookings ({bookings.length})
        </button>

        <button
          class="btn btn-sm {currentTab === 'messages'
            ? 'btn-light'
            : 'btn-outline-light'}"
          on:click={() => (currentTab = "messages")}
        >
          Messages ({messages.length})
        </button>

        <button
          class="btn btn-sm {currentTab === 'subs'
            ? 'btn-light'
            : 'btn-outline-light'}"
          on:click={() => (currentTab = "subs")}
        >
          Subscriptions ({subscriptions.length})
        </button>
      </div>
    </div>

    <div class="card-body bg-white p-4">
      {#if loading}
        <div class="text-center p-5">
          <div class="spinner-border text-dark"></div>
          <p class="mt-3">Loading dashboard data...</p>
        </div>
      {:else}
        {#if errorMessage}
          <div class="alert alert-warning">{errorMessage}</div>
        {/if}

        <div class="table-responsive">
          <table class="table align-middle">
            <thead class="table-light">
              {#if currentTab === "users"}
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              {:else if currentTab === "bookings"}
                <tr>
                  <th>Guest</th>
                  <th>Check‑In</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              {:else if currentTab === "messages"}
                <tr>
                  <th>Sender</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              {:else}
                <tr>
                  <th>Email Address</th>
                  <th>Joined Date</th>
                </tr>
              {/if}
            </thead>
            <tbody>
              {#if currentTab === "users"}
                {#if users.length === 0}
                  <tr>
                    <td colspan="3" class="text-center"> No users found </td>
                  </tr>
                {/if}
                {#each users as u}
                  <tr>
                    <td>{u.email}</td>
                    <td><span class="badge bg-dark">{u.role}</span></td>
                    <td>
                      {#if u.role !== "admin"}
                        <button
                          class="btn btn-sm btn-outline-danger"
                          on:click={() => handleDelete("user", u._id || u.id)}
                        >
                          Delete
                        </button>
                      {/if}
                    </td>
                  </tr>
                {/each}
              {:else if currentTab === "bookings"}
                {#if bookings.length === 0}
                  <tr>
                    <td colspan="4" class="text-center">
                      No active bookings
                    </td>
                  </tr>
                {/if}
                {#each bookings as b}
                  <tr>
                    <td>{b.firstName || b.name || "Guest"}</td>
                    <td>
                      {b.checkInDate
                        ? new Date(b.checkInDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td><span class="badge bg-success">{b.status}</span></td>
                    <td>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        on:click={() => handleDelete("booking", b._id || b.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                {/each}
              {:else if currentTab === "messages"}
                {#each messages as m}
                  <tr>
                    <td>{m.name || "Guest"}</td>
                    <td>{m.email}</td>
                    <td>{m.message}</td>
                  </tr>
                {/each}
              {:else}
                {#each subscriptions as s}
                  <tr>
                    <td>{s.email}</td>
                    <td>
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>
