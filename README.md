# FINOS Common Domain Model (CDM) — 為替系（FX）取引・担保データ学習ワークスペース

金融取引・契約データ（為替系デリバティブおよび ISDA/CSA・担保管理）を、[FINOS Common Domain Model (CDM)](https://github.com/finos/common-domain-model) の一次ソース（`rosetta-source` の Rune DSL `.rosetta` 定義および検証済み JSON データ）に基づいて読み解き、データマッピング・設計・レビューを学ぶための個人学習用リポジトリです。

---

## 1. ワークスペースの目的と学習範囲

本ワークスペースでは、以下のトピックをトップダウン順序で整理しています。

- **イベント・ワークフローと取引状態の全体構造**
  - `WorkflowStep` → `BusinessEvent` → `Instruction` → `TradeState` → `Trade` → `TradableProduct` → `Product` の階層構造と Rune DSL（`.rosetta`）構文の読解
- **取引当事者の抽象化と価格・数量・スコープ参照**
  - `Party` / `Counterparty`（`Party1`・`Party2`）による当事者抽象化、`PriceQuantity`・`Observable`・`ExchangeRate` による2通貨数量と為替レートの表現、`@key:scoped` / `@ref:scoped` による参照構造
- **為替系（FX）デリバティブ各論**
  - **FX Spot / FX Forward / FX Swap**: `SettlementPayout` と `SettlementTerms`、Near / Far Leg の2ペイアウト構成
  - **NDF / NDS（非受渡先渡・スワップ）**: `SettlementPayout` + `CashSettlementTerms`、`FxFixingDate`・`SettlementRateOption` による Fixing 観測と差金決済
  - **為替オプション（Vanilla Option / NDO）**: `OptionPayout`、`BuyerSeller` と `PayerReceiver` の関係、`ExerciseTerms`、`OptionStrike`
  - **エキゾチック・複合為替オプション**: アジアン（`AveragingFeature` / `AveragingStrikeFeature`）、バリア（`Barrier` / `TriggerEvent`）、ギャップオプション、シンセティック・マルチフォワード（複数 `OptionPayout`・`CalculationSchedule`・`packageReference`）
- **ライフサイクルイベント（予定）**
  - `PrimitiveInstruction`（約定、一部/全解約、Novation、物理受渡決済、Fixing Reset、オプション権利行使など）
- **法的契約・担保管理（予定）**
  - ISDA Master Agreement / Credit Support Annex (CSA)、`LegalAgreement`、`EligibleCollateralCriteria`、`Collateral`

---

## 2. ディレクトリ・ファイル構成

```text
.
├── lessons/                  # インタラクティブHTMLレッスン教材（解説・構造ツリー・マッピング演習・4択クイズ）
│   ├── index.html            # カリキュラム一覧（コースインデックス）
│   ├── 0001-cdm-top-down-overview.html
│   ├── 0002-trade-tradableproduct-party.html
│   ├── 0003-pricequantity-fx-rate-and-scoped-references.html
│   ├── 0004-fx-spot-forward-swap-settlementpayout.html
│   ├── 0005-ndf-nds-cashsettlementterms-fixing.html
│   ├── 0006-fx-vanilla-option-ndo-optionpayout.html
│   ├── 0007-fx-asian-barrier-gap-options.html
│   └── 0008-synthetic-multi-forward-mapping.html
├── reference/                # 常時参照用リファレンスHTML
│   ├── rosetta-reading-guide.html  # Rune DSL (.rosetta) 読解チートシート
│   └── glossary.html               # 為替デリバティブ・CDM 対照用語集（検索フィルタ付き）
├── assets/                   # HTML教材用の共通スタイルシート（style.css）とスクリプト（cdm-learning.js）
├── learning-records/         # 学習過程の質疑応答や一次ソース検証の記録（Markdown）
├── MISSION.md                # 学習目標と対象スコープの定義
├── RESOURCES.md              # 参照するCDM一次ソース（.rosetta / 検証済みJSON）の索引
└── NOTES.md                  # カリキュラム進捗・学習ノート
```

### 教材の閲覧方法

`lessons/` および `reference/` 配下の HTML ファイルは外部ライブラリに依存しない単体構成のため、ブラウザで [`lessons/index.html`](./lessons/index.html) を直接開くことで閲覧・演習が可能です。

---

## 3. カリキュラム一覧

| フェーズ | レッスン / 資料 | 内容 | 状態 |
| :--- | :--- | :--- | :---: |
| **Reference** | [`reference/rosetta-reading-guide.html`](./reference/rosetta-reading-guide.html) | Rune DSL（`.rosetta`）読解チートシート | 公開中 |
| **Reference** | [`reference/glossary.html`](./reference/glossary.html) | 為替デリバティブ・CDM 対照用語集（Glossary） | 公開中 |
| **Phase 1** | [`lessons/0001-cdm-top-down-overview.html`](./lessons/0001-cdm-top-down-overview.html) | 為替取引で掴むCDMの全体鳥瞰図と `.rosetta` 読解の基礎 | 公開中 |
| **Phase 2** | [`lessons/0002-trade-tradableproduct-party.html`](./lessons/0002-trade-tradableproduct-party.html) | `Trade` / `TradableProduct` / `TradeLot` と当事者抽象化メカニズム | 公開中 |
| **Phase 2** | [`lessons/0003-pricequantity-fx-rate-and-scoped-references.html`](./lessons/0003-pricequantity-fx-rate-and-scoped-references.html) | 為替の2通貨数量とレートを結ぶ `PriceQuantity`・`Observable`・スコープ参照 | 公開中 |
| **Phase 3** | [`lessons/0004-fx-spot-forward-swap-settlementpayout.html`](./lessons/0004-fx-spot-forward-swap-settlementpayout.html) | FX Spot / FX Forward / FX Swap（`SettlementPayout` × 1または2） | 公開中 |
| **Phase 3** | [`lessons/0005-ndf-nds-cashsettlementterms-fixing.html`](./lessons/0005-ndf-nds-cashsettlementterms-fixing.html) | NDF / NDS（`SettlementPayout` + `cashSettlementTerms`） | 公開中 |
| **Phase 3** | [`lessons/0006-fx-vanilla-option-ndo-optionpayout.html`](./lessons/0006-fx-vanilla-option-ndo-optionpayout.html) | 為替オプション① 基本構造（FX Vanilla Option / NDO） | 公開中 |
| **Phase 3** | [`lessons/0007-fx-asian-barrier-gap-options.html`](./lessons/0007-fx-asian-barrier-gap-options.html) | 為替オプション② アジアン・バリア・ギャップ | 公開中 |
| **Phase 3** | [`lessons/0008-synthetic-multi-forward-mapping.html`](./lessons/0008-synthetic-multi-forward-mapping.html) | シンセティック・マルチフォワードの複合マッピング設計 | 公開中 |
| **Phase 4** | Lesson 0009 〜 0013 | 為替取引のライフサイクルイベント詳細（約定・解約・Novation・受渡・Fixing Reset・オプション行使） | 予定 |
| **Phase 5** | Lesson 0014 | ISDA Master Agreement / CSA・適格担保・担保プロセス | 予定 |

---

## 4. 免責事項 / Disclaimer

本リポジトリおよび公開されているすべてのドキュメント・HTML教材・コード例は、個人の学習・研究目的でAIエージェント（Google Gemini）を用いて生成・作成された私的な資料であり、「現状有姿（AS IS）」で提供されます。

1. **無保証（No Warranty）**: 記載内容にはAI生成に伴う誤りや解釈違い、古い仕様が含まれる可能性があります。作成者は記載内容の正確性、完全性、最新性、妥当性、特定の目的への適合性について、明示または黙示を問わずいかなる保証も行いません。実務等で FINOS Common Domain Model (CDM) を利用される際は、必ず公式リポジトリ（[finos/common-domain-model](https://github.com/finos/common-domain-model)）の一次ソースおよび公式仕様をご確認ください。
2. **専門的助言の否定（Not Professional Advice）**: 本リポジトリの内容は、金融取引、投資、法務、会計、税務、システム設計その他の専門的な助言を提供するものではなく、また特定の企業・団体の公式見解を表すものでもありません。
3. **責任の制限（Limitation of Liability）**: 本リポジトリの情報を参照・利用したこと、または利用できなかったことによって直接的または間接的に生じたいかなるトラブル・損失・損害等についても、作成者は一切の責任を負いません。

---

*The contents of this repository (including all HTML documents, markdown files, and code examples) are personal study materials generated using an AI agent (Google Gemini) and are provided "AS IS", without warranty of any kind, express or implied. The author makes no guarantees regarding the accuracy, completeness, or reliability of the information. Nothing in this repository constitutes financial, legal, investment, or other professional advice. In no event shall the author be liable for any claim, damages, or other liability arising from or in connection with the use of this repository.*
