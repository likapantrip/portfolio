document.addEventListener("DOMContentLoaded", () => {
  // head
  document.querySelector("title").textContent = `プロフィール｜りかぱん`;

  // QRコード表示
  const shareBtn = document.getElementById("profile_sharing");
  const qrBox = document.querySelector(".profile_sharing-qr-box");
  const closeBtn = document.getElementById("profile_sharing-qrcode-close");

  // シェアボタンをクリック → 表示
  shareBtn.addEventListener("click", () => {
    qrBox.style.display = "flex";
  });

  // 閉じるボタンをクリック → 非表示
  closeBtn.addEventListener("click", () => {
    qrBox.style.display = "none";
  });

  // profile_title-meに名前を表示
  const containerName = document.querySelector("#profile_title-me");
  
  const filteredNameData = window.nameData.filter(
    n => (n.id === "1")
  );
  filteredNameData.forEach(n => {
    const htmlName = `
      <div class="profile_title-me font-size-21">${n.name}</div>
    `
    containerName.insertAdjacentHTML("beforeend", htmlName);
  });

  // profile_snsにSNSリンクを表示
  const containerSns = document.querySelector("#profile_sns");

  const sortedSnsData = window.snsData.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  sortedSnsData.forEach(s => {
    const htmlSns = `
      <a class="profile_sns-object-box" href="${s.snsLink}">
        <div class="profile_title font-size-12">${s.name}</div>
        <img class="profile_image-link" src="${s.imageLink}" alt="${s.name}"/>
      </a>
    `
    containerSns.insertAdjacentHTML("beforeend", htmlSns);
  });

  // profile_content にデータを追加
  const containerProfile = document.querySelector("#profile_content");

  const sortedProfileContent = window.profileData.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  sortedProfileContent.forEach(p => {
    const htmlProfile = `
      <div class="profile_content-box">
      <div class="profile_content-title font-size-18">${p.title}</div>
      <div class="font-size-12">${p.description.replace(/\n/g, "<br>")}</div>
      </div>
      <div class="profile_space-10"></div>
    `
    containerProfile.insertAdjacentHTML("beforeend", htmlProfile);
  });

  // profile_additional-content にデータを追加
  const containerAdditionalProfile = document.querySelector("#profile_additional-content");

  const sortedAdditionalProfileContent = window.additionalProfileData.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  sortedAdditionalProfileContent.forEach(ap => {
    const htmlAdditionalProfile = `
      <div class="profile_content-box">
      <div class="profile_content-title font-size-18">${ap.title}</div>
      <div class="font-size-12">${ap.description.replace(/\n/g, "<br>")}</div>
      </div>
      <div class="profile_space-10"></div>
    `
    containerAdditionalProfile.insertAdjacentHTML("beforeend", htmlAdditionalProfile);
  });

  // profile_update-date にデータを追加
  const containerUpdateDate = document.querySelector("#profile_update-date");

  const filteredUpdateData = window.updateData.filter(
    u => (u.id === "1")
  );

  filteredUpdateData.forEach(ud => {
    const htmlUpdateDate = `
      <div class="profile_content-box ">
      <div class="profile_content-title font-size-18">${ud.title}</div>
      <div class="font-size-12">${ud.description}</div>
      </div>
      <div class="profile_footer-box"></div>
    `
    containerUpdateDate.insertAdjacentHTML("beforeend", htmlUpdateDate);
  });
});