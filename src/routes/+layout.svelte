<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { afterUpdate } from "svelte";
  import { navigating } from "$app/stores";
  import { fly, fade } from "svelte/transition";

  import { goto } from "$app/navigation";
  import { user, accessToken } from "$lib/stores/auth";

  import TopNav from "$lib/components/TopNav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Showcase from "$lib/components/Showcase.svelte";
  import { headerMap } from "$lib/headerMap";
  import Toast from "$lib/components/Toast.svelte";

  $: path = $page.url.pathname;

  // List routes that need auth
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/my-bookings",
    "/oauth-success",
    "/admin",
  ];

  // Optional: separately list admin‑only routes
  const adminRoutes = [
    "/admin",
  ];

  // compute page ID
  const pageIds = {
    "/": "index",
    "/suites": "suites",
    "/dining": "dining",
    "/access": "access",
    "/experience": "experience",
  };

  $: pageId = pageIds[path] ?? "unknown";

  afterUpdate(() => {
    document.body.setAttribute("data-page-id", pageId);
  });

  $: headerConfig = (() => {
    if (headerMap[path]) return headerMap[path];
    return Object.values(headerMap).find((cfg) => cfg.match?.(path));
  })();

  // === Auth guard logic (client‑only) ===
  $: {
    const hasToken = $accessToken;
    const currentUser = $user;

    const isProtected = protectedRoutes.some((r) => path.startsWith(r));
    const isAdminRoute = adminRoutes.some((r) => path.startsWith(r));

    // Redirect if protected route but no token
    if (isProtected && !hasToken && path !== "/") {
      goto("/");
    }

    // Redirect if admin route but not admin
    if (
      isAdminRoute &&
      (currentUser === null || currentUser.role !== "admin")
    ) {
      goto("/");
    }

    // Redirect logged‑in user from / to /profile
    if (path === "/" && hasToken) {
      goto("/");
    }
  }
</script>

{#if $navigating}
  <div class="global-loader" in:fade out:fade>
    <div class="spinner"></div>
  </div>
{/if}

<header class={`header ${headerConfig?.class ?? ""}`}>
  <TopNav />

  {#if headerConfig?.showcase}
    <Showcase
      title={headerConfig.showcase.title}
      showSlideshow={headerConfig.showcase.slideshow}
    />
  {/if}
</header>

<Toast />

<div class="flex-fill">
  <slot />
</div>

<Footer />
