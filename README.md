# triptune
気分で旅先を診断するアプリ

## 公開URLについて（GitHub のユーザー名を出したくない場合）

リポジトリの **GitHub Pages**（`https://<user>.github.io/...`）を有効にしていると、URL にアカウント名が入ります。  
**GitHub のURLを表に出したくないなら、GitHub Pages をオフ**にし、**Netlify の本番URL（または独自ドメイン）だけ**を使うのが分かりやすいです。

- GitHub Pages の設定: リポジトリ **Settings → Pages** で **None** にする（または delete）
- 本番URLの確認: [Netlify ダッシュボード](https://app.netlify.com/) → 対象サイト → **Site overview** の **Production domain**

## Netlify で公開する

このリポジトリはビルド不要の静的サイトです。

### 方法 A: Netlify UI（いちばん簡単）

1. Netlify にログイン → **Add new site** → **Import an existing project**
2. Git プロバイダでこのリポジトリを選択
3. 設定:
   - **Build command**: 空欄
   - **Publish directory**: `.`（ドット1つ）
4. **Deploy site**

`netlify.toml` で `publish = "."` とキャッシュ用ヘッダーを指定しています。

### 方法 B: GitHub Actions（任意）

`.github/workflows/netlify-deploy.yml` を使う場合、GitHub のリポジトリ Secrets に次を追加します。

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

`main` または `master` ブランチへの push で本番デプロイが走ります。
