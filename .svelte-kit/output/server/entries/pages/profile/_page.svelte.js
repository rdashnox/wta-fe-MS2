import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p class="text-center py-5">Redirecting...</p>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
