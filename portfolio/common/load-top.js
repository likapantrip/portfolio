document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".portfolio_main-box");
  if (!container || !window.typeData) return;

  const filtered = [...window.typeData].filter(
    l => (l.id !== "3")
    );
  const sorted = filtered.sort((a, b) => Number(a.id) - Number(b.id))
  
  sorted.forEach(link => {
    const html =`
      <a rel="noopener noreferrer" href="${link.folderName}/category.html" class="portfolio_object-link">
        <div class="portfolio_object-box">
          <div class="portfolio_object-title font-size-18">${link.type}</div>
          <div class="portfolio_content font-size-15">${link.description}</div>
        </div>
      </a>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
  
});