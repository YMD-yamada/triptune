# triptune
気分で旅先を診断するアプリ

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
