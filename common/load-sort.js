document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-box");
  if (!container || !window.contentData) return;

  let html = `
    <div class="object-box">
      <table border="1">
        <tr>
          <th class="table-column1">No.</th>
          <th class="table-column2">制作物</th>
          <th class="table-column3">分類</th>
          <th class="table-column3">公開日</th>
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
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table-content">${item.id}</td>
      <td><a class="table-content" target="_blank" href="${item.url}">${item.title}</a></td>
      <td class="table-content">${item.category}</td>
      <td class="table-content">${item.createdDate}</td>
    `;
    tbody.appendChild(tr);
  });
});