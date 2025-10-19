const toggleBtn = document.createElement("button");
toggleBtn.className = "theme-toggle";
toggleBtn.innerHTML = "🌙";
document.querySelector("header").appendChild(toggleBtn);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.innerHTML = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleBtn.innerHTML = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function scrollToCountries() {
  const target = document.getElementById("countries");
  target?.scrollIntoView({ behavior: "smooth" });
}

const revealElements = document.querySelectorAll(".country-card, .food-card");
const revealOnScroll = () => {
  for (let el of revealElements) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  }
};
window.addEventListener("scroll", revealOnScroll);
revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 1s ease";
});

const cursor = document.createElement("div");
cursor.style.position = "fixed";
cursor.style.width = "25px";
cursor.style.height = "25px";
cursor.style.borderRadius = "50%";
cursor.style.background = "rgba(255, 200, 120, 0.6)";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "1000";
cursor.style.mixBlendMode = "overlay";
cursor.style.transition = "transform 0.1s ease";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX - 12 + "px";
  cursor.style.top = e.pageY - 12 + "px";
  cursor.style.transform = "scale(1.2)";
  setTimeout(() => cursor.style.transform = "scale(1)", 100);
});

const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;
canvas.width = innerWidth;
canvas.height = innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.fillStyle = "rgba(255, 200, 120, 0.6)";
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > innerWidth) p.dx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2023/03/15/audio_f0e02a77fa.mp3?filename=click-124467.mp3");
document.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
});

window.addEventListener("load", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1.2s ease";
  setTimeout(() => (document.body.style.opacity = 1), 100);
});
