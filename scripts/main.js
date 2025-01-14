// Intersection Observer for animations
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1
  }
);
document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});
// Cursor glow effect
const cursorGlow = document.querySelector(".cursor-glow");
let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.style.opacity = "1";
});

function animate() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  cursorX += dx * 0.1;
  cursorY += dy * 0.1;
  cursorGlow.style.left = cursorX + "px";
  cursorGlow.style.top = cursorY + "px";
  requestAnimationFrame(animate);
}
animate();
// Navbar hide on scroll
let lastScroll = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScroll = currentScroll;
});
// Particle effect
function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.borderRadius = "50%";
  document.body.appendChild(particle);
  const angle = Math.random() * Math.PI * 2;
  const velocity = 1 + Math.random() * 2;
  const dx = Math.cos(angle) * velocity;
  const dy = Math.sin(angle) * velocity;
  let opacity = 1;

  function animate() {
    particle.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
    particle.style.opacity = opacity;
    opacity -= 0.02;
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      particle.remove();
    }
  }
  requestAnimationFrame(animate);
}
document.addEventListener("mousemove", e => {
  if (Math.random() < 0.1) {
    createParticle(e.clientX, e.clientY);
  }
});
