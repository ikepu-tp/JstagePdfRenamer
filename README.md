# JstagePDFRenamer

J-STAGEでPDFを「著者名（刊行年）タイトル」という名前でダウンロードします。

Google Chrome ブラウザ用の拡張機能です。

> [!IMPORTANT]
> 現在，ウェブストアで公開できるように審査を申請しています。
> 申請が通るまでは以下の方法でご利用いただけます。

## 使用方法[ブックマークレット]

### 0. ブックマーク管理画面

[chrome://bookmarks/](chrome://bookmarks/)を開いてください。

### 1. ブックマークの作成

`名前`は任意の値を入力してください。

`URL`には`javascript:`を入力し，その後に`script.js`の内容をそのまま張り付けてください。

### 2. PDFのダウンロード

J-STAGEの任意のページ（e.g., [https://www.jstage.jst.go.jp/article/pamjaep/65/0/65_178/_article/-char/ja](https://www.jstage.jst.go.jp/article/pamjaep/65/0/65_178/_article/-char/ja)）を開き，1.で作成したブックマークをクリックしてください。

## 使用方法[拡張機能]

`Google Chrome`での利用を想定しています。

> [!NOTE]
> `Microsoft Edge`でも利用できました。（以下の説明は`Google Chrome`における説明であり，`Microsoft Edge`の場合は適宜読み替えてください。）

### 0. スクリプトのダウンロード

[https://github.com/ikepu-tp/JstagePdfRenamer](https://github.com/ikepu-tp/JstagePdfRenamer)を開き，右上の「Code > Download ZIP」からスクリプトをダウンロードし，解凍してください。

### 1. 拡張機能管理画面

[chrome://extensions/](chrome://extensions/)を開いてください。

### 2. デベロッパーモードの有効

右上の「デベロッパーモード」を有効にしてください。

![デベロッパーモードの有効](img/2_able_developer_mode.png)

### 3. パッケージ読み込み

デベロッパーモードを有効にしたら，左上に「パッケージ化されていない拡張機能を読み込む」を開いてください。

![パッケージ読み込み](img/3_read_package.png)

### 4. フォルダの選択

0.でダウンロードしたスクリプトのフォルダを選択してください。

### 5. PDFのダウンロード

J-STAGEの任意のページ（e.g., [https://www.jstage.jst.go.jp/article/pamjaep/65/0/65_178/_article/-char/ja](https://www.jstage.jst.go.jp/article/pamjaep/65/0/65_178/_article/-char/ja)）を開き，「JstagePDFRenamer」をクリックしてください。
「著者名（刊行年）タイトル」でダウンロードが実行されます。

![拡張機能のクリック](img/5_download_pdf.png)

### アップデート

### 0. スクリプトのダウンロード

[https://github.com/ikepu-tp/JstagePdfRenamer](https://github.com/ikepu-tp/JstagePdfRenamer)を開き，右上の「Code > Download ZIP」から最新のスクリプトをダウンロードし，解凍してください。

### 1. 拡張機能管理画面

[chrome://extensions/](chrome://extensions/)を開いてください。

### 2. 再読み込み

拡張機能カードの一覧から`JstagePDFRenamer`を探し，右下の更新ボタンをクリックしてください。

![拡張期のカード](img/update_2_card.png)
