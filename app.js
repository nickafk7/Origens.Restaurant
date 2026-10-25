const restaurant = {
  name: "Origens Restaurant",
  instagramDirect: "https://www.instagram.com/direct/t/17842052847211480/",
  instagramProfile: "https://www.instagram.com/origensrestaurantecampinas/",
  address: "Av. Júlio de Mesquita, 705 - Cambuí, Campinas, São Paulo 13025-063",
  locationLabel: "CAMBUÍ, CAMPINAS",
  hours: "Todos os dias · 6h às 24h",
};

document.title = `${restaurant.name} — Cozinha de brasa`;
document.querySelectorAll("[data-restaurant-name]").forEach((element) => {
  element.textContent = restaurant.name.toLocaleUpperCase("pt-BR");
});
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${restaurant.name}, ${restaurant.address}`,
)}`;

const actionFeedback = document.querySelector("#action-feedback");
const directMessages = {
  reservation: `Olá! Gostaria de fazer uma reserva no ${restaurant.name}. Poderiam me informar a disponibilidade, por favor?`,
};

document.querySelectorAll("[data-instagram-dm]").forEach((link) => {
  link.href = restaurant.instagramDirect;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.addEventListener("click", () => {
    const message = directMessages[link.dataset.instagramDm];
    const showFallback = () => {
      actionFeedback.textContent = `Ao abrir o Direct, copie e envie esta mensagem: “${message}”`;
      actionFeedback.hidden = false;
    };

    if (!navigator.clipboard?.writeText) {
      showFallback();
      return;
    }

    navigator.clipboard.writeText(message).then(
      () => {
        actionFeedback.textContent = "Mensagem copiada. Abra o Direct e cole para enviar.";
        actionFeedback.hidden = false;
      },
      showFallback,
    );
  });
});

document.querySelectorAll("[data-instagram-contact]").forEach((link) => {
  link.href = restaurant.instagramProfile;
});

document.querySelector("[data-maps]").href = mapsUrl;
document.querySelector("[data-maps]").target = "_blank";
document.querySelector("[data-maps]").rel = "noopener noreferrer";
document.querySelector("[data-address]").replaceChildren(
  restaurant.name,
  document.createElement("br"),
  restaurant.address,
);
document.querySelector("[data-location]").textContent = restaurant.locationLabel;
document.querySelector("[data-hours]").innerHTML = restaurant.hours;

document.querySelector("#year").textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(
  ".intro > *, .menu-section > *, .quote-section > *, .visit-section > *, .site-footer > *",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements.forEach((element) => {
    element.classList.add("scroll-reveal");
    revealObserver.observe(element);
  });
  document.body.classList.add("has-scroll-reveal");
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu lateral" : "Fechar menu lateral");
  siteNav.classList.toggle("is-open", !isExpanded);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu lateral");
    siteNav.classList.remove("is-open");
    menuToggle.focus();
  }
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu lateral");
    siteNav.classList.remove("is-open");
  }
});
