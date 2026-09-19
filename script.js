const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

document.querySelectorAll(".cert-card").forEach(card => {
  const path = card.dataset.cert;
  const thumb = card.querySelector(".cert-thumb");

  // If the real image exists, turn the placeholder into the certificate thumbnail.
  const img = new Image();
  img.onload = () => {
    thumb.classList.remove("placeholder");
    thumb.innerHTML = "";
    const displayImg = document.createElement("img");
    displayImg.src = path;
    displayImg.alt = card.querySelector("h3")?.textContent || "Certificate";
    thumb.appendChild(displayImg);
  };
  img.src = path;

  card.addEventListener("click", () => {
    const test = new Image();
    test.onload = () => {
      lightboxImage.src = path;
      lightboxCaption.textContent = card.querySelector("h3")?.textContent || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    };
    test.onerror = () => {
      alert("This certificate image has not been added yet. Place the real image at: " + path);
    };
    test.src = path;
  });
});

document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});
