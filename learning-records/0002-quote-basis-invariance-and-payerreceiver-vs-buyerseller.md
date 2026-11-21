# 為替のクオート基準における `quantity` / `derivedQuantity` 配置の不変性と、`PayerReceiver` vs `BuyerSeller` の厳密な区分

学習者は Lesson 0005（NDF / NDS）の §3-1 を精読し、①クオート基準（`perUnitOf` / `unit`）がいずれであっても「基準通貨（`perUnitOf`）が `priceQuantity -> quantity`（および `underlier`）に配置され、対価通貨（`unit`）が `price -> derivedQuantity` に配置される」というCDMの配置規則自体は一切入れ替わらないこと（NDFにおいてクオート基準の違いで見え方が変わるのは、「決済通貨」と「参照通貨」のどちらが基準通貨 `perUnitOf` として選ばれるかという当てはまり方のみであること）、および② `SettlementPayout -> payerReceiver` の方向説明に「売り／買い」を用いると CDM 上に別途存在する `BuyerSeller`（`OptionPayout -> buyerSeller` 等、金融商品・権利自体の買手／売手）と混同するため、`PayerReceiver` は一貫して「支払い（`payer`）／受け取り（`receiver`）」で表現すべきであることを正確に指摘・論証した。

## Evidence
- 学習者が Lesson 0003〜0004 で学んだ `PriceQuantity`（`perUnitOf` ＝ 基準通貨 ＝ `quantity`、`unit` ＝ 対価通貨 ＝ `derivedQuantity`）および `PayoutBase -> payerReceiver` の定義を正確に記憶・適用し、Lesson 0005 の解説文における論理の飛躍（「何を基準に何が入れ替わるのか」の主語欠落）と用語の不統一（「支払・受取」と「売り・買い」の混在および `buyerSeller` との関係）を自ら見抜いて質問した。

## Implications
- 今後のすべてのレッスン（特に次回の Lesson 0006〜0008 の為替オプション・シンセティック・マルチフォワード）において、以下の用語と概念区分を厳格に維持する：
  1. **`PriceQuantity` の配置原則**: 常に「分母（基準通貨 `perUnitOf`）＝ `quantity`（および `underlier`）、分子（対価通貨 `unit`）＝ `derivedQuantity`」の不変原則を軸として説明する。
  2. **`PayerReceiver` vs `BuyerSeller` の使い分け**:
     - `PayoutBase -> payerReceiver`（`PayerReceiver` 型）は常に「キャッシュフローまたは原資産（`underlier`）の**支払い（`payer`）・受け取り（`receiver`）**」としてのみ記述し、「売り・買い」と言い換えない。
     - `OptionPayout -> buyerSeller`（`BuyerSeller` 型）は「オプション（権利・金融商品そのもの）の**買手（`buyer`）・売手（`seller`）**」として記述し、Lesson 0006 では `OptionPayout` が `buyerSeller`（権利の売買方向）と `payerReceiver`（権利行使時の原資産受渡・支払方向）の両方を同時に持つ構造を一次ソース（`product-template-type.rosetta:L126-L136`, `ingest-fpml-confirmation-product-fxoption-func.rosetta:L92-L107`, `event-common-func.rosetta:L520-L527`）に基づいて明確に対比する。
