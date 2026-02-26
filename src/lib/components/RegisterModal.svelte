<script>
  import { createEventDispatcher } from "svelte";
  import { register } from "$lib/api/auth";
  import { user, accessToken } from "$lib/stores/auth";
  import { showToast } from "$lib/stores/toast";

  import { API_BASE } from "$lib/api/config.js";

  const GOOGLE_LOGIN_URL = `${API_BASE}/auth/google`;

  const dispatch = createEventDispatcher();
  let email = "";
  let password = "";
  let error = "";

  async function submit() {
    error = "";
    try {
      const data = await register(email, password);
      accessToken.set(data.access);
      user.set(data.user);
      dispatch("close");

      // Show success toast
      showToast(`Welcome ${data?.user?.email}`, "success");
    } catch (e) {
      error = e.message;

      showToast(error, "error");
    }
  }
</script>

<div class="modal-backdrop show"></div>

<div class="modal show d-block">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-dark">Register</h5>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="btn-close" on:click={() => dispatch("close")}></button>
      </div>

      <div class="modal-body">
        <input
          class="form-control mb-2"
          placeholder="Email"
          bind:value={email}
        />
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          bind:value={password}
        />
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" on:click={() => dispatch("close")}>
          Cancel
        </button>
        <button class="btn btn-danger" on:click={submit}> Register </button>
        <hr />

        <a href={GOOGLE_LOGIN_URL} class="w-100 mb-2">
          <button
            type="button"
            class="btn btn-google d-flex align-items-center justify-content-center w-100"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Logo"
              width="20"
              height="20"
              class="me-2"
            />
            Continue with Google
          </button>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .btn-google {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #444;
  }

  .btn-google:hover {
    background-color: #f5f5f5;
  }
</style>
