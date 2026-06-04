import categories from "./datas/!categories.js";

// mdでスペース2つせずとも改行してくれるやつ
marked.setOptions({
  breaks: true
});

// タグを認識させる
const toc = document.getElementById("toc");
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
    const tocCategory = document.createElement("div");
    tocCategory.textContent = category.name;
    tocCategory.classList.add("toc-category");
    toc.appendChild(tocCategory);

    // カテゴリ内の記事ごとの動作
    for (const article of category.articles) {

        // 目次リンク
        // タグを認識させる
        const link = document.createElement("a");
        // リンクを繋げる
        link.href = `#${article.file}`;
        // リンクのタイトルを設定
        link.textContent = article.title;
        // tocに追加
        toc.appendChild(link);

        // 記事読み込み
        // 記事内容を受け取る
        const md = await fetch(article.file).then(r => r.text());
        // セクションタグを追加
        const section = document.createElement("section");
        // id付け
        section.id = article.file;
        // 中身を設定
        section.innerHTML = marked.parse(md);
        // contentに追加
        content.appendChild(section);
    }
}