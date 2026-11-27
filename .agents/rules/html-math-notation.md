---
trigger: always_on
---

# HTML ドキュメントの数式表記ルール

このリポジトリで作成・更新するすべての HTML ドキュメントでは、外部 JavaScript 数式ライブラリ（MathJax・KaTeX 等）を使用せず、ブラウザ標準で数式を描画するため、以下の規約を遵守すること。

## 1. 生の LaTeX 記法・外部数式ライブラリの禁止

- HTML 本文・見出し・表・`data-explanation` 等の属性内に `$...$`、`$$...$$`、`\( ... \)`、`\[ ... \]` および `\frac`・`\text`・`\times` 等の生の LaTeX 記法を記述しない。
- MathJax や KaTeX などの外部 JavaScript ライブラリを読み込む `<script>`・`<link>` タグを追加しない。

## 2. HTML 標準記法による記述ルール

数式や変数は、用途に応じて HTML 標準の要素・文字実体参照・ネイティブ MathML（`<math>`）で記述する。

- **インラインの変数・添字・指数**
  - `<i>`、`<sub>`、`<sup>` を使用する。
  - 例：`<i>S</i><sub>T</sub>`、`<i>K</i><sub>1</sub>`、`<i>S</i><sub><i>T</i><sub><i>i</i></sub></sub>`、`2<i>N</i>`
- **演算子・比較記号・省略記号**
  - HTML 文字実体参照を使用する（`&times;`, `&minus;`, `&ge;`, `&le;`, `&ne;`, `&hellip;`, `&lt;`, `&gt;`）。
- **分数・上付きバー・下括弧・独立したブロック数式**
  - HTML 標準のネイティブ MathML（`<math>` / `<math display="block">`）を使用する。
  - 例：分数 `<mfrac>`、平均レート等の上付きバー `<mover><mi>S</mi><mo>&macr;</mo></mover>`、下括弧 `<munder>` + `<mo>&#x23DF;</mo>`。
- **HTML 属性値内（`data-explanation="..."` 等）の数式**
  - クイズ等の解説で `innerHTML` により描画される属性値内では、属性のダブルクォートと衝突しない `<i>`・`<sub>`・`<sup>`・HTML 文字実体参照（および属性なしの `<math>` 要素）を使用する。
