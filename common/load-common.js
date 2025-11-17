document.addEventListener("DOMContentLoaded", () => {
  // typeData
  const itId = document.getElementById("it");
  const articleId = document.getElementById("article");
  const topId = document.getElementById("top");
  
  let typeData;
  if (itId) {
    typeData = window.typeData.find(t => t.type === "IT")
  } else if (articleId) {
    typeData = window.typeData.find(t => t.type === "Article")
  } else if (topId) {
    typeData = window.typeData.find(t => t.type === "TOP")
  } else {
    typeData = undefined
  }

  // head
  document.querySelector("title").textContent = `Portfolio - ${typeData.type}`;
  document.querySelector('meta[property="og:description"]')
          .setAttribute("content", typeData.pageDescription);

  // header
  const containerHeader = document.querySelector(".header-box");

  if (containerHeader) {
    const htmlHeader = `
      <div class="header-content">${typeData.type}</div>
      <div class="header-button"></div>
    `;
    containerHeader.insertAdjacentHTML("beforeend", htmlHeader);
  }

  const containerHeaderButton = document.querySelector(".header-button");

  if(!topId) {
    const categoryId = document.getElementById("category");

    let objectData;
    if (categoryId) {
      objectData = window.headerData.find(h => h.id === "category");
    } else {
      objectData = window.headerData.find(h => h.id === "sort");
    }

    const htmlHeaderButton = `
      <a href="${objectData.id}.html" class="object-link">
        <div class="header-link-object-box">
          <div>${objectData.buttonLabel}</div>
        </div>
      </a>
    `;
    containerHeaderButton.insertAdjacentHTML("beforeend", htmlHeaderButton);
  }

  // footer
  const containerFooter = document.querySelector(".footer-box");

  let filteredFooters
  if (topId) {
    filteredFooters = window.footerData.filter(
    l => (l.buttonLabel !== "TOP")
    );
  } else {
    filteredFooters = window.footerData
  }

  const sortedFooter = filteredFooters.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  sortedFooter.forEach(f => {
    const htmlFooter = `
      <a href="${f.url}" target="${f.target}" class="object-link">
        <div class="link-object-box">
          <div class="content">${f.buttonLabel}</div>
        </div>
      </a>
    `;
    containerFooter.insertAdjacentHTML("beforeend", htmlFooter);
  });
});