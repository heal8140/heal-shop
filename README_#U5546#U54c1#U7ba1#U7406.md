# heal ONLINE SHOP 商品管理ガイド

## 公開手順
ZIPを解凍し、「heal-shop-ready」の**中身**（index.html / product.html / products.json / shop.js / style.css / product1～7.html / images）を GitHub `heal-shop` リポジトリの一番上にアップロードして、Commit changes を押してください。`heal-shop-ready` フォルダ自体をアップロードしないでください。

**重要:** GitHub Pages を読み込むため、ローカルでHTMLをダブルクリックすると商品データが表示されない場合があります。GitHub公開URLかローカルHTTPサーバー経由で確認してください。

## 商品追加
`products.json` の最後の商品オブジェクトの後にカンマを追加し、新しい商品オブジェクトを入れます。JSONは末尾カンマ禁止です。

例（既存の商品の1件をコピーして値を変更するのが簡単です）:
```json
{
  "id": "product8",
  "name": "新商品名",
  "category": "HEAL SELECT",
  "shortDescription": "商品一覧に出す短文",
  "listPrice": 5000,
  "price": 5000,
  "image": "images/product8/main.jpg",
  "detailImage": "images/product8/main.jpg",
  "detailImageClass": "",
  "detailCategory": "heal SELECT ITEM",
 "intro": "商品詳細の紹介文",
  "sections": [{"heading": "商品の特徴", "text": "詳しい説明"}],
  "stripeUrl": "",
  "published": true
}
```
画像は `images/product8/main.jpg` に入れてください。既存商品も同じように商品別のサブフォルダに後から分けられますが、今回の7商品は現在の画像ファイル名を変えていません。

- `listPrice` = 一覧に表示する税込価格、`price` = 詳細ページに表示する税込価格。元データに差異があるため両方維持しています。販売前に必ず確認してください。
- `stripeUrl` = Stripe決済URLを入れると購入ボタンが有効になります。空欄なら「準備中」です。
- `published`: false にすると一覧から非表示（直接詳細URLでも非表示）。
- 既存の product1.html～product7.html は元のURLの利用者向け転送ページです。
- 旧トップ階層の画像や二重に入れた heal-shop-main フォルダは、新ページを確認できた後に削除して構いません。**先に削除しないでください。**

## 移行時の注意
最初の7商品の商品説明や価格、表記は元ファイルから移しました。商品一覧と詳細で価格が異なる商品もそのままです。決済リンクは元データですべて `#` だったため未設定です。画像ファイルはすべて images/ に置いてあります。
