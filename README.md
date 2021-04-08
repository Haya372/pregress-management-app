# progress-management-app
研究の進捗を管理するためのデスクトップアプリ  
[データベース設計](./UML.dio)
## 使用予定技術
| 要素 | フレームワーク |
| --- | --- |
| フロントエンド | Vue.js, Materialize CSS ([vue-material](https://vuematerial.io/components/app/)) |
| データベース | sqlite3 |
| その他 | electron |
## つまづき
- electronのインストールでエラーが出た -> `node node_modules/electron/install.js`を実行することで解決  
- electronでNodeモジュールを使用するときは`./node_modules/.bin/electron-rebuild  -f -w {モジュール名}`でリビルドが必要らしい
- vue-materialのインストール  
`npm install --save-dev style-loader css-loader sass-loader url-loader file-loader vue-style-loader` でパッケージの依存関係でエラーが出た -> `--save --legacy-peer-deps` オプションをつけることで解決  
※依存関係のエラーを無視してインストールしているだけなので実行してみて不具合があれば別で解決する必要がある

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
browser  
```
npm run serve
```
electron  
```
npm run electron:serve
```
### Compiles and minifies for production
browser  
```
npm run build
```
electron  
```
npm run electron:build
```
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
