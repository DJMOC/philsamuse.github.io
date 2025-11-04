// --- script.js ---

// Load a given page into the main container
async function loadPage(page) {
  try {
    const response = await fetch(page);
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    const html = await response.text();
    document.getElementById("main-content").innerHTML = html;
  } catch (err) {
    document.getElementById("main-content").innerHTML =
      `<p style="color:red;">Impossible de charger la page demandée.<br>${err}</p>`;
  }
}

// Extract current ?page= from the URL
function getPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "accueil.html"; // default page
}

// Update the URL and load the new page when a link is clicked
function handleNavClick(event) {
  const page = event.target.dataset.page;
  if (!page) return; // not a nav link
  event.preventDefault();

  history.pushState({ page }, "", `?page=${page}`);
  loadPage(page);
  setActiveLink(page);
}

// Update nav link styling to show active page (optional)
function setActiveLink(currentPage) {
  document.querySelectorAll("nav a").forEach(a => {
    if (a.dataset.page === currentPage)
      a.classList.add("active");
    else
      a.classList.remove("active");
  });
}

// Handle back/forward browser buttons
window.addEventListener("popstate", (e) => {
  const page = e.state?.page || getPageFromURL();
  loadPage(page);
  setActiveLink(page);
});

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  // Attach click handlers
  document.querySelectorAll("nav a").forEach(a =>
    a.addEventListener("click", handleNavClick)
  );

  // Load the initial page
  const page = getPageFromURL();
  loadPage(page);
  setActiveLink(page);
});
