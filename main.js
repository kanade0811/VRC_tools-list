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

    // カテゴリ見出し
    const h2 = document.createElement("h2");
    h2.textContent = category.name;
    content.appendChild(h2);

    for (const article of category.articles) {

        // 目次
        const link = document.createElement("a");
        link.href = `#${article.file}`;
        link.textContent = article.title;

        toc.appendChild(link);
        toc.appendChild(document.createElement("br"));

        // 記事読み込み
        const md = await fetch(article.file).then(r => r.text());

        const section = document.createElement("section");
        section.id = article.file;
        section.innerHTML = marked.parse(md);

        content.appendChild(section);
    }
}