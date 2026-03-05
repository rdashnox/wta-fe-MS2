<script>
  import { createEventDispatcher } from "svelte";
  import { register } from "$lib/api/auth";
  import { user, accessToken } from "$lib/stores/auth";
  import { showToast } from "$lib/stores/toast";
  import { registerSchema } from "$lib/utils/validationSchemas";
  import { writable } from "svelte/store";

  import { API_BASE } from "$lib/api/config.js";

  const GOOGLE_LOGIN_URL = `${API_BASE}/auth/google`;

  const dispatch = createEventDispatcher();

  let form = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  let touched = {
    email: false,
    password: false,
    confirmPassword: false,
  };

  const validationErrors = writable({});
  let isValidForm = false;
  let loading = false;

  function validateForm() {
    const { error } = registerSchema.validate(form, { abortEarly: false });
    let errors = {};
    if (error) {
      for (let detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
    }
    validationErrors.set(errors);
    isValidForm = Object.keys(errors).length === 0;    
  }

  $: if (form) {
    validateForm();
  }

  async function submit() {
    if (!isValidForm) {
      showToast("Please correct the errors in the form.", "error");
      return;
    }

    loading = true;
    try {
      const data = await register(form.email, form.password);
      accessToken.set(data.access);
      user.set(data.user);
      dispatch("close");

      // Show success toast
      showToast(`Welcome ${data?.user?.email}`, "success");
    } catch (e) {
      showToast(e.message || "Registration failed.", "error");
    } finally {
      loading = false;
    }
  }
</script>

<div class="modal-backdrop show"></div>

<div class="modal show d-block">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-dark">Register</h5>
        <button class="btn-close" on:click={() => dispatch("close")}></button>
      </div>

      <div class="modal-body">
        <form on:submit|preventDefault={submit}>
          <div class="mb-2">
            <input
              class="form-control"
              class:is-invalid={touched.email && $validationErrors.email}
              placeholder="Email"
              bind:value={form.email}
              on:blur={() => (touched.email = true)}
            />
            {#if touched.email && $validationErrors.email}
              <div class="invalid-feedback d-block">
                {$validationErrors.email}
              </div>
            {/if}
          </div>

          <div class="mb-2">
            <input
              type="password"
              class="form-control"
              class:is-invalid={touched.password && $validationErrors.password}
              placeholder="Password"
              bind:value={form.password}
              on:blur={() => (touched.password = true)}
            />
            {#if touched.password && $validationErrors.password}
              <div class="invalid-feedback d-block">
                {$validationErrors.password}
              </div>
            {/if}
          </div>

          <div class="mb-2">
            <input
              type="password"
              class="form-control"
              class:is-invalid={touched.confirmPassword && $validationErrors.confirmPassword}
              placeholder="Confirm Password"
              bind:value={form.confirmPassword}
              on:blur={() => (touched.confirmPassword = true)}
            />
            {#if touched.confirmPassword && $validationErrors.confirmPassword}
              <div class="invalid-feedback d-block">
                {$validationErrors.confirmPassword}
              </div>
            {/if}
          </div>

          <button class="btn btn-danger w-100 mt-3" type="submit" disabled={!isValidForm || loading}>
            {#if loading}
              <span class="spinner-border spinner-border-sm me-2"></span>
            {/if}
            Register
          </button>
        </form>

        <hr class="my-4"/>

        <a href={GOOGLE_LOGIN_URL} class="w-100">
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
