<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let users = [], bookings = [], messages = [], subscriptions = [];
  let loading = true;
  let currentTab = "users";
  let errorMessage = "";
  let adminEmail = "";

  async function fetchAdminData() {
    loading = true;
    errorMessage = "";
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        errorMessage = "Unauthorized: No access token found.";
        loading = false;
        return;
      }

      const headers = { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const [uRes, bRes, mRes, sRes] = await Promise.all([
        fetch("http://localhost:3000/api/users", { headers }),
        fetch("http://localhost:3000/api/users/all-bookings", { headers }),
        fetch("http://localhost:3000/api/users/messages", { headers }),
        fetch("http://localhost:3000/api/users/subscriptions", { headers })
      ]);

      if (uRes.ok) users = await uRes.json();
      if (bRes.ok) bookings = await bRes.json();
      if (mRes.ok) messages = await mRes.json();
      if (sRes.ok) subscriptions = await sRes.json();

    } catch (e) {
      errorMessage = "Backend connection failed. Is the server running?";
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) { goto("/"); return; }
    const storageUser = JSON.parse(rawUser);
    adminEmail = storageUser.email;

    if (storageUser.role === 'admin' || storageUser.email === "krizia.test4.admin@gmail.com") {
      await fetchAdminData();
    } else {
      goto("/");
    }
  });

  async function handleDelete(type, id) {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    const token = localStorage.getItem('access');
    
    // Logic for different delete endpoints
    const url = type === 'booking' 
      ? `http://localhost:3000/api/users/bookings/${id}` 
      : `http://localhost:3000/api/users/${id}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (res.ok) {
      // Update local UI immediately after delete
      if (type === 'user') users = users.filter(u => (u._id || u.id) !== id);
      if (type === 'booking') bookings = bookings.filter(b => (b._id || b.id) !== id);
      alert(`${type} deleted successfully`);
    } else {
      alert(`Failed to delete ${type}`);
    }
  }
</script>

<div class="container mt-5 mb-5">
  <div class="card shadow border-0 overflow-hidden">
    <div class="card-header p-4" style="background-color: #2c2c2c; color: white;">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="mb-0 fw-bold">Dashboard</h2>
        <span class="badge rounded-pill bg-danger">Admin: {adminEmail}</span>
      </div>

      <div class="mt-4 d-flex gap-2">
        <button class="btn btn-sm {currentTab === 'users' ? 'btn-light' : 'btn-outline-light'}" on:click={() => currentTab = 'users'}>Users ({users.length})</button>
        <button class="btn btn-sm {currentTab === 'bookings' ? 'btn-light' : 'btn-outline-light'}" on:click={() => currentTab = 'bookings'}>Bookings ({bookings.length})</button>
        <button class="btn btn-sm {currentTab === 'messages' ? 'btn-light' : 'btn-outline-light'}" on:click={() => currentTab = 'messages'}>Messages ({messages.length})</button>
        <button class="btn btn-sm {currentTab === 'subs' ? 'btn-light' : 'btn-outline-light'}" on:click={() => currentTab = 'subs'}>Subscriptions ({subscriptions.length})</button>
      </div>
    </div>

    <div class="card-body bg-white p-4">
      {#if loading}
        <div class="text-center p-5">
          <div class="spinner-border text-dark"></div>
          <p class="mt-2 text-muted">Loading secure data...</p>
        </div>
      {:else}
        <div class="table-responsive">
          {#if currentTab === 'users'}
            <table class="table align-middle">
              <thead class="table-light"><tr><th>Email</th><th>Role</th><th>Action</th></tr></thead>
              <tbody>
                {#each users as u}
                  <tr>
                    <td>{u.email}</td>
                    <td><span class="badge bg-dark">{u.role}</span></td>
                    <td>
                      {#if u.role !== 'admin'}
                        <button class="btn btn-sm btn-outline-danger" on:click={() => handleDelete('user', u.id || u._id)}>Delete</button>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>

          {:else if currentTab === 'bookings'}
            <table class="table align-middle">
              <thead class="table-light"><tr><th>Guest</th><th>Check-In</th><th>Action</th></tr></thead>
              <tbody>
                {#each bookings as b}
                  <tr>
                    <td>{b.firstName || b.name || 'Guest'}</td>
                    <td>{b.checkInDate || 'N/A'}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-danger" on:click={() => handleDelete('booking', b.id || b._id)}>Cancel</button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>

          {:else if currentTab === 'messages'}
            <table class="table align-middle">
              <thead class="table-light"><tr><th>Sender</th><th>Email</th><th>Message</th></tr></thead>
              <tbody>
                {#each messages as m}
                  <tr>
                    <td>{m.name || m.fullName || 'Guest'}</td>
                    <td>{m.email}</td>
                    <td>{m.message || 'No content'}</td>
                  </tr>
                {/each}
              </tbody>
            </table>

          {:else if currentTab === 'subs'}
            <table class="table align-middle">
              <thead class="table-light"><tr><th>Email Address</th><th>Joined Date</th></tr></thead>
              <tbody>
                {#each subscriptions as s}
                  <tr>
                    <td>{s.email}</td>
                    <td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {/if}
        </div>
      {/if}
    </div> 
  </div> 
</div>