document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-box");
  if (!container || !window.categoryData || !window.contentData || !window.subCategoryData) return;

  const sortedCategories = [...window.categoryData].sort(
    (a, b) => Number(a.categoryId) - Number(b.categoryId)
  );

  sortedCategories.forEach(category => {
    let contentLists;

    if (category.classificationId == "1") {
      const filteredContents = window.contentData.filter(
        c => c.category === category.categoryName
      );
      const sortedContents = filteredContents.sort(
        (a, b) => Number(a.order) - Number(b.order)
      );
      
      contentLists = sortedContents.map(content => `
        <ul class="indent2">
          <li>
            <a class="content" target="_blank" href=${content.url}>${content.title}</a>
          </li>
          <div class="content-description">${content.description}</div>
        </ul>
      `).join("");
    } else {
      const filteredSubCategories = [...window.subCategoryData].filter(
        s => s.categoryId === category.categoryId
      );
      const sortedSubCategories = filteredSubCategories.sort(
        (a, b) => Number(a.subCategoryId) - Number(b.subCategoryId)
      );

      contentLists = sortedSubCategories.map(subCategory => {
        const filteredContents = window.contentData.filter(
          c => c.subCategory === subCategory.subCategory
        );
        const sortedContents = filteredContents.sort(
          (a, b) => Number(a.order) - Number(b.order)
        );
        
        const contentHtml = sortedContents.map(content => `
          <ul class="indent3">
            <li>
              <a class="content" target="_blank" href="${content.url}">${content.title}</a>
            </li>
            <div class="content-description">${content.description}</div>
          </ul>
        `).join("");

        return `
          <details>
            <summary class="indent1 object-title">${subCategory.subCategory}</summary>
            ${contentHtml}
          </details>
        `;
      }).join("");
    }
    
    const htmlMain = `
      <details class="object-box">
        <summary class="object-title">${category.categoryName}</summary>
        <div>${contentLists}</div>
      </details>
    `;
    container.insertAdjacentHTML("beforeend", htmlMain);
  });
});
