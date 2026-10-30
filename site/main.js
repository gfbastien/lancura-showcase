// L'Ancura — site vitrine

// Lien de partage du formulaire Tally de la liste d'attente (ex. "https://tally.so/r/abc123").
// Le formulaire doit déclarer les champs cachés "plan", "profil", "langue" et "email" pour récupérer
// le contexte du clic. Laisser vide tant que le formulaire n'existe pas.
const WAITLIST_URL = "";

const EN = document.documentElement.lang === "en";
const MESSAGES = EN
  ? { soon: "Thanks! The waitlist opens very soon.", done: "Thanks! Finish signing up in the tab that just opened." }
  : { soon: "Merci ! La liste d'attente ouvre très bientôt.", done: "Merci ! Finalisez votre inscription dans l'onglet ouvert." };

function waitlistHref(params) {
  if (!WAITLIST_URL) return "#rejoindre";
  const url = new URL(WAITLIST_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

// Navigation : bordure au scroll + menu mobile
const nav = document.querySelector(".nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = nav.querySelector(".nav-toggle");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".nav-links a").forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("open"))
  );
}

// Liens vers la liste d'attente, avec le plan cliqué pour mesurer l'intérêt par offre
document.querySelectorAll("[data-waitlist]").forEach((link) => {
  const plan = EN ? `${link.dataset.waitlist}-en` : link.dataset.waitlist;
  const href = waitlistHref({ plan });
  link.setAttribute("href", href);
  if (WAITLIST_URL) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  } else if (!document.getElementById("rejoindre")) {
    link.setAttribute("href", `index.html#rejoindre`);
  }
});

// Formulaire de la page d'accueil : redirige vers Tally avec l'email pré-rempli
const form = document.querySelector(".waitlist");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const msg = form.querySelector(".form-msg");
  const email = form.elements.email.value.trim();
  const profil = form.elements.profil.value;
  if (!WAITLIST_URL) {
    msg.textContent = MESSAGES.soon;
    return;
  }
  window.open(waitlistHref({ email, profil, plan: EN ? "accueil-en" : "accueil", langue: EN ? "en" : "fr" }), "_blank", "noopener");
  msg.textContent = MESSAGES.done;
});

// Page tarifs : bascule Particuliers / Professionnels
const tabs = document.querySelectorAll(".toggle [role='tab']");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
    });
  });
});
if (location.hash === "#pros") document.getElementById("tab-pros")?.click();

// Apparition progressive des sections
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
