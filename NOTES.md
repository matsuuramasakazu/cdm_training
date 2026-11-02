# Teaching Notes & User Preferences

## 1. 学習者の現在地とアプローチ設定
- **前提知識**: 金融ドメイン（為替デリバティブ、ISDA/CSA、取引ライフサイクル）および CDM（`.rosetta` / Rune DSL）の両方を基礎から順を追って学ぶ。専門用語が初出する際は、必ず「金融実務での意味（日英）」と「CDM `.rosetta` 上での表現」をセットで噛み砕いて解説する。
- **進行順序（トップダウンアプローチ）**:
  最初に取引執行〜ライフサイクル全体の鳥瞰図（`WorkflowStep` → `BusinessEvent` → `Instruction` → `TradeState` → `Trade` → `Product`）を押さえてから、内側の `TradableProduct` / `PriceQuantity`、為替系 `Payout` 各論、ライフサイクルイベント詳細、担保・法的契約へと降りていく。

## 2. 厳守すべき一次ソース検証ルール
- `common-domain-model/rosetta-source`（特に `src/main/rosetta/*.rosetta` と `src/main/resources/`）を絶対的な一次ソースとする。
- すべての解説・図解・演習には根拠となる `.rosetta` ファイル名・型名・行番号を明記する。
- `common-domain-model/docs/` 等の二次資料を参照する際は必ず `.rosetta` で裏付けを取り、もし `docs/` 側に古い記述や不整合があれば **「※ドキュメントとの差分・注意点」** として明示する。

## 3. カリキュラム全体マップ（全5フェーズ）
- **Phase 1: 全体鳥瞰と `.rosetta` 読解の基礎（コア構造：Event & TradeState）**
  - Lesson 0001: 為替取引で掴むCDMの全体鳥瞰図（`WorkflowStep` → `BusinessEvent` → `TradeState` → `Trade` → `Product`）と `.rosetta` 最小文法
- **Phase 2: 為替取引で紐解く `Trade` と `PriceQuantity` の仕組み（Base & Observable）**
  - Lesson 0002: `Trade` / `TradableProduct` / `TradeLot` の構造と、当事者（`Party` ↔ `Counterparty`）の抽象化メカニズム
  - Lesson 0003: 為替の2通貨数量とレートを結ぶ `PriceQuantity`・`Observable`・メタデータ参照（`@key:scoped` / `@ref:scoped`）
- **Phase 3: 為替系（FX）デリバティブ各論（Payout パターンの完全理解）**
  - Lesson 0004: FX Spot / FX Forward / FX Swap（`SettlementPayout` × 1または2、物理受渡決済、Near/Farレッグ）
  - Lesson 0005: NDF / NDS（`SettlementPayout` + `cashSettlementTerms`、参照通貨のFixing観測と決済通貨での差金決済）
  - Lesson 0006: 為替オプション① 基本構造（FX Vanilla Option / NDO：`OptionPayout`, `BuyerSeller`, `OptionTypeEnum`, `ExerciseTerms`, `OptionStrike`）
  - Lesson 0007: 為替オプション② アジアン・バリア・ギャップ（アベレージレート `AveragingFeature` vs アベレージストライク `AveragingStrikeFeature` の排他制約、バリア `Barrier` / `TriggerEvent`、ギャップオプションのトリガー $K_2$ vs ストライク $K_1$ 表現）
  - Lesson 0008: シンセティック・マルチフォワードの複合マッピング設計（Call＋Putの合成フォワード × 複数期日 `CalculationSchedule` / 複数 `OptionPayout` の設計とQualification関数の挙動）
- **Phase 4: 為替取引のライフサイクルイベント詳細（Instruction & PrimitiveInstruction）**
  - Lesson 0009: プリミティブ命令（`Execution`, `Exercise`, `QuantityChange`, `PartyChange`, `Reset`, `Transfer`）による為替ライフサイクル状態遷移
- **Phase 5: 担保管理・法的契約（LegalAgreement & Collateral）**
  - Lesson 0010: ISDA Master Agreement / CSA（`LegalAgreement`）と適格担保（`EligibleCollateralCriteria`）・担保プロセス（`Collateral`）

## 4. インタラクティブ教材の設計規約
- `./assets/style.css` と `./assets/cdm-learning.js` を全レッスン・リファレンスで共有する。
- 各レッスンには以下を組み込む：
  1. トップダウン型階層＆ `.rosetta` 一次ソース対比ビューア
  2. 実務データ項目 ↔ `.rosetta` パスのインタラクティブ・マッピング演習（即時フィードバック付き）
  3. 選択肢の語数・文字数を厳密に揃え、正解位置を分散させた4択クイズ（Retrieval Practice）
