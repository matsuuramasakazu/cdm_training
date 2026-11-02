# FINOS Common Domain Model (CDM) Resources

## Knowledge

### 1. 一次ソース（Authoritative Primary Sources — 最高信頼度）
- [Rune DSL モデル定義群 (`common-domain-model/rosetta-source/src/main/rosetta/*.rosetta`)](./common-domain-model/rosetta-source/src/main/rosetta/)
  CDMの唯一絶対の一次ソース（Single Source of Truth）。すべての型（`type`）、選択型（`choice`）、列挙型（`enum`）、制約条件（`condition`）、商品判定ロジック（`func Qualify_*`）が定義されている。解説・設計・マッピング時は必ずここの定義と行番号を根拠とする。
  - **イベント・ワークフロー層**:
    - [`event-workflow-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/event-workflow-type.rosetta): `WorkflowStep`, `EventInstruction`, `WorkflowState` 等のトップレベル構造。
    - [`event-common-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/event-common-type.rosetta): `BusinessEvent`, `Instruction`, `PrimitiveInstruction`, `TradeState`, `Trade`, `State`, `Reset`, `TransferState` 等の取引・ライフサイクル中核モデル。
  - **プロダクト・テンプレート＆為替ペイアウト層**:
    - [`product-template-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/product-template-type.rosetta): `TradableProduct`, `TradeLot`, `NonTransferableProduct`, `EconomicTerms`, `Payout`, `SettlementPayout`, `OptionPayout`, `OptionStrike`, `OptionFeature`, `AveragingFeature`, `AveragingStrikeFeature`, `Barrier`, `CalculationSchedule` 等の定義。
    - [`product-common-settlement-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/product-common-settlement-type.rosetta): `PayoutBase`, `ResolvablePriceQuantity`, `SettlementTerms`, `PhysicalSettlementTerms`, `CashSettlementTerms`（NDF/NDOの差金決済条件）等の定義。
    - [`product-qualification-func.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/product-qualification-func.rosetta): `Qualify_ForeignExchange_Spot_Forward`, `Qualify_ForeignExchange_Swap`, `Qualify_ForeignExchange_NDF`, `Qualify_ForeignExchange_NDS`, `Qualify_ForeignExchange_VanillaOption`, `Qualify_ForeignExchange_NDO` 等、CDMがどのデータ構造をどのFX商品とみなすかの厳密な判定式。
  - **観測・トリガー・基礎データ層（Observable & Base）**:
    - [`observable-asset-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/observable-asset-type.rosetta): `PriceQuantity`, `PriceSchedule`, `FxSpotRateSource`, `InformationSource`, `Observable` 等の為替レート・価格定義。
    - [`observable-event-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/observable-event-type.rosetta): バリアオプションやギャップオプションのトリガー条件を表す `TriggerEvent`, `Trigger`, `FeaturePayment`, `Observation` の定義。
    - [`base-staticdata-party-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/base-staticdata-party-type.rosetta) / [`base-math-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/base-math-type.rosetta): `Party`, `Counterparty`, `BuyerSeller`, `PayerReceiver`, `QuantitySchedule`, `UnitType` 等の共通基盤型。
  - **FpML → CDM 為替マッピング関数（実務マッピングのお手本）**:
    - [`ingest-fpml-confirmation-product-fxsingleleg-func.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/ingest-fpml-confirmation-product-fxsingleleg-func.rosetta): FpMLのFX Spot / Forward / NDFから `SettlementPayout` への変換ロジック。
    - [`ingest-fpml-confirmation-product-fxswap-func.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/ingest-fpml-confirmation-product-fxswap-func.rosetta): FpMLのFX Swapから2つの `SettlementPayout` への変換ロジック。
    - [`ingest-fpml-confirmation-product-fxoption-func.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/ingest-fpml-confirmation-product-fxoption-func.rosetta) / [`ingest-fpml-confirmation-product-fxdigitaloption-func.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/ingest-fpml-confirmation-product-fxdigitaloption-func.rosetta): FpMLのFX Option / Digital Optionから `OptionPayout` への変換ロジック。
  - **担保・法的契約層（Collateral & Legal Documentation）**:
    - [`legaldocumentation-common-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/legaldocumentation-common-type.rosetta) / [`legaldocumentation-csa-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/legaldocumentation-csa-type.rosetta): `LegalAgreement`, ISDA Master Agreement, Credit Support Annex (CSA) の条件定義。
    - [`product-collateral-type.rosetta`](./common-domain-model/rosetta-source/src/main/rosetta/product-collateral-type.rosetta): `Collateral`, `EligibleCollateralCriteria`, `EligibleCollateralSpecification` 等の担保定義。

- [検証済み実データ・テスト期待値JSON (`common-domain-model/rosetta-source/src/main/resources/`)](./common-domain-model/rosetta-source/src/main/resources/)
  ビルド・テストで検証されている正規の入出力データ。実際のJSON上で `@key:scoped` や `@ref:scoped` がどう結ばれるかを確認する一次ソース。
  - [`functions/business-event/execution/execution-fx-forward-func-output.json`](./common-domain-model/rosetta-source/src/main/resources/functions/business-event/execution/execution-fx-forward-func-output.json): FX Forward 新規約定時の完全な `BusinessEvent` および `after` (`TradeState`) JSON。
  - [`ingest/output/fpml-confirmation-to-trade-state/fpml-5-13-products-fx-derivatives/`](./common-domain-model/rosetta-source/src/main/resources/ingest/output/fpml-confirmation-to-trade-state/fpml-5-13-products-fx-derivatives/): FX Spot (`fx-ex01`), FX Forward (`fx-ex03`), NDF (`fx-ex07`, `fx-ex28`), FX Swap (`fx-ex08`), European/American FX Option (`fx-ex09`, `fx-ex10`), NDO (`fx-ex11`), Average Rate Option (`fx-ex20`〜`22`) の検証済み `TradeState` JSON群。

### 2. 二次資料（Secondary Sources — 要裏付け・単独使用禁止）
- [CDM ドキュメント (`common-domain-model/docs/*.md`)](./common-domain-model/rosetta-source/../../docs/)
  概念図や設計背景の参考になるが、**旧バージョンの型名・属性リスト・記述漏れが混在している**ため、必ず上記 `.rosetta` 一次ソースで突合してから利用すること（例：`docs/event-model.md` では `TradeState` の属性が4つしか記載されていないが、現行 `.rosetta` では6属性存在する。また `docs/product-model.md` の Product Scope には FX Spot/Forward/Swap/NDF の記載が漏れている）。

## Gaps
- **複合為替オプション（シンセティック・マルチフォワード、ギャップオプション）の公式サンプルJSON**:
  `rosetta-source/src/main/resources/` にはバニラFXオプション・NDO・アベレージレートオプションのサンプルはあるが、シンセティック・マルチフォワード（Call＋Put × 複数期日）やギャップオプション、アベレージストライクオプションの完成JSONサンプルは含まれていない。そのため、Phase 3では `product-template-type.rosetta` と `observable-event-type.rosetta` の一次ソース制約（`condition`）から正規のスキーマ構造を導出・設計する。

## Wisdom (Communities)
- **ユーザー方針**: 日々のトレーニングはローカルの `rosetta-source` 読解を中心に本ワークスペース内で完結させる（外部コミュニティへの参加提案は行わない）。
- **参考リンク（必要時のみ参照）**:
  - [FINOS Common Domain Model GitHub Repository](https://github.com/finos/common-domain-model): Issue / PR / Working Group の議論履歴。
  - [FINOS CDM Working Groups (`common-domain-model/docs/working-groups.md`)](./common-domain-model/docs/working-groups.md): Derivatives WG / Collateral WG 等の活動概要。
