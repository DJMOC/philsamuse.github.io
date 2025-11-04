document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main-content");

  // Function to load a page's content
  async function loadPage(page) {
    try {
      const response = await fetch(page);
      if (!response.ok) throw new Error(`Erreur ${response.status}`);
      const html = await response.text();
      main.innerHTML = html;
      history.pushState({ page }, "", page); // Update URL
    } catch (err) {
      main.innerHTML = `<p>Impossible de charger la page (${page}).</p>`;
      console.error(err);
    }
  }

  // Handle clicks on internal links
  document.querySelectorAll("a[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);
    });
  });

  // Handle browser navigation (back/forward)
  window.addEventListener("popstate", e => {
    if (e.state && e.state.page) {
      loadPage(e.state.page);
    }
  });

  // Load default page (home)
  loadPage("accueil.html");
});

