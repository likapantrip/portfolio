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

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table_content font-size-12">${item.id}</td>
      <td><a class="table_content font-size-12" rel="noopener noreferrer" href="${item.url}">${item.title}</a></td>
      <td class="table_content font-size-12">${categoryName}</td>
      <td class="table_content font-size-12">${item.createdDate}</td>
    `;
    tbody.appendChild(tr);
  });
});