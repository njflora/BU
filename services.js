document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target); // optional: stop observing once visible
        }
      });
    },
    {
      // Use the scrollable container as the root.
      root: wrapper || null,
      // Start the animation a bit before fully in view:
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1
    }
  );

  document.querySelectorAll(".animate").forEach(el => observer.observe(el));
});