/* ══════════════════════════════════════════════════
   SERTIFIKAT DATA
   ─────────────────────────────────────────────────
   Cara menambah sertifikat:
   1. Letakkan file gambar di folder: images/certificates/
   2. Tambahkan objek baru di array CERTIFICATES di bawah ini.

   Format objek:
   {
     image : "images/certificates/nama-file.jpg",  // path ke gambar
     title : "Nama Sertifikat",                    // judul yang tampil
     issuer: "Nama Penerbit",                      // contoh: "Dicoding", "Coursera"
     year  : "2024",                               // tahun
   }
══════════════════════════════════════════════════ */

const CERTIFICATES = [
  // ── Tambahkan sertifikat kamu di sini ──────────
  // Contoh (hapus komentar // dan isi path gambar):

  {
    image : "images/certificates/fitcom.png",
    title : "Juara 1 Fitcom Cyber Security2025",
    issuer: "Universitas Dinamika",
    year  : "2025",
  },
  {
    image : "images/certificates/jhic.png",
    title : "Semi Finalist Jhic 2025",
    issuer: "Jagoan Hosting",
    year  : "2025",
  },
];

/* ══════════════════════════════════════════════════
   RENDER SERTIFIKAT KE GRID
══════════════════════════════════════════════════ */

function renderCertificates() {
  const grid  = document.getElementById("cert-grid");
  const empty = document.getElementById("cert-empty");

  if (!grid) return;

  if (CERTIFICATES.length === 0) {
    grid.style.display  = "none";
    if (empty) empty.style.display = "block";
    return;
  }

  grid.style.display  = "";
  if (empty) empty.style.display = "none";
  grid.innerHTML = "";

  CERTIFICATES.forEach((cert, i) => {
    const item = document.createElement("div");
    item.className = "work-item cert-item";
    item.dataset.index = i;

    item.innerHTML = `
      <img
        class="cert-img"
        src="${cert.image}"
        alt="${cert.title}"
        loading="lazy"
        onerror="this.parentElement.classList.add('cert-broken')"
      />
      <div class="work-overlay cert-overlay">
        <span class="cert-num">${String(i + 1).padStart(2, "0")}</span>
        <p class="work-title">${cert.title}</p>
        <p class="work-tag">${cert.issuer} · ${cert.year}</p>
        <span class="cert-view-hint">Klik untuk lihat →</span>
      </div>
    `;

    item.addEventListener("click", () => openLightbox(i));
    grid.appendChild(item);
  });

  // Re‑apply scroll reveal to newly created items
  bindReveal(grid.querySelectorAll(".cert-item"));
  // Re‑apply cursor expansion
  bindCursor(grid.querySelectorAll(".cert-item"));
}

/* ══════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════ */

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const cert = CERTIFICATES[index];
  const lb   = document.getElementById("lightbox");

  document.getElementById("lightbox-img").src   = cert.image;
  document.getElementById("lightbox-img").alt   = cert.title;
  document.getElementById("lightbox-title").textContent = cert.title;
  document.getElementById("lightbox-tag").textContent   = `${cert.issuer} · ${cert.year}`;

  lb.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.remove("active");
  document.body.style.overflow = "";
}

function lightboxNav(dir) {
  let next = currentIndex + dir;
  if (next < 0) next = CERTIFICATES.length - 1;
  if (next >= CERTIFICATES.length) next = 0;
  openLightbox(next);
}

// Lightbox controls
document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);

document.getElementById("lightbox")?.addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});

document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (!lb?.classList.contains("active")) return;
  if (e.key === "Escape")      closeLightbox();
  if (e.key === "ArrowRight")  lightboxNav(+1);
  if (e.key === "ArrowLeft")   lightboxNav(-1);
});

/* ══════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════ */

const cursor = document.getElementById("cursor");
let mx = -100, my = -100;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top  = my + "px";
});

function bindCursor(elements) {
  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("expanded"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("expanded"));
  });
}

bindCursor(document.querySelectorAll("a, .work-item, button, .skill-card"));

/* ══════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════ */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function bindReveal(elements) {
  elements.forEach((el) => {
    el.style.opacity    = "0";
    el.style.transform  = "translateY(28px)";
    el.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";
    observer.observe(el);
  });
}

const staticReveal = document.querySelectorAll(
  ".skills-list li, .about-heading, .contact-heading, .skill-card"
);
bindReveal(staticReveal);

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */

renderCertificates();