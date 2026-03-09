import { writable } from "svelte/store";

export const toast = writable(null);

export function showToast(message, type = "info") {
  const toastElement = document.getElementById("liveToast");
  const toastMessage = document.getElementById("toastMessage");

  toastMessage.textContent = message;

  // Remove any previous bg- class
  toastElement.classList.remove(
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
  );

  // Add the class based on type
  switch (type) {
    case "success":
      toastElement.classList.add("bg-success", "text-white");
      break;
    case "error":
      toastElement.classList.add("bg-danger", "text-white");
      break;
    case "warning":
      toastElement.classList.add("bg-warning", "text-dark");
      break;
    default:
      toastElement.classList.add("bg-info", "text-white");
  }

  const bsToast = new bootstrap.Toast(toastElement);
  bsToast.show();
}
