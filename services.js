document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  // Use your main scroll container; fall back to the document
  const wrapper = document.querySelector(".wrapper");
  const root = document.scrollingElement || document.documentElement;

  // Respect reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let rafId = null; // so we can cancel if clicked repeatedly

  const smoothToTop = (scroller, duration = 450) => {
    if (prefersReduced || duration <= 0) {
      setTop(scroller, 0);
      return;
    }

    const startY = getTop(scroller);
    const startTime = performance.now();

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const y = Math.round(startY * (1 - easeOutCubic(t))); // from startY -> 0
      setTop(scroller, y);
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
  };

  function getTop(scroller) {
    return scroller === window ? window.scrollY : scroller.scrollTop;
  }
  function setTop(scroller, y) {
    if (scroller === window) window.scrollTo(0, y);
    else scroller.scrollTop = y;
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // pick the correct scroller (your site uses .wrapper)
    const scroller = (wrapper && wrapper.scrollHeight > wrapper.clientHeight)
      ? wrapper
      : window;

    smoothToTop(scroller, 450); // adjust duration if you want slower/faster
  });
});
