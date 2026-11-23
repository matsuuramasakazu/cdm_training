# アジアン・オプションの2系統の排他設計（`AveragingFeature` vs `AveragingStrikeFeature`）と、デジタル（バイナリー）オプションにおける現行CDMの未解決ギャップの検証

学習者は Lesson 0007（為替オプション② アジアン・バリア・ギャップ）を精読し、① `OptionFeature -> averagingFeature` と `OptionStrike -> averagingStrikeFeature` の2つが存在する理由と使い分け、`AveragingInOutEnum` における `In`（入口＝ストライク平均化）／`Out`（出口＝決済価格平均化）の語源、および `Both`（ダブル・アジアン）と排他制約の関係、ならびに ② デジタル（バイナリー）オプションにおける `FeaturePayment -> amount` の階層パス、`strike is absent` による表現の妥当性、および FINOS CDM GitHub Issue #4957 で議論されている現行モデルの未解決課題について質問・検証した。

## Evidence
- 学習者が `.rosetta` 一次ソース（`product-template-type.rosetta`, `product-template-enum.rosetta`, `observable-event-type.rosetta`）と FINOS CDM の GitHub Issue（#4957）を自ら突き合わせ、レッスン内で比較対象として簡略化されていたデジタル（バイナリー）オプションの表現が CDM 上で確定仕様なのか未解決課題を抱えているのかを批判的に検証した。

## Implications
- 今後のレッスン作成・改訂において以下の原則を徹底する：
  1. **CDM 上で仕様が未完成・議論途上の商品（`incomplete-products-*` や Open Issue の対象）を、確定仕様であるかのように断定して比較表等に載せない**：
     - デジタル（バイナリー／タッチ）オプション（`fx-ex14`〜`fx-ex19`）のように、一次ソースの変換関数（`ingest-fpml-confirmation-product-fxdigitaloption-func.rosetta`）でペイアウト金額が欠落しており、かつ `OptionPayout` の `condition OptionTypePresent`（`underlier` が `Cash` のとき `optionType` 必須）等と衝突して Issue #4957 / #5014 で改修途上にある商品に言及する際は、何が実装済みで何が未解決ギャップなのかを一次ソースに基づいて明記する。
  2. **本文（CDM正規スキーマの解説）と補足枠（FpML Ingest 関数の未実装箇所・既知のギャップ）の分離**：
     - 各セクションの本文ではまず CDM の `.rosetta` 一次ソース定義に基づく正規スキーマの構造と具体例を解説し、FpML 変換関数の未マッピング箇所や GitHub Issue 上の未解決課題は補足枠（`.callout-warning`）に分離して記述する。
