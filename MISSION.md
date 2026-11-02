# Mission: FINOS Common Domain Model (CDM) — 為替系（FX）取引・担保データのマッピングと設計

## Why
金融取引・契約の実務データ（為替系デリバティブおよび担保・法的契約）を、FINOS Common Domain Model (CDM) の一次ソース（`rosetta-source`）の型・属性・制約（`condition`）に基づいて正確に読み解き、データマッピング・設計・レビューを独力で遂行できるようにする。

## Success looks like
- 取引執行からライフサイクルイベント（`WorkflowStep` → `BusinessEvent` → `Instruction` → `TradeState` → `Trade` → `TradableProduct` → `Product`）のトップダウン構造を `.rosetta` 一次ソースに基づいて追跡・説明できる。
- 為替スポット・フォワード・FXスワップ（`SettlementPayout`）、および NDF・NDS（`SettlementPayout` + `cashSettlementTerms`）の2通貨数量・為替レート・決済条件のCDMマッピングを設計・検証できる。
- 為替オプション（バニラ、NDO、アベレージレート、アベレージストライク、バリア、ギャップオプション）の `OptionPayout`・`OptionStrike`・`OptionFeature`・`TriggerEvent` 構造と排他制約（`condition`）を読み解き、実務データと対応づけられる。
- シンセティック・マルチフォワード（Call＋Putの合成フォワード × 複数期日スケジュール）のような複合為替デリバティブを、`EconomicTerms -> payout (1..*)` や `CalculationSchedule` を用いて `.rosetta` の型制約に適合する形で設計・表現できる。
- 担保管理・法的契約（ISDA Master Agreement / CSA / `LegalAgreement` / `EligibleCollateralCriteria` / `Collateral`）の構造を理解し、FX取引の契約・担保データとのマッピングをレビューできる。

## Constraints
- **絶対的な一次ソース**: `common-domain-model/rosetta-source`（`src/main/rosetta/*.rosetta` および `src/main/resources/` 内の検証済みデータ）を唯一の正解根拠とする。
- **二次資料の裏付け義務**: `common-domain-model/docs/` 等のフォルダは古い仕様や不正確な記述が混在しているため、参照時は必ず `rosetta-source` で裏付けを取り、乖離がある場合は明示する。
- **基礎からの段階的習得**: 金融ドメイン用語（為替デリバティブ・ISDA/CSA・ライフサイクル）と `.rosetta`（Rune DSL）の記法の両方を基礎からトップダウン順で学ぶ。

## Out of scope
- 為替系（FX）以外の商品カテゴリ（単一通貨の金利スワップ・FRA等の金利デリバティブ、通貨スワップ、クレジット、エクイティ、コモディティ、レポ・証券貸借取引）
- FXボラティリティ／バリアンス・スワップ等の `PerformancePayout` 系エキゾチック商品
- `.rosetta` による新規関数（`func`）の本格コーディングや、Java / Python アプリケーションのシステム実装そのもの（定義と制約の読解に必要な範囲のみ扱う）
