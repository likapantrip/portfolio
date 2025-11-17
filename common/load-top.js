document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-box");
  if (!container || !window.typeData) return;

  const filtered = [...window.typeData].filter(
    l => (l.type !== "TOP")
    );
  const sorted = filtered.sort((a, b) => Number(a.id) - Number(b.id))
  
  sorted.forEach(link => {
    const html =`
      <a target="_blank" href="${link.folderName}/category.html" class="object-link">
        <div class="object-box">
          <div class="object-title">${link.type}</div>
          <div class="content">${link.description}</div>
        </div>
      </a>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
  
});