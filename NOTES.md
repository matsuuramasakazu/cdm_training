# Teaching Notes & User Preferences

## 1. 学習者の現在地とアプローチ設定
- **前提知識**: 金融ドメイン（為替デリバティブ、ISDA/CSA、取引ライフサイクル）および CDM（`.rosetta` / Rune DSL）の両方を基礎から順を追って学ぶ。専門用語が初出する際は、必ず「金融実務での意味（日英）」と「CDM `.rosetta` 上での表現」をセットで噛み砕いて解説する。
- **進行順序（トップダウンアプローチ）**:
  最初に取引執行〜ライフサイクル全体の鳥瞰図（`WorkflowStep` → `BusinessEvent` → `Instruction` → `TradeState` → `Trade` → `Product`）を押さえてから、内側の `TradableProduct` / `PriceQuantity`、為替系 `Payout` 各論、ライフサイクルイベント詳細、担保・法的契約へと降りていく。

## 2. 厳守すべき一次ソース検証ルール
- `common-domain-model/rosetta-source`（特に `src/main/rosetta/*.rosetta` と `src/main/resources/`）を絶対的な一次ソースとする。
- すべての解説・図解・演習には根拠となる `.rosetta` ファイル名・型名・行番号を明記する。
- `common-domain-model/docs/` 等の二次資料を参照する際は必ず `.rosetta` で裏付けを取り、もし `docs/` 側に古い記述や不整合があれば **「※ドキュメントとの差分・注意点」** として明示する。

## 3. カリキュラム全体マップ（全5フェーズ・14レッスン）
- **Phase 1: 全体鳥瞰と `.rosetta` 読解の基礎（コア構造：Event & TradeState）**
  - Lesson 0001: 為替取引で掴むCDMの全体鳥瞰図（`WorkflowStep` → `BusinessEvent` → `TradeState` → `Trade` → `Product`）と `.rosetta` 最小文法
- **Phase 2: 為替取引で紐解く `Trade` と `PriceQuantity` の仕組み（Base & Observable）**
  - Lesson 0002: `Trade` / `TradableProduct` / `TradeLot` の構造と、当事者（`Party` ↔ `Counterparty`）の抽象化メカニズム
  - Lesson 0003: 為替の2通貨数量とレートを結ぶ `PriceQuantity`・`Observable`・メタデータ参照（`@key:scoped` / `@ref:scoped`）
- **Phase 3: 為替系（FX）デリバティブ各論（Payout パターンの理解）**
  - Lesson 0004: FX Spot / FX Forward / FX Swap（`SettlementPayout` × 1または2、物理受渡決済、Near/Farレッグ）
  - Lesson 0005: NDF / NDS（`SettlementPayout` + `cashSettlementTerms`、参照通貨のFixing観測と決済通貨での差金決済）
  - Lesson 0006: 為替オプション① 基本構造（FX Vanilla Option / NDO：`OptionPayout`, `BuyerSeller`, `OptionTypeEnum`, `ExerciseTerms`, `OptionStrike`）
  - Lesson 0007: 為替オプション② アジアン・バリア・ギャップ（アベレージレート `AveragingFeature` vs アベレージストライク `AveragingStrikeFeature` の排他制約、バリア `Barrier` / `TriggerEvent`、ギャップオプションのトリガー $K_2$ vs ストライク $K_1$ 表現）
  - Lesson 0008: シンセティック・マルチフォワードの複合マッピング設計（Call＋Putの合成フォワード × 複数期日 `CalculationSchedule` / 複数 `OptionPayout` の設計とQualification関数の挙動）
- **Phase 4: 為替取引のライフサイクルイベント詳細（Instruction & PrimitiveInstruction）**
  - Lesson 0009: ライフサイクルイベント共通基盤と横断イベント（`BusinessEvent` / `Instruction` / `PrimitiveInstruction` / `Create_TradeState` の実行順序、約定 `Execution` + `ContractFormation`、増額・一部解約・全解約 `QuantityChange`、更改・分割・清算 `Split` + `PartyChange` と `Qualify_*` 関数）
  - Lesson 0010: FX Spot / Forward / Swap のライフサイクル（2通貨の物理受渡決済 `Transfer` / `transferHistory`、期日延長 `Create_RollPrimitiveInstruction`、受取分割 `Create_ShapingInstruction`、FX Swap Near/Far レッグの決済状態管理）
  - Lesson 0011: NDF / NDS のライフサイクル（Fixing観測 `Observation` と `ResetInstruction` / `Create_Reset` による `resetHistory` 記録、約定レートと `resetValue` からの差金決済額算出および決済通貨単一の `TransferInstruction` 生成）
  - Lesson 0012: 為替オプション① Vanilla / NDO のライフサイクル（`ExerciseInstruction` と `Create_Exercise` / `Qualify_Exercise`、現物決済オプション行使時の Replacement Trade 生成と Put 行使時の方向反転 `Update_ProductDirection`、NDO差金決済行使の `QuantityChange` + `Transfer`、権利消滅 Expiry）
  - Lesson 0013: 為替オプション② アジアン・バリア・マルチフォワードのライフサイクル（アジアンの複数回観測 `observations` と `averagingMethodology` による `Reset`、バリア到達時の Knock-out / Knock-in 状態遷移、マルチフォワードの期日別一部行使 Partial Exercise）
- **Phase 5: 担保管理・法的契約（LegalAgreement & Collateral）**
  - Lesson 0014: ISDA Master Agreement / CSA（`LegalAgreement`）と適格担保（`EligibleCollateralCriteria`）・担保プロセス（`Collateral`）

## 4. インタラクティブ教材の設計規約
- `./assets/style.css` と `./assets/cdm-learning.js` を全レッスン・リファレンスで共有する。
- **Phase 3（各論）でのバランス方針**: `Product -> economicTerms -> payout`（`SettlementPayout` や `OptionPayout`）の解説だけでなく、それと対になる **`tradeLot -> priceQuantity`**（商品ごとのレート・数量表現、対顧客マージン／複合価格などの実務バリエーション、一部解約や決済などライフサイクル上の `priceQuantity` 変化）も同等の深さで詳しく解説する。
- **解説構成の順序（推奨設計ファースト）**: 各セクションの導入では、冒頭から「できない方法（不適合な表現案やアンチパターン）」を先に提示するのではなく、まず「推奨される正規のCDM表現方法」を提示して理解の軸を作り、「別案（他の属性による代用案など）とその問題点・限界」はその後ろに補足またはコラムとして配置する。
- 各レッスンには以下を組み込む：
  1. トップダウン型階層＆ `.rosetta` 一次ソース対比ビューア
  2. 実務データ項目 ↔ `.rosetta` パスのインタラクティブ・マッピング演習（即時フィードバック付き）
  3. 選択肢の語数・文字数を厳密に揃え、正解位置を分散させた4択クイズ（Retrieval Practice）
