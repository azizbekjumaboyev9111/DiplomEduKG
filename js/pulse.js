document.addEventListener("DOMContentLoaded", () => {
  const paths = document.querySelectorAll(".pulse-divider path");
  if (!paths.length) return;

  const drawn = new WeakSet();

  const drawPath = (path) => {
    if (drawn.has(path)) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });
    drawn.add(path);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          drawPath(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    io.observe(path);
  });
});