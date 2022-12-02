var container = document.getElementById("mainContainer");

function startflipAnimation() {
  gsap.to(".imgct4", {
    ease: "power2.inOut",
    delay: 0.75,
    duration: 0.1,
    opacity: 0,
  });

  gsap.to("#cellPhoneBot", {
    duration: 1.5,
    ease: "power2.inOut",
    rotationX: -180,
    onComplete: flipEndCb,
  });
}

function flipEndCb() {
  Performics.settings.is_flipEnd = true;
  return;
}

var start = setInterval(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !Performics.settings.is_flipEnd) {
          observer.unobserve(container);
          clearInterval(start);
          startflipAnimation();
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(container);
}, 500);
