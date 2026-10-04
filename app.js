/*
  JS
  created on: 04-10-2026
*/

(() => {
  const views = [...document.querySelectorAll("[data-view]")];
  const navigationLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];

  function showView(id, updateHistory = false) {
    const activeId = views.some((view) => view.id === id) ? id : "home";
    document.body.classList.toggle("locked-view", activeId === "home" || activeId === "about");
    for (const view of views) {
      const active = view.id === activeId;
      view.hidden = !active;
      view.setAttribute("aria-hidden", String(!active));
      view.inert = !active;
    }
    for (const link of navigationLinks) {
      if (link.hash === `#${activeId}`) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
    if (updateHistory && location.hash !== `#${activeId}`) {
      history.pushState(null, "", `#${activeId}`);
    }
  }

  for (const link of document.querySelectorAll('a[href^="#"]')) {
    link.addEventListener("click", (event) => {
      const id = link.hash.slice(1);
      if (!views.some((view) => view.id === id)) return;
      event.preventDefault();
      showView(id, true);
    });
  }

  window.addEventListener("popstate", () => showView(location.hash.slice(1)));
  window.addEventListener("hashchange", () => showView(location.hash.slice(1)));
  showView(location.hash.slice(1));
})();
