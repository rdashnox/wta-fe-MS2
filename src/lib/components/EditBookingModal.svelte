<script>
  import { createEventDispatcher } from "svelte";
  import { showToast } from "$lib/stores/toast";
  import { updateBooking } from "$lib/services/bookings";
  import { bookingUpdateSchema } from "$lib/utils/validationSchemas";
  import { writable } from "svelte/store";

  export let booking;

  const dispatch = createEventDispatcher();

  let form = {
    checkOutDate: booking.checkOutDate.split('T')[0],
    adults: booking.adults,
    children: booking.children,
    boardType: booking.boardType,
    note: booking.note || "",
  };

  const errors = writable({}); // Renamed from validationErrors for brevity
  let isValidForm; // Declare isValidForm here without initial value

  // Function to perform validation and return errors
  function doValidateForm(currentForm) {
    const { error } = bookingUpdateSchema.validate(
      currentForm,
      { abortEarly: false, context: { checkInDate: booking.checkInDate } }
    );
    let newErrors = {};
    if (error) {
      for (let detail of error.details) {
        newErrors[detail.path[0]] = detail.message;
      }
    }
    return newErrors;
  }

  // Reactive validation: update errors store whenever form changes
  $: {
    const newErrors = doValidateForm(form);
    console.log('Form data changed:', JSON.stringify(form));
    console.log('New errors from validation:', JSON.stringify(newErrors));
    errors.set(newErrors);
  }

  // Derive isValidForm reactively from the errors store
  $: {
    console.log('Errors store updated:', JSON.stringify($errors));
    isValidForm = Object.keys($errors).length === 0;
    console.log('isValidForm:', isValidForm);
  }

  async function handleSubmit() {
    if (!isValidForm) { // Use the reactive isValidForm
      showToast("Please correct the errors in the form.", "error");
      return;
    }

    const bookingId = booking._id || booking.id; // Use _id for MongoDB or id for frontend

    try {
      const updatedData = {
        checkOutDate: form.checkOutDate,
        adults: Number(form.adults),
        children: Number(form.children),
        boardType: form.boardType,
        note: form.note,
      };

      const res = await updateBooking(bookingId, updatedData);

      if (res) {
        showToast("Booking updated successfully!", "success");
        // Dispatch event to parent to update the booking list
        dispatch("update", { ...booking, ...updatedData, checkOutDate: res.checkOutDate }); // Update with server response if any
        dispatch("close");
      } else {
        showToast(res?.message || "Failed to update booking. Please try again.", "error");
      }
    } catch (error) {
      console.error("Update booking error:", error);
      showToast(error.message || "Something went wrong during update.", "error");
    }
  }
</script>

<div class="modal-backdrop show"></div>

<div class="modal show d-block" tabindex="-1" role="dialog" aria-modal="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Booking for {booking.room?.type || 'Unknown Room'}</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          on:click={() => dispatch("close")}
        ></button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault={handleSubmit}>
          <div class="mb-3">
            <label for="checkInDate" class="form-label">Check-in Date</label>
            <input
              type="date"
              class="form-control"
              id="checkInDate"
              value={form.checkInDate}
              disabled
            />
            <div class="form-text">Check-in date cannot be changed.</div>
          </div>

          <div class="mb-3">
            <label for="checkOutDate" class="form-label">Check-out Date</label>
            <input
              type="date"
              class="form-control"
              id="checkOutDate"
              class:is-invalid={$errors.checkOutDate}
              bind:value={form.checkOutDate}
              min={form.checkInDate}
            />
            {#if $errors.checkOutDate}
              <div class="invalid-feedback d-block">
                {$errors.checkOutDate}
              </div>
            {/if}
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="adults" class="form-label">Adults</label>
              <input
                type="number"
                min="1"
                class="form-control"
                id="adults"
                class:is-invalid={$errors.adults}
                bind:value={form.adults}
              />
              {#if $errors.adults}
                <div class="invalid-feedback d-block">
                  {$errors.adults}
                </div>
              {/if}
            </div>
            <div class="col-md-6 mb-3">
              <label for="children" class="form-label">Children</label>
              <input
                type="number"
                min="0"
                class="form-control"
                id="children"
                class:is-invalid={$errors.children}
                bind:value={form.children}
              />
              {#if $errors.children}
                <div class="invalid-feedback d-block">
                  {$errors.children}
                </div>
              {/if}
            </div>
          </div>

          <div class="mb-3">
            <label for="boardType" class="form-label">Board Type</label>
            <select
              class="form-select"
              id="boardType"
              class:is-invalid={$errors.boardType}
              bind:value={form.boardType}
            >
              <option>Breakfast</option>
              <option>Half-board</option>
            </select>
            {#if $errors.boardType}
              <div class="invalid-feedback d-block">
                {$errors.boardType}              </div>
            {/if}
          </div>

          <div class="mb-3">
            <label for="note" class="form-label">Special Requests (optional)</label>
            <textarea
              class="form-control"
              id="note"
              rows="3"
              class:is-invalid={$errors.note}
              bind:value={form.note}
            ></textarea>
            {#if $errors.note}
              <div class="invalid-feedback d-block">
                {$errors.note}              </div>
            {/if}
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          on:click={() => dispatch("close")}
        >
          Cancel
        </button>
        <button
          type="submit"
          form="editBookingForm"
          class="btn btn-primary"
          on:click={handleSubmit}
          disabled={!isValidForm}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>
