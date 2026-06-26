// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle with persistence + system preference
(function () {
  const root = document.documentElement;
  const key = "jayy-theme";
  const saved = localStorage.getItem(key);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  const btn = document.getElementById("theme-toggle");
  btn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });
})();

// Subtle reveal-on-scroll
(function () {
  const els = document.querySelectorAll(".section, .hero-card, .card, .pubs li");
  if (!("IntersectionObserver" in window)) return;
  els.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
})();
