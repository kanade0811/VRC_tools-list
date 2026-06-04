import useful from "./datas/useful.js";

marked.setOptions({
  breaks: true
});

const toc = document.getElementById("toc");
const content = document.getElementById("content");

async function loadArticle(path) {
  const response = await fetch(path);

  return await response.text();
}

for (const article of useful) {
  // 目次生成
  const link = document.createElement("a");

  link.href = `#${article.file}`;

  link.textContent = article.title;

  toc.appendChild(link);

  toc.appendChild(document.createElement("br"));

  // 記事読み込み
  const md = await loadArticle(article.file);

  const section = document.createElement("section");

  section.id = article.file;

  section.innerHTML = marked.parse(md);

  content.appendChild(section);
}
