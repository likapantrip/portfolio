document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".portfolio_main-box");
  if (!container) return;

  const { categoryData, contentData, subCategoryData, contentSubCategory } = window;
  if (!categoryData || !contentData || !subCategoryData || !contentSubCategory) return;

  // contentMapを作成
  const contentMap = Object.fromEntries(
    contentData.map(c => [Number(c.id), c])
  );

  // relation取得関数
  const getRelations = ({ categoryId, subCategoryId = null }) => {
    return contentSubCategory
      .filter(r => {
        const content = contentMap[Number(r.contentId)];
        if (!content) return false;

        const isCategoryMatch =
          Number(content.categoryId) === Number(categoryId);

        const isSubCategoryMatch =
          subCategoryId === null ||
          Number(r.subCategoryId) === Number(subCategoryId);

        return isCategoryMatch && isSubCategoryMatch;
      })
      .sort((a, b) => Number(a.order) - Number(b.order));
  };

  // relationをcontentへ変換
  const relationsToContents = relations =>
    relations.map(r => contentMap[Number(r.contentId)]);

  // コンテンツHTML生成
  const renderContents = (contents, indentClass, linkClass) =>
    contents.map(content => `
      <ul class="${indentClass}">
        <li>
          <a class="${linkClass} font-size-15" rel="noopener noreferrer" href="${content.url}">
            ${content.title}
          </a>
        </li>
        <div class="font-size-12">${content.description}</div>
      </ul>
    `).join("");

  // カテゴリ描画
  const sortedCategories = [...categoryData].sort(
    (a, b) => Number(a.categoryId) - Number(b.categoryId)
  );

  sortedCategories.forEach(category => {
    let contentLists = "";

    // classificationId === 1（サブカテゴリなし）
    if (category.classificationId == "1") {
      const relations = getRelations({
        categoryId: category.categoryId
      });

      const contents = relationsToContents(relations);

      contentLists = renderContents(
        contents,
        "indent2",
        "portfolio_content"
      );

    } else {
      // サブカテゴリあり
      const subCategories = subCategoryData
        .filter(s => Number(s.categoryId) === Number(category.categoryId))
        .sort((a, b) => Number(a.subCategoryId) - Number(b.subCategoryId));

      contentLists = subCategories.map(subCategory => {
        const relations = getRelations({
          categoryId: category.categoryId,
          subCategoryId: subCategory.subCategoryId
        });

        const contents = relationsToContents(relations);

        const contentHtml = renderContents(
          contents,
          "indent3",
          "content"
        );

        return `
          <details class="portfolio-details">
            <summary class="indent1 portfolio_object-title font-size-18">
              ${subCategory.subCategory}
            </summary>
            ${contentHtml}
          </details>
        `;
      }).join("");
    }

    const htmlMain = `
      <details class="portfolio_object-box portfolio-details">
        <summary class="portfolio_object-title font-size-18">
          ${category.categoryName}
        </summary>
        <div>${contentLists}</div>
      </details>
    `;

    container.insertAdjacentHTML("beforeend", htmlMain);
  });

  // 矢印処理
  const ARROW_SVG = `
    <img class="js-arrow" width="15" height="15"
      src="https://img.icons8.com/material-sharp/24/give-way--v1.png"
      alt="arrow"/>
  `;

  container.querySelectorAll(".portfolio-details").forEach(details => {
    const summary = details.querySelector("summary");
    if (!summary || summary.querySelector(".js-arrow")) return;

    const temp = document.createElement("span");
    temp.innerHTML = ARROW_SVG;
    const arrow = temp.firstElementChild;
    summary.prepend(arrow);

    const updateArrow = () => {
      arrow.style.transform = details.open
        ? "rotate(0deg)"
        : "rotate(-90deg)";
    };

    updateArrow();
    summary.addEventListener("click", () => {
      requestAnimationFrame(updateArrow);
    });
  });
});
