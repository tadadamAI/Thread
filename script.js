const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.classList.toggle("is-open", !isOpen);
});

mobileNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  }
});

const roles = document.querySelector("#roles");
const dailyValue = document.querySelector("#daily-value");
const daysOpen = document.querySelector("#days-open");
const costResult = document.querySelector("#cost-result");

function updateVacancyCost() {
  const total =
    Math.max(0, Number(roles.value)) *
    Math.max(0, Number(dailyValue.value)) *
    Math.max(0, Number(daysOpen.value));

  costResult.textContent = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(total);
}

[roles, dailyValue, daysOpen].forEach((input) => input?.addEventListener("input", updateVacancyCost));

// Arrow draw-in on scroll
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const solutionSection = document.querySelector(".solution-section");
  if (solutionSection) {
    const paths = solutionSection.querySelectorAll(".s-arrow path");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.setProperty("--arrow-len", len);
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });

    const arrowObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const ps = e.target.querySelectorAll(".s-arrow path");
            ps.forEach((p, i) => {
              setTimeout(() => { p.style.strokeDashoffset = 0; }, i * 180);
            });
            arrowObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    arrowObs.observe(solutionSection);
  }
}

document.querySelector("#assessment-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = event.currentTarget.querySelector(".form-status");
  status.textContent = "Thanks. Your hiring brief is ready for Thread to review.";
});
