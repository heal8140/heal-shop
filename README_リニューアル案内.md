# heal ONLINE SHOP — カテゴリー別サイト 試作版（2026-11-04）

既存ショップに、目的・ニーズ別の7カテゴリーとナビゲーションを追加した試作版です。

## 新しい構成
- `index.html` : TOP / 7カテゴリー導線 / すべての商品 / ABOUT / ご利用案内
- `category-health.html` : 健康維持・体調管理
- `category-beauty.html` : 美容・エイジングケア
- `category-environment.html` : 生活環境・健康グッズ
- `category-refresh.html` : 疲労・リフレッシュ
- `category-sleep.html` : 睡眠・リラックス
- `category-water.html` : 水・飲料
- `category-nutrition.html` : 腸内環境・栄養補給
- `product.html?id=productN` : 既存商品詳細（画像切替、カラー/サイズ、販売単位、PDFを保持）
- `site.js` : 共通ヘッダー、スマートフォンメニュー、カテゴリー表示の設定
- `shop.js` : 商品一覧と商品詳細表示
- `products.json` : 商品データ。追加した `purposeCategories` で複数カテゴリーへの掲載を制御

## カテゴリー編集例
`products.json` の商品にある `purposeCategories` を編集すると、専用ページへの表示を変更できます。
例: `"purposeCategories": ["health", "water"]`
カテゴリーの名前、掲載順、説明、画像の変更は `site.js` 冒頭の `HEAL_CATEGORIES` に集約しています。

## 注意事項
- **カテゴリーの商品割り当ては試作段階の仮設定**です。商品の効能・適応を示すものではありません。
- カテゴリー画像は今回ZIPに含まれていた商品写真を仮使用しています。正式版では画像差し替えをおすすめします。
- 商品の説明文・価格・画像・PDF・既存決済リンクは変更していません。
- `products.json` 読み込みには HTTP(S) が必要です。ローカルプレビューは `python -m http.server 8000` などで起動し `http://localhost:8000/` へアクセスしてください。GitHub Pages ではそのまま動作します。
- 本ZIPの中身を既存リポジトリに反映するときは、ZIP内の **heal-shop-main フォルダーの中のファイル** をリポジトリのルートにアップしてください。
