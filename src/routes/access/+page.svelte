<script>
  import { API_BASE } from "$lib/api/config";
  import { showToast } from "$lib/stores/toast";
  import { fetchAdminData } from "$lib/utils/admin";

  let formElement;
  let errors = {};
  let isSubmitting = false;

  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  const nameRegex = /^[\p{L}]+([-'\s][\p{L}]+)*$/u;

  function isContactFormFilled() {
    const title = formElement?.elements.title.value?.trim();
    const firstName = formElement?.elements.firstName.value?.trim();
    const lastName = formElement?.elements.lastName.value?.trim();
    const email = formElement?.elements["contact-form-email"].value?.trim();
    const message = formElement?.elements.message.value?.trim();

    return (
      title !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      message !== ""
    );
  }

  function validateContactFormField(fieldName) {
    const title = formElement?.elements.title.value?.trim();
    const firstName = formElement?.elements.firstName.value?.trim();
    const lastName = formElement?.elements.lastName.value?.trim();
    const email = formElement?.elements["contact-form-email"].value?.trim();
    const message = formElement?.elements.message.value?.trim();

    switch (fieldName) {
      case "title":
        if (!title) {
          errors.title = "Subject is required.";
        } else if (title.length < 2) {
          errors.title = "Subject must be at least 2 characters.";
        } else if (title.length > 199) {
          errors.title = "Subject must be less than 200 characters.";
        } else {
          delete errors.title;
        }
        break;

      case "firstName":
        if (!firstName) {
          errors.firstName = "First name is required.";
        } else if (firstName.length > 29) {
          errors.firstName = "First name must be less than 30 characters.";
        } else if (!nameRegex.test(firstName)) {
          errors.firstName =
            "First name can include letters, spaces, hyphens( - ), and apostrophes( ' ). No leading or trailing hyphens or apostrophes allowed.";
        } else {
          delete errors.firstName;
        }
        break;

      case "lastName":
        if (!lastName) {
          errors.lastName = "Last name is required.";
        } else if (lastName.length > 19) {
          errors.lastName = "Last name must be less than 20 characters.";
        } else if (!nameRegex.test(lastName)) {
          errors.lastName =
            "Last name can include letters, spaces, hyphens( - ), and apostrophes( ' ). No leading or trailing hyphens or apostrophes allowed.";
        } else {
          delete errors.lastName;
        }
        break;

      case "email":
        if (!email) {
          errors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
          errors.email = "Invalid email format.";
        } else {
          delete errors.email;
        }
        break;

      case "message":
        if (!message) {
          errors.message = "Message is required.";
        } else if (message.length < 5) {
          errors.message = "Message must be at least 5 characters.";
        } else if (message.length > 499) {
          errors.message = "Message must be less than 500 characters.";
        } else {
          delete errors.message;
        }
        break;
    }
    errors = errors;
  }

  function validateContactForm() {
    errors = {};

    const fields = ["title", "firstName", "lastName", "email", "message"];

    fields.forEach((field) => validateContactFormField(field));

    return Object.keys(errors).length === 0;
  }

  async function handleContactFormSubmit(e) {
    e.preventDefault();

    if (!validateContactForm()) {
      showToast("Invalid Input.", "error");
      return;
    }

    isSubmitting = true;

    try {
      const contactData = {
        name: `${formElement.elements.firstName.value} ${formElement.elements.lastName.value}`,
        email: formElement.elements["contact-form-email"].value,
        subject: formElement.elements.title.value,
        message: formElement.elements.message.value,
      };

      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast(errorData.message || "Failed to send message", "error");
        isSubmitting = false;
        return;
      }

      showToast("Message sent successfully!", "success");
      formElement.reset();
      errors = {};

      try {
        const data = await fetchAdminData(); // from ./utils/admin
      } catch (err) {
        console.error("Failed to refresh admin data after message send", err);
      }
    } catch (error) {
      showToast("An error occurred: " + error.message, "error");
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Access | Skye Suites</title>
</svelte:head>

<main class="section">
  <div class="section__container">
    <!-- Left Column Element -->
    <div class="section__column section__column--left">
      <h2 class="section__heading"><em>Getting Here</em></h2>
      <p class="section__info">Check in 3:00 PM | Check-out 11:00 AM</p>

      <!-- Map Container Element -->
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62909.9441331484!2d119.8891781399626!3d11.509883154436585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bbf2baae3fd5d1%3A0x5b4e937574dbfc9d!2sLinapacan%2C%20Palawan!5e0!3m2!1sen!2sph!4v1696843172345!5m2!1sen!2sph"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Map of Linapacan, Palawan"
        ></iframe>
      </div>
    </div>

    <!-- Right Column Element -->
    <div class="section__column section__column--right">
      <p class="section__intro"><em>Let's get in touch</em></p>

      <!-- Contact Form Block -->
      <form
        bind:this={formElement}
        on:submit={handleContactFormSubmit}
        novalidate
      >
        <p class="form-text text-muted">
          Fields marked with <span class="text-danger">*</span> are required.
        </p>

        <div class="mb-3">
          <label for="title" class="form-label">Subject</label>
          <input
            type="text"
            class="form-control"
            class:is-invalid={errors.title}
            id="title"
            name="title"
            on:input={() => validateContactFormField("title")}
            required
            autocomplete="off"
          />
          <div class="invalid-feedback">{errors.title}</div>
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <label for="first_name" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              class:is-invalid={errors.firstName}
              id="first_name"
              name="firstName"
              on:input={() => validateContactFormField("firstName")}
              required
              autocomplete="given-name"
            />
            <div class="invalid-feedback">{errors.firstName}</div>
          </div>
          <div class="col-md-6">
            <label for="last_name" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              class:is-invalid={errors.lastName}
              id="last_name"
              name="lastName"
              on:input={() => validateContactFormField("lastName")}
              required
              autocomplete="family-name"
            />
            <div class="invalid-feedback">{errors.lastName}</div>
          </div>
        </div>
        <div class="mb-3 mt-3">
          <label for="contact-form-email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            class:is-invalid={errors.email}
            id="contact-form-email"
            name="email"
            on:input={() => validateContactFormField("email")}
            required
            autocomplete="email"
          />
          <div class="invalid-feedback">{errors.email}</div>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea
            class="form-control"
            class:is-invalid={errors.message}
            id="message"
            name="message"
            rows="4"
            on:input={() => validateContactFormField("message")}
            required
          ></textarea>
          <div class="invalid-feedback">{errors.message}</div>
        </div>
        <div class="d-flex justify-content-end gap-2">
          <button type="reset" class="btn btn-secondary">Reset</button>
          <button
            type="submit"
            class="btn btn-danger"
            disabled={Object.keys(errors).length > 0 ||
              !isContactFormFilled() ||
              isSubmitting}
          >
            {isSubmitting ? "Sending..." : "SEND"}
          </button>
        </div>
      </form>
      <!-- End Contact Form Block -->
    </div>
  </div>
</main>

<style>
  /*=============== Access ===============*/

  /* --- Main Section and Columns --- */
  .section {
    color: var(--color-text-dark);
    margin: 1rem auto;
    max-width: 1200px;
    padding: 3rem 1.5rem;
  }

  .section__container {
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .section__column--left h2 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 700;
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  .section__column--left p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .section__column--right p.section__intro {
    font-size: 1.125rem;
    font-style: italic;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }

  /* Smallest screen custom grid stacking */
  @media (max-width: 400px) {
    .section__container {
      grid-template-columns: 1fr !important;
    }
  }
</style>
