<svelte:head>
  <title>Home | Skye Suites</title>
</svelte:head>

<main class="index-main" id="main-content">
  <section class="index-services" aria-label="Main services offered">
    <div class="container index-services__container">
      <!-- Bootstrap: Container -->
      <div class="row g-4">
        <!-- Bootstrap: Row-->

        <div class="col-lg-6">
          <!-- Bootstrap: Column-->
          <article class="index-service-card">
            <a href="suites.html" data-page-id="suites">
              <img
                src="https://images.pexels.com/photos/31817162/pexels-photo-31817162.jpeg"
                alt="Luxurious suites"
                class="img-fluid index-service-card__image"
                loading="lazy"
              />
              <div class="index-service-card__content">
                <h2 class="index-service-card__title">Exquisite Suites</h2>
                <p class="index-service-card__text">
                  Experience elegant comfort with our beautifully designed
                  suites, combining luxury with breathtaking views.
                </p>
              </div>
            </a>
          </article>
        </div>

        <div class="col-lg-6">
          <!-- Bootstrap: Column-->
          <article class="index-service-card">
            <a href="dining.html" data-page-id="dining">
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
                alt="Dining experience"
                class="index-service-card__image"
                loading="lazy"
              />
              <div class="index-service-card__content">
                <h2 class="index-service-card__title">Culinary Delights</h2>
                <p class="index-service-card__text">
                  Savor gourmet dishes crafted by our world-class chefs at our
                  award-winning restaurants.
                </p>
              </div>
            </a>
          </article>
        </div>

        <div class="col-lg-6">
          <!-- Bootstrap: Column-->
          <article class="index-service-card">
            <a href="experience.html" data-page-id="experience">
              <img
                src="https://images.pexels.com/photos/6908362/pexels-photo-6908362.jpeg"
                alt="Spa and wellness experience"
                class="index-service-card__image"
                loading="lazy"
              />
              <div class="index-service-card__content">
                <h2 class="index-service-card__title">
                  Unforgettable Experiences
                </h2>
                <p class="index-service-card__text">
                  Relax and rejuvenate with exclusive spa treatments,
                  adventures, and curated experiences.
                </p>
              </div>
            </a>
          </article>
        </div>

        <div class="col-lg-6">
          <!-- Bootstrap: Column-->
          <article class="index-service-card">
            <a href="access.html" data-page-id="access">
              <img
                src="https://images.pexels.com/photos/16253098/pexels-photo-16253098.jpeg"
                alt="Hotel access location"
                class="index-service-card__image"
                loading="lazy"
              />
              <div class="index-service-card__content">
                <h2 class="index-service-card__title">Seamless Access</h2>
                <p class="index-service-card__text">
                  Conveniently located with detailed directions and transport
                  options, making your journey effortless.
                </p>
              </div>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  /* Services Section */
  .index-main {
    max-width: 1200px;
    margin: 3rem auto 5rem;
    padding: 0 1.5rem;
  }

  .index-services__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 3rem;
  }

  .index-service-card {
    background-color: var(--color-bg-light);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 20px rgb(0 0 0 / 0.1);
    transition: box-shadow var(--transition);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .index-service-card:hover,
  .index-service-card:focus-within {
    box-shadow: 0 8px 30px rgb(230 57 70 / 0.3);
  }

  .index-service-card__image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    flex-shrink: 0;
  }

  .index-service-card__content {
    padding: 1.5rem 1.5rem;
    color: var(--color-text-dark);
  }

  .index-service-card__title {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    margin: 0 0 0.5rem;
    font-weight: 700;
    font-family: var(--font-family-serif);
  }

  .index-service-card__title {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition);
  }

  .index-service-card__title:hover,
  .index-service-card__title:focus {
    color: var(--color-primary-dark);
    outline: none;
  }

  .index-service-card__text {
    font-size: 1rem;
    line-height: 1.6;
  }

  /* Responsive tweaks */
  @media (max-width: 600px) {
    .index-service-card__image {
      height: 180px;
    }
  }
</style>