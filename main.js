import categories from "./datas/!categories.js";

// mdでスペース2つせずとも改行してくれるやつ
marked.setOptions({
  breaks: true
});

// タグを認識させる
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

// 記事をロードする関数
async function loadArticle(path) {
  const response = await fetch(path);

  return await response.text();
}

// カテゴリごとの動作
for (const category of categories) {

    // 右：記事見出し
    const h2 = document.createElement("h2");
    h2.textContent = category.name;
    content.appendChild(h2);

    // 左：カテゴリ見出し
    const sidebarCategory = document.createElement("div");
    sidebarCategory.textContent = category.name;
    sidebarCategory.classList.add("sidebar-category");
    sidebar.appendChild(sidebarCategory);

    // カテゴリ内の記事ごとの動作
    for (const article of category.articles) {

        // 目次リンク
        const link = document.createElement("a");
        link.href = `#${article.file}`;
        link.textContent = article.title;
        sidebar.appendChild(link);

        // 記事読み込み
        const md = await fetch(article.file).then(r => r.text());
        const section = document.createElement("section");
        section.id = article.file;
        section.innerHTML = marked.parse(md);
        content.appendChild(section);
    }
}