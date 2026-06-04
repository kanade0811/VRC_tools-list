import categories from "./datas/!categories.js";

marked.setOptions({
  breaks: true
});

const toc = document.getElementById("toc");
const content = document.getElementById("content");

async function loadArticle(path) {
  const response = await fetch(path);

  return await response.text();
}

for (const category of categories) {

    // 右：記事見出し
    const h2 = document.createElement("h2");
    h2.textContent = category.name;
    content.appendChild(h2);

    // 左：カテゴリ見出しも追加
    const tocCategory = document.createElement("div");
    tocCategory.textContent = category.name;
    tocCategory.style.color = "#9ca3af";
    tocCategory.style.fontSize = "12px";
    tocCategory.style.marginTop = "16px";
    tocCategory.style.marginBottom = "6px";
    // tocCategory.style.textTransform = "uppercase";
    tocCategory.style.letterSpacing = "0.05em";

    toc.appendChild(tocCategory);

    for (const article of category.articles) {

        // 目次リンク
        const link = document.createElement("a");
        link.href = `#${article.file}`;
        link.textContent = article.title;

        toc.appendChild(link);

        // 記事読み込み（そのまま）
        const md = await fetch(article.file).then(r => r.text());

        const section = document.createElement("section");
        section.id = article.file;
        section.innerHTML = marked.parse(md);

        content.appendChild(section);
    }
}