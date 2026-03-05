<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { user, accessToken } from "$lib/stores/auth";
  import { showToast } from "$lib/stores/toast";
  import { createBooking } from "$lib/services/bookings";
  import { getWeatherRange } from "$lib/services/weather";
  import WeatherModal from "$lib/components/WeatherModal.svelte";
  import { bookingSchema } from "$lib/utils/validationSchemas";
  import { writable } from "svelte/store";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";

  export let roomId;
  export let roomName;

  const dispatch = createEventDispatcher();

  const HOTEL_LOCATION = "Palawan, Philippines";

  let form = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    boardType: "Breakfast",
    note: "",
  };

  let touched = {
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    checkInDate: false,
    checkOutDate: false,
    adults: false,
    children: false,
    boardType: false,
    note: false,
  };

  const validationErrors = writable({});

  let isValidForm = false;

  function validateForm() {
    const { error } = bookingSchema.validate(form, { abortEarly: false });
    let errors = {};
    if ( error ) {
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

  // Normalize dates to local noon to avoid timezone issues
  function normalizeDate(dateStr) {
    const d = new Date(dateStr);
    d.setHours(12, 0, 0, 0);
    return d;
  }

  // Nights between check-in and check-out
  function daysBetween(a, b) {
    const start = normalizeDate(a);
    const end = normalizeDate(b);
    return Math.round((end - start) / 86400000);
  }

  // 🌦 Weather state
  let weather = [];
  let weatherLoading = false;
  let weatherError = null;
  let showWeatherModal = false;

  // Prevent duplicate API calls
  let lastWeatherRequest = {
    checkIn: null,
    checkOut: null,
  };

  // React only when dates actually change
  $: {
    if (
      form.checkInDate &&
      form.checkOutDate &&
      form.checkInDate !== lastWeatherRequest.checkIn &&
      form.checkOutDate !== lastWeatherRequest.checkOut
    ) {
      loadWeatherPreview();
    }
  }

  // 🔒 HARD AUTH GUARD
  onMount(() => {
    const currentUser = get(user);
    const token = get(accessToken);

    if (!currentUser || !token) {
      showToast("Please login to book a room", "error");
      dispatch("close");
    }
  });

  async function loadWeatherPreview() {
    weather = [];
    weatherError = null;

    if (!form.checkInDate || !form.checkOutDate) return;

    const checkIn = normalizeDate(form.checkInDate);
    const checkOut = normalizeDate(form.checkOutDate);

    if (checkOut <= checkIn) {
      weatherError = "Check-out date must be after check-in date.";
      return;
    }

    lastWeatherRequest = {
      checkIn: form.checkInDate,
      checkOut: form.checkOutDate,
    };

    weatherLoading = true;

    try {
      const forecast = await getWeatherRange({
        location: HOTEL_LOCATION,
      });

      // Include each night of stay (check-in → day before checkout)
      weather = forecast.filter((day) => {
        const d = normalizeDate(day.date);
        return d >= checkIn && d < checkOut;
      });

      if (weather.length === 0) {
        weatherError =
          "Weather forecast is not available yet for your selected dates.";
      }
    } catch (err) {
      console.error("Weather error:", err);
      weatherError = "Unable to load weather information.";
    } finally {
      weatherLoading = false;
    }
  }

  async function submit() {
    if (!isValidForm){
      showToast("Please correct the errors in the form.", "error");
      return;
    }

    const currentUser = get(user);
    const token = get(accessToken);

    if (!currentUser || !token) {
      showToast("Your session expired. Please login again.", "error");
      dispatch("close");
      return;
    }

    const bookingData = {
      room: roomId,
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate,
      adults: Number(form.adults),
      children: Number(form.children),
      boardType: form.boardType,
      note: form.note,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
    };

    try {
      const res = await createBooking(bookingData);

      if (res) { // Changed from res?.success
        showToast("Booking successful 🎉", "success");
        dispatch("close");
        await goto("/my-bookings", { invalidateAll: true }); // Redirect to my-bookings page
      } else {
        const errorMessage = res?.message || "Booking failed. Please try again.";
        showToast(errorMessage, "error")        
      }
    } catch (err) {
      showToast(err.message || "Something went wrong", "error");
    }
  }
</script>

<div class="modal-backdrop show"></div>

<div class="modal show d-block" role="dialog" aria-modal="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Book {roomName}</h5>
        <!-- svelte-ignore element_invalid_self_closing_tag -->
        <button
          class="btn-close"
          aria-label="Close"
          on:click={() => dispatch("close")}
        />
      </div>

      <div class="modal-body">
        <div class="row g-3">
          <div class="col-md-6">
            <input
              class="form-control"
              class:is-invalid={touched.firstName && $validationErrors.firstName}
              placeholder="First name"
              bind:value={form.firstName}
              on:blur={() => (touched.firstName = true)}
            />
            {#if touched.firstName && $validationErrors.firstName}
              <div class="invalid-feedback d-block">
                {$validationErrors.firstName}
              </div>
            {/if}
          </div>

          <div class="col-md-6">
            <input
              class="form-control"
              class:is-invalid={touched.lastName && $validationErrors.lastName}
              placeholder="Last name"
              bind:value={form.lastName}
              on:blur={() => (touched.lastName = true)}
            />
            {#if touched.lastName && $validationErrors.lastName}
              <div class="invalid-feedback d-block">
                {$validationErrors.lastName}
              </div>
            {/if}
          </div>

          <div class="col-md-6">
            <input
              class="form-control"
              class:is-invalid={touched.phone && $validationErrors.phone}
              placeholder="Phone"
              bind:value={form.phone}
              on:blur={() => (touched.phone = true)}
            />
            {#if touched.phone && $validationErrors.phone}
              <div class="invalid-feedback d-block">
                {$validationErrors.phone}
              </div>
            {/if}
          </div>

          <div class="col-md-6">
            <input
              type="email"
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

          <div class="col-md-6">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="form-label">Check-in</label>
            <input
              type="date"
              class="form-control"
              class:is-invalid={touched.checkInDate && $validationErrors.checkInDate}
              bind:value={form.checkInDate}
              on:blur={() => (touched.checkInDate = true)}
              on:change={() => (touched.checkInDate = true)}
            />
            {#if touched.checkInDate && $validationErrors.checkInDate}
              <div class="invalid-feedback d-block">
                {$validationErrors.checkInDate}
              </div>
            {/if}
          </div>

          <div class="col-md-6">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="form-label">Check-out</label>
            <input
              type="date"
              class="form-control"
              class:is-invalid={touched.checkOutDate && $validationErrors.checkOutDate}
              bind:value={form.checkOutDate}
              min={form.checkInDate}
              on:blur={() => (touched.checkOutDate = true)}
              on:change={() => (touched.checkOutDate = true)}
            />
            {#if touched.checkOutDate && $validationErrors.checkOutDate}
              <div class="invalid-feedback d-block">
                {$validationErrors.checkOutDate}
              </div>
            {/if}
          </div>

          {#if form.checkInDate && form.checkOutDate}
            <div class="col-12 mt-4">
              <h6 class="fw-bold">🌦 Weather during your stay</h6>

              {#if weatherLoading}
                <div class="d-flex align-items-center gap-2">
                  <div class="spinner-border spinner-border-sm"></div>
                  <span class="text-muted">Loading weather forecast…</span>
                </div>
              {:else if weatherError}
                <p class="text-muted">{weatherError}</p>
              {:else}
                <div class="d-flex gap-3 flex-wrap">
                  {#each weather as day}
                    <div
                      class="border rounded p-2 text-center"
                      style="min-width: 140px"
                    >
                      <div class="fw-semibold">{day.date}</div>
                      {#if day.icon}
                        <img src={day.icon} alt={day.condition} width="36" />
                      {/if}
                      <small class="d-block">
                        {day.minTemp}°C – {day.maxTemp}°C
                      </small>
                    </div>
                  {/each}
                </div>

                {#if weather.length > 0}
                  <small class="text-muted d-block mt-2">
                    Forecast available for {weather.length} of
                    {daysBetween(form.checkInDate, form.checkOutDate)} nights
                  </small>
                {/if}

                <button
                  class="btn btn-link mt-2 p-0"
                  on:click={() => (showWeatherModal = true)}
                >
                  View detailed forecast →
                </button>
              {/if}
            </div>
          {/if}

          <div class="col-md-4">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="form-label">Adults</label>
            <input
              type="number"
              min="1"
              class="form-control"
              class:is-invalid={touched.adults && $validationErrors.adults}
              bind:value={form.adults}
              on:blur={() => (touched.adults = true)}
            />
            {#if touched.adults && $validationErrors.adults}
              <div class="invalid-feedback d-block">
                {$validationErrors.adults}
              </div>
            {/if}
          </div>

          <div class="col-md-4">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="form-label">Children</label>
            <input
              type="number"
              min="0"
              class="form-control"
              class:is-invalid={touched.children && $validationErrors.children}
              bind:value={form.children}
              on:blur={() => (touched.children = true)}
            />
            {#if touched.children && $validationErrors.children}
              <div class="invalid-feedback d-block">
                {$validationErrors.children}
              </div>
            {/if}
          </div>

          <div class="col-md-4">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="form-label">Board</label>
            <select
              class="form-select"
              class:is-invalid={touched.boardType && $validationErrors.boardType}
              bind:value={form.boardType}
              on:blur={() => (touched.boardType = true)}
              on:change={() => (touched.boardType = true)}
            >
              <option>Breakfast</option>
              <option>Half-board</option>
            </select>
            {#if touched.boardType && $validationErrors.boardType}
              <div class="invalid-feedback d-block">
                {$validationErrors.boardType}
              </div>
            {/if}
          </div>

          <div class="col-12">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <textarea
              class="form-control"
              class:is-invalid={touched.note && $validationErrors.note}
              rows="3"
              placeholder="Special requests (optional)"
              bind:value={form.note}
              on:blur={() => (touched.note = true)}
            />
            {#if touched.note && $validationErrors.note}
              <div class="invalid-feedback d-block">
                {$validationErrors.note}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" on:click={() => dispatch("close")}>
          Cancel
        </button>
        <button class="btn btn-danger" on:click={submit} disabled={!isValidForm}>
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
</div>

{#if showWeatherModal}
  <WeatherModal {weather} on:close={() => (showWeatherModal = false)} />
{/if}
