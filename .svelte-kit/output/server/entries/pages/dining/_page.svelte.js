import { i as head, j as ensure_array_like, a as attr_class, k as attr, c as stringify } from "../../../chunks/index2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("bz8p3m", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dining | Skye Suites</title>`);
      });
    });
    $$renderer2.push(`<main class="dining-main container-fluid p-0 svelte-bz8p3m"><section class="content-title svelte-bz8p3m" aria-label="Breakfast dining section"><div class="container py-5"><div class="row align-items-center"><div class="col-md-6 mb-4 mb-md-0 text-center"><h3 class="fw-bold section-title svelte-bz8p3m">Breakfast</h3> <h5 class="section-description svelte-bz8p3m">Rise and Shine! <br/> Good food to start the day.</h5> <p class="section-paragraph svelte-bz8p3m">Daily from 07:00 to 10:00</p></div> <div class="col-md-6"><div id="breakfastCarousel" class="carousel slide carousel-fade svelte-bz8p3m"><div class="carousel-inner rounded-4 shadow svelte-bz8p3m"><!--[-->`);
    const each_array = ensure_array_like([
      "3298637",
      "5718127",
      "6466291",
      "376464",
      "7936685",
      "8130688"
    ]);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let img = each_array[i];
      $$renderer2.push(`<div${attr_class(`carousel-item ${stringify(i === 0 ? "active" : "")}`, "svelte-bz8p3m")}><img${attr("src", `https://images.pexels.com/photos/${img}/pexels-photo-${img}.jpeg`)} class="d-block w-100 img-fluid svelte-bz8p3m" alt="Breakfast" loading="lazy"/></div>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="carousel-control-prev" type="button" data-bs-target="#breakfastCarousel" data-bs-slide="prev" aria-label="Previous slide"><span class="carousel-control-prev-icon"></span></button> <button class="carousel-control-next" type="button" data-bs-target="#breakfastCarousel" data-bs-slide="next" aria-label="Next slide"><span class="carousel-control-next-icon"></span></button></div></div></div></div></section> <section class="content-title svelte-bz8p3m" aria-label="Restaurant dining section"><div class="container py-5"><div class="row align-items-center flex-md-row-reverse"><div class="col-md-6 mb-4 mb-md-0 text-center"><h3 class="fw-bold section-title svelte-bz8p3m">Restaurant</h3> <h5 class="section-description svelte-bz8p3m">It's a fine time to dine! <br/> A genuine fine-dining experience awaits.</h5> <p class="section-paragraph-white svelte-bz8p3m">Daily from 10:00 to 22:00</p></div> <div class="col-md-6"><div id="restaurantCarousel" class="carousel slide carousel-fade svelte-bz8p3m"><div class="carousel-inner rounded-4 shadow svelte-bz8p3m"><!--[-->`);
    const each_array_1 = ensure_array_like([
      "34308310",
      "3297803",
      "17086288",
      "17035088",
      "8680485",
      "10296258"
    ]);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let img = each_array_1[i];
      $$renderer2.push(`<div${attr_class(`carousel-item ${stringify(i === 0 ? "active" : "")}`, "svelte-bz8p3m")}><img${attr("src", `https://images.pexels.com/photos/${img}/pexels-photo-${img}.jpeg`)} class="d-block w-100 img-fluid svelte-bz8p3m" alt="Restaurant" loading="lazy"/></div>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="carousel-control-prev" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="prev" aria-label="Previous slide"><span class="carousel-control-prev-icon"></span></button> <button class="carousel-control-next" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="next" aria-label="Next slide"><span class="carousel-control-next-icon"></span></button></div></div></div></div></section> <section class="content-title svelte-bz8p3m" aria-label="Lounge and bar dining section"><div class="container py-5"><div class="row align-items-center"><div class="col-md-6 mb-4 mb-md-0 text-center"><h3 class="fw-bold section-title svelte-bz8p3m">Lounge &amp; Bar</h3> <h5 class="section-description svelte-bz8p3m">The best hour is happy hour. <br/> Come and have a drink!</h5> <p class="section-paragraph svelte-bz8p3m">Daily from 18:00 to 23:00</p></div> <div class="col-md-6"><div id="barCarousel" class="carousel slide carousel-fade svelte-bz8p3m"><div class="carousel-inner rounded-4 shadow svelte-bz8p3m"><!--[-->`);
    const each_array_2 = ensure_array_like([
      "2507010",
      "34322168",
      "19790823",
      "1058277",
      "338347",
      "2291636"
    ]);
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      let img = each_array_2[i];
      $$renderer2.push(`<div${attr_class(`carousel-item ${stringify(i === 0 ? "active" : "")}`, "svelte-bz8p3m")}><img${attr("src", `https://images.pexels.com/photos/${img}/pexels-photo-${img}.jpeg`)} class="d-block w-100 img-fluid svelte-bz8p3m" alt="Bar" loading="lazy"/></div>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="carousel-control-prev" type="button" data-bs-target="#barCarousel" data-bs-slide="prev" aria-label="Previous slide"><span class="carousel-control-prev-icon"></span></button> <button class="carousel-control-next" type="button" data-bs-target="#barCarousel" data-bs-slide="next" aria-label="Next slide"><span class="carousel-control-next-icon"></span></button></div></div></div></div></section></main>`);
  });
}
export {
  _page as default
};
