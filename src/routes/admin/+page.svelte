<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { get } from "svelte/store";
  import { API_BASE } from '$lib/api/config.js'; 
  import { accessToken } from "$lib/stores/auth";

  let users = [], bookings = [], messages = [], subscriptions = [];
  let loading = true;
  let currentTab = "users";
  let adminEmail = "";

  async function fetchAdminData() {
    loading = true;
    try {
      const token = get(accessToken) || localStorage.getItem('access');
      const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

      // We fetch /profile because /users is 404 on your backend
      const [uRes, bRes, mRes, sRes] = await Promise.all([
        fetch(`${API_BASE}/users/profile`, { headers }), 
        fetch(`${API_BASE}/booking/all`, { headers }),   
        fetch(`${API_BASE}/contact`, { headers }),      
        fetch(`${API_BASE}/subscription`, { headers })  
      ]);

      if (uRes.ok) {
        const profile = await uRes.json();
        // This puts the logged-in user into the array so the table isn't empty
        users = [profile]; 
      }
      
      if (bRes.ok) bookings = await bRes.json();
      
      if (mRes.ok) {
        const data = await mRes.json();
        messages = data.messages || []; 
      }

      if (sRes.ok) subscriptions = await sRes.json();
    } catch (e) {
      console.error("Dashboard fetch error");
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) { goto("/"); return; }
    const storageUser = JSON.parse(rawUser);
    adminEmail = storageUser.email;
    
    if (storageUser.role === 'admin') {
      await fetchAdminData();
    } else {
      goto("/");
    }
  });

  async function handleDelete(type, id) {
    if (!confirm(`Delete this ${type}?`)) return;
    const token = get(accessToken) || localStorage.getItem('access');
    const url = type === 'booking' ? `${API_BASE}/booking/${id}` : `${API_BASE}/users/${id}`;
    const res = await fetch(url, { method: 'DELETE', headers: { "Authorization": `Bearer ${token}` } });
    if (res.ok) {
      if (type === 'booking') bookings = bookings.filter(b => (b._id || b.id) !== id);
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
        <div class="text-center p-5"><div class="spinner-border text-dark"></div></div>
      {:else}
        <div class="table-responsive">
          <table class="table align-middle">
            <thead class="table-light">
              {#if currentTab === 'users'}
                <tr><th>Email</th><th>Role</th><th>Action</th></tr>
              {:else if currentTab === 'bookings'}
                <tr><th>Guest</th><th>Check-In</th><th>Action</th></tr>
              {:else if currentTab === 'messages'}
                <tr><th>Sender</th><th>Email</th><th>Message</th></tr>
              {:else}
                <tr><th>Email Address</th><th>Joined Date</th></tr>
              {/if}
            </thead>
            <tbody>
              {#if currentTab === 'users'}
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
              {:else if currentTab === 'bookings'}
                {#each bookings as b}
                  <tr>
                    <td>{b.firstName || b.name || 'Guest'}</td>
                    <td>{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString() : 'N/A'}</td>
                    <td><button class="btn btn-sm btn-outline-danger" on:click={() => handleDelete('booking', b.id || b._id)}>Cancel</button></td>
                  </tr>
                {/each}
              {:else if currentTab === 'messages'}
                {#each messages as m}
                  <tr><td>{m.name || 'Guest'}</td><td>{m.email}</td><td>{m.message}</td></tr>
                {/each}
              {:else}
                {#each subscriptions as s}
                  <tr><td>{s.email}</td><td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</td></tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      {/if}
    </div> 
  </div> 
</div>