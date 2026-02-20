document.addEventListener("DOMContentLoaded", () => {
  // typeData
  const itId = document.getElementById("it");
  const writingId = document.getElementById("writing");
  const topId = document.getElementById("top");
  
  let typeData;
  if (itId) {
    typeData = window.typeData.find(t => t.id === "1")
  } else if (writingId) {
    typeData = window.typeData.find(t => t.id === "2")
  } else if (topId) {
    typeData = window.typeData.find(t => t.id === "3")
  } else {
    typeData = undefined
  }

  // head
  if (topId) {
    document.querySelector("title").textContent = `ポートフォリオ一覧｜りかぱん`;
  } else {
    document.querySelector("title").textContent = `ポートフォリオ（${typeData.type}）｜りかぱん`;
  }

  // header
  const containerHeader = document.querySelector(".portfolio_header-box");

  if (containerHeader) {
    const htmlHeader = `
      <div class="portfolio_header-content font-size-21">${typeData.type}</div>
      <div class="portfolio_header-button"></div>
    `;
    containerHeader.insertAdjacentHTML("beforeend", htmlHeader);
  }

  const containerHeaderButton = document.querySelector(".portfolio_header-button");

  if(!topId) {
    const categoryId = document.getElementById("category");

    let objectData;
    if (categoryId) {
      objectData = window.headerData.find(h => h.id === "category");
    } else {
      objectData = window.headerData.find(h => h.id === "sort");
    }

    const htmlHeaderButton = `
      <a href="${objectData.id}.html" class="portfolio_object-link">
        <div class="portfolio_header-link-object-box font-size-12">
          <div>${objectData.buttonLabel}</div>
        </div>
      </a>
    `;
    containerHeaderButton.insertAdjacentHTML("beforeend", htmlHeaderButton);
  }

  // footer
  const containerFooter = document.querySelector(".portfolio_footer-box");

  let filteredFooters
  if (topId) {
    filteredFooters = window.footerData.filter(
    l => (l.isTop === "TRUE")
    );
  } else {
    filteredFooters = window.footerData.filter(
    l => (l.isTop === "FALSE")
    );
  }

  const sortedFooter = filteredFooters.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  sortedFooter.forEach(f => {
    const htmlFooter = `
      <a href="${f.url}" rel="noopener noreferrer" class="portfolio_object-link">
        <div class="portfolio_footer-link-object-box font-size-18">
          <div class="portfolio_content font-size-15">${f.buttonLabel}</div>
        </div>
      </a>
    `;
    containerFooter.insertAdjacentHTML("beforeend", htmlFooter);
  });
});