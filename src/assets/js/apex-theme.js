/**
 * Apex PC storefront enhancements.
 * Kept intentionally small and defensive.
 */
(() => {
  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  ready(() => {
    document.documentElement.classList.add("apex-pc-theme");

    const cards = document.querySelectorAll(
      ".product-entry, .s-product-card-entry, .s-product-card-vertical"
    );

    cards.forEach((card) => {
      card.setAttribute("data-apex-card", "true");
    });
  });
})();
