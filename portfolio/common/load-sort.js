document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".portfolio_main-box");
  if (!container || !window.contentData) return;

  let html = `
    <div class="portfolio_object-box">
      <table border="1">
        <tr>
          <th class="table_column1 font-size-15">No.</th>
          <th class="table_column2 font-size-15">制作物</th>
          <th class="table_column3 font-size-15">カテゴリ</th>
          <th class="table_column3 font-size-15">公開日</th>
        </tr>
        <tbody id="list"></tbody>
      </table>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", html);

  // tbody にデータを追加
  const tbody = container.querySelector("#list");
  const sorted = [...window.contentData].sort((a, b) => Number(b.id) - Number(a.id));

  sorted.forEach(item => {
    // categoryIdで該当カテゴリを取得
    const category = window.categoryData.find(
      c => c.categoryId === item.categoryId
    );
    const categoryName = category ? category.categoryName : "未分類";

    // コンテンツに紐づくサブカテゴリを取得
    const relations = window.contentSubCategory.filter(
      r => Number(r.contentId) === Number(item.id)
    );

    // subCategoryIdで該当サブカテゴリを取得
    const subCategory = window.subCategoryData.find(
      s => category.categoryId === s.categoryId && item.categoryId === category.categoryId && relations.some(r => Number(r.subCategoryId) === Number(s.subCategoryId))
    );
    // サブカテゴリがない場合は「未分類」と表示。複数ある場合は最初の1件を表示
    const subCategoryName = subCategory ? subCategory.subCategory : "未分類";

    // 「アプリケーション＞提供終了アプリ」の場合、タイトル名の頭に「提供終了」を付与
    const title = (categoryName === "アプリケーション" && subCategoryName === "提供終了アプリ")
      ? `【提供終了】${item.title}`
      : item.title;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table_content font-size-12">${item.id}</td>
      <td><a class="table_content font-size-12" rel="noopener noreferrer" href="${item.url}">${title}</a></td>
      <td class="table_content font-size-12">${categoryName}</td>
      <td class="table_content font-size-12">${item.createdDate}</td>
    `;
    tbody.appendChild(tr);
  });
});