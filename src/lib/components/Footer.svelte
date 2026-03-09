<script>
  import { API_BASE } from "$lib/api/config";
  import { showToast } from "$lib/stores/toast";
  import { fetchAdminData } from "$lib/utils/admin";

  let loading = false;
  let email = "";
  let emailError = "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail(value) {
    if (!value) {
      emailError = "";
    } else if (!emailRegex.test(value)) {
      emailError = "Please enter a valid email.";
    } else {
      emailError = "";
    }
  }

  function handleInput(e) {
    email = e.target.value;
    validateEmail(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    validateEmail(email);
    if (emailError) {
      return;
    }

    loading = true;

    try {
      const response = await fetch(`${API_BASE}/subscription/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast(errorData.message || "Failed to subscribe.", "error");
        return;
      }

      const result = await response.json();
      showToast("Successfully subscribed!", "success");
      email = "";

      try {
        const data = await fetchAdminData();
        // Reload admin dashboard if open
        if (window.$reloadAdminDashboards) {
          window.$reloadAdminDashboards();
        }
      } catch (err) {
        console.error("Failed to refresh admin data after subscription", err);
      }
    } catch (error) {
      showToast("An error occurred while subscribing.", "error");
      console.error("Subscription error:", error);
    } finally {
      loading = false;
    }
  }
</script>

<footer class="footer">
  <div class="footer__container">
    <!-- Footer Contact Column Element -->
    <section class="footer__column" aria-labelledby="footer-contact-heading">
      <h3 id="footer-contact-heading" class="footer__heading">Contact Us</h3>
      <ul class="footer__list">
        <li class="footer__list-item">
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          15A Avocado Villa, Atchuete Estate Linapacan Island, Palawan 5313
        </li>
        <li class="footer__list-item">
          <i class="fa-solid fa-phone" aria-hidden="true"></i> +63 917 987 6543 /
          +63 2 888 2345
        </li>
        <li class="footer__list-item">
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
          <a href="mailto:info@skyesuiteshotel.com">info@skyesuiteshotel.com</a>
        </li>
      </ul>
    </section>

    <!-- Footer Social Media Column -->
    <section class="footer__column" aria-labelledby="footer-social-heading">
      <h3 id="footer-social-heading" class="footer__heading">Follow Us</h3>
      <nav aria-label="Social media links" class="footer__socials">
        <a
          href="https://en.wikipedia.org/wiki/Facebook"
          aria-label="Facebook"
          class="footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a
          href="https://en.wikipedia.org/wiki/Instagram"
          aria-label="Instagram"
          class="footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a
          href="https://en.wikipedia.org/wiki/Pinterest"
          aria-label="Pinterest"
          class="footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-pinterest"></i>
        </a>
        <a
          href="https://en.wikipedia.org/wiki/YouTube"
          aria-label="YouTube"
          class="footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-youtube"></i>
        </a>
      </nav>
    </section>

    <!-- Footer Newsletter Column -->
    <section class="footer__column" aria-labelledby="footer-newsletter-heading">
      <h3 id="footer-newsletter-heading" class="footer__heading">
        Subscribe to our newsletter
      </h3>
      <form
        id="newsletter-form"
        class="needs-validation"
        novalidate
        on:submit={handleSubmit}
      >
        <div class="mb-3">
          <label for="newsletter-email" class="visually-hidden">
            Email address
          </label>
          <input
            type="email"
            class="form-control {emailError ? 'is-invalid' : ''}"
            id="newsletter-email"
            name="email"
            placeholder="Email address"
            value={email}
            on:input={handleInput}
            required
          />
          <div class="invalid-feedback">Please enter a valid email.</div>
        </div>
        <button
          type="submit"
          class="btn btn-danger w-100"
          id="footerSubscribeBtn"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </section>
  </div>
</footer>
<!-- ########## End Footer Block ########## -->

<!-- ##########  Modal Subscription Form ########## -->
<div
  class="modal fade"
  id="newsletterModal"
  tabindex="-1"
  aria-labelledby="newsletterModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content modal-newsletter">
      <div
        class="modal-newsletter__header modal-header flex-column text-center border-0"
      >
        <img
          src="./images/logo.png"
          alt="Skye Suites Logo"
          class="modal-newsletter__logo"
          loading="lazy"
        />
        <h5 class="modal-title fw-bold" id="newsletterModalLabel">
          Subscribe to Our Newsletter
        </h5>
        <p class="modal-newsletter__subtitle small">
          Be the first to receive exclusive offers and updates.
        </p>
        <button
          type="button"
          class="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          data-bs-dismiss="modal"
          aria-label="Close"
          id="modalCloseBtn"
        ></button>
      </div>

      <form
        id="modal-newsletter-form"
        class="modal-newsletter__form needs-validation"
        novalidate
      >
        <div class="modal-body px-4">
          <div class="mb-3">
            <label
              for="modal-newsletter-email"
              class="form-label visually-hidden"
            >
              Email address
            </label>
            <input
              type="email"
              class="form-control modal-newsletter__input"
              id="modal-newsletter-email"
              name="newsletterEmail"
              placeholder="Enter your email"
              required
            />
            <div class="invalid-feedback text-light">
              Please enter a valid email.
            </div>
          </div>
        </div>

        <div
          class="modal-footer d-flex justify-content-between border-0 px-4 pb-4"
        >
          <button
            type="button"
            class="btn btn-outline-secondary modal-newsletter__btn-no"
            id="modal-no-thanks-btn"
          >
            No Thanks
          </button>
          <button type="submit" class="btn btn-danger fw-bold w-50">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ##########  End Modal Subscription Form ########## -->

<!-- ##########  Start Toast Container ########## -->
<div
  aria-live="polite"
  aria-atomic="true"
  class="position-fixed top-0 end-0 p-3"
  style="z-index: 1100"
>
  <div
    id="liveToast"
    class="toast align-items-center text-bg-success border-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body" id="toastMessage">
        <!-- Success message will be inserted here -->
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</div>
<!-- ##########  End Toast Container ########## -->
