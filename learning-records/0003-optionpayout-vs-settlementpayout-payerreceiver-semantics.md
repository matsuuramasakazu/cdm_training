# オプション約定時（`OptionPayout`）と権利行使後の為替決済取引（`SettlementPayout`）のそれぞれにおける `payerReceiver` が表す対象の厳密な区分

学習者は Lesson 0006（為替オプション①：FX Vanilla Option / NDO）の §1（設計ポイント①）を精読し、① `OptionPayout -> payerReceiver` を「原資産（`underlier`）の支払者・受取者」と説明すると、`optionType = Put`（買手が原資産を支払う権利を買い、売手がその権利を売る契約）においてなぜ売手が約定時に `payer` と設定されるのか論理的に破綻すること、および② 権利行使イベント（`Create_Exercise`）実行後に新規生成される為替決済取引（`SettlementPayout`）はもはやオプションではないため `buyer` / `seller` という要素は存在せず、`Party1` / `Party2` の `payerReceiver`（原資産通貨の支払者・受取者）として説明すべきであることを正確に指摘した。

## Evidence
- 学習者が「オプション権利自体の売買（`buyerSeller`）」「オプション・ペイアウトの義務・権利方向（`OptionPayout -> payerReceiver`）」「権利行使によって成立する為替決済取引の原資産受渡方向（`SettlementPayout -> payerReceiver`）」の3つの概念を混同せず、対象商品（Option vs FX Spot/Forward）ごとに存在する属性と意味を厳密に区別して検証した。

## Implications
- 今後のレッスン（特に Lesson 0007〜0009 のエキゾチック・オプション、シンセティック・マルチフォワード、および `Exercise` ライフサイクルイベント）において、以下の定義を一貫して維持する：
  1. **オプション約定時の `OptionPayout -> payerReceiver`**:
     - 原資産通貨（`underlier`）の受渡方向を表すものではなく、`PayoutBase` の必須属性として**「この `OptionPayout`（オプションのペイオフ義務・権利価値）自体の義務負担者（`payer`）と権利享受者（`receiver`）」**を表す。
     - そのため `MapFxOptionPayout`（`MapSellerAsPayerAndBuyerAsReceiver`）により、`Call` でも `Put` でも機械的に `payer` にはオプションの売手側ロール（例：`Party2`）、`receiver` には買手側ロール（例：`Party1`）がセットされる。原資産通貨をどちらが受け取る／支払う権利かは `buyerSeller` と `optionType`（`Call` / `Put`）の組み合わせで表される。
  2. **権利行使後に新規生成される為替決済取引の `SettlementPayout -> payerReceiver`**:
     - 新規生成される為替決済取引（`SettlementPayout`）はオプションではないため `buyerSeller` 属性を持たない。
     - ここでの `SettlementPayout -> payerReceiver` は**「原資産通貨（`underlier` ＝ 基準通貨）を実際に支払う当事者（`payer`：例 `Party1` または `Party2`）と受け取る当事者（`receiver`）」**を表す。
     - `Create_Exercise` は一旦 `OptionPayout -> payerReceiver`（例：`payer: Party2, receiver: Party1`）を新しい `SettlementPayout -> payerReceiver` にコピーし、元のオプションが `Call` ならそのまま（`payer: Party2, receiver: Party1`）、元のオプションが `Put` なら `Update_ProductDirection` で反転（`payer: Party1, receiver: Party2`）させる。
