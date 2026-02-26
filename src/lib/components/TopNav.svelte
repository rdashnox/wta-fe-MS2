<script>
  import { onMount } from "svelte";
  import LoginModal from "$lib/components/LoginModal.svelte";
  import RegisterModal from "$lib/components/RegisterModal.svelte";
  import { user, isAuthenticated, authUpdated, accessToken } from "$lib/stores/auth";

  let accountOpen = false;

  $: $authUpdated;

  let showLogin = false;
  let showRegister = false;

  function toggleAccount() {
    accountOpen = !accountOpen;
  }

  function closeAccount() {
    accountOpen = false;
  }

  function handleLogout() {
    user.set(null);
    accessToken.set(null);
    accountOpen = false;
  }

  function openLoginFromOffcanvas() {
    const offcanvasEl = document.getElementById("offcanvasNav");
    const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    instance?.hide();
    showLogin = true;
  }

  function openRegisterFromOffcanvas() {
    const offcanvasEl = document.getElementById("offcanvasNav");
    const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    instance?.hide();
    showRegister = true;
  }

  onMount(() => {
    const closeOnClickOutside = (e) => {
      if (!e.target.closest(".account-dropdown")) {
        accountOpen = false;
      }
    };

    document.addEventListener("click", closeOnClickOutside);
    return () => document.removeEventListener("click", closeOnClickOutside);
  });

  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        const offcanvasEl = document.getElementById("offcanvasNav");
        const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        instance?.hide();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<nav class="navbar navbar-expand-lg custom-glass-navbar">
  <div class="container navbar__container">
    <!-- Logo -->
    <a href="/" class="navbar__logo-link" aria-label="Skye Suites Home">
      <img
        src="/images/logo.png"
        alt="Skye Suites Logo"
        class="navbar__logo"
        loading="lazy"
      />
    </a>

    <!-- Hamburger -->
    <button
      class="navbar-toggler d-lg-none"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNav"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Desktop menu -->
    <div class="collapse navbar-collapse d-none d-lg-flex">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="/suites" class="nav-link">Suites</a></li>
        <li class="nav-item"><a href="/dining" class="nav-link">Dining</a></li>
        <li class="nav-item">
          <a href="/experience" class="nav-link">Experience</a>
        </li>
        <li class="nav-item"><a href="/access" class="nav-link">Access</a></li>
      </ul>

      <!-- AUTH / BOOK -->
      <div class="ms-lg-3 d-flex align-items-center gap-2">
        {#if $isAuthenticated}
          <div class="position-relative account-dropdown">
            <button
              class="btn btn-outline-light btn-sm dropdown-toggle"
              type="button"
              on:click|stopPropagation={toggleAccount}
            >
              {$user.email}
            </button>

            {#if accountOpen}
              <ul class="dropdown-menu dropdown-menu-end show">
                <li>
                  <a class="dropdown-item" href="/profile"> Profile </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/account/bookings">
                    My Booking
                  </a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button
                    class="dropdown-item text-danger"
                    on:click={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            {/if}
          </div>
        {:else}
          <button
            class="btn btn-outline-light btn-sm"
            on:click={() => (showLogin = true)}
          >
            Login
          </button>
          <button
            class="btn btn-danger btn-sm"
            on:click={() => (showRegister = true)}
          >
            Register
          </button>
        {/if}
      </div>
    </div>
  </div>
</nav>

<!-- Offcanvas (mobile) -->
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNav">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Menu</h5>
    <button class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>

  <div class="offcanvas-body custom-vertical-center">
    <ul class="navbar-nav">
      <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
      <li class="nav-item"><a href="/suites" class="nav-link">Suites</a></li>
      <li class="nav-item"><a href="/dining" class="nav-link">Dining</a></li>
      <li class="nav-item">
        <a href="/experience" class="nav-link">Experience</a>
      </li>
      <li class="nav-item"><a href="/access" class="nav-link">Access</a></li>
    </ul>

    <div class="mt-3 d-grid gap-2">
      {#if !$isAuthenticated}
        <button
          class="btn btn-outline-secondary"
          on:click={openLoginFromOffcanvas}
        >
          Login
        </button>

        <button class="btn btn-danger" on:click={openRegisterFromOffcanvas}>
          Register
        </button>
      {:else}
        <div class="account-dropdown">
          <button
            class="btn btn-outline-secondary w-100 dropdown-toggle"
            on:click={toggleAccount}
          >
            {$user.email}
          </button>

          {#if accountOpen}
            <ul class="dropdown-menu show w-100 mt-2 position-static">
              <li>
                <a class="dropdown-item" href="/profile"> Profile </a>
              </li>
              <li>
                <a class="dropdown-item" href="/account/bookings">
                  My Booking
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button
                  class="dropdown-item text-danger"
                  on:click={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- AUTH MODALS -->
{#if showLogin}
  <LoginModal on:close={() => (showLogin = false)} />
{/if}

{#if showRegister}
  <RegisterModal on:close={() => (showRegister = false)} />
{/if}
