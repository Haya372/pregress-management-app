# progress-management-app
研究の進捗を管理するためのデスクトップアプリ  
[データベース設計](./UML.dio)
## 使用予定技術
| 要素 | フレームワーク |
| --- | --- |
| フロントエンド | Vue.js, vuetify ([vuetify](https://vuetifyjs.com/ja/)) |
| データベース | ~~sqlite3~~ ~~mysql~~ |
| その他 | electron |
※ sqlite3はビルド時のエラーが消えないのでとりあえずmysqlを使って実装する
## つまづき
- electronのインストールでエラーが出た -> `node node_modules/electron/install.js`を実行することで解決  
- electronでNodeモジュールを使用するときは`./node_modules/.bin/electron-rebuild  -f -w {モジュール名}`でリビルドが必要らしい  
- npm install sqlite3 --build-from-source --sqlite_libname=sqlcipher --sqlite=`brew --prefix` --runtime=electron --target=12.0.2 --dist-url=https://atom.io/download/electron  
でビルド済みsqlite3をインストールする必要がある  
`--target`にはelectronのversionを指定する。  
nodeのバージョンはv12.xにしておく
- vue-materialのインストール  
`npm install --save-dev style-loader css-loader sass-loader url-loader file-loader vue-style-loader` でパッケージの依存関係でエラーが出た -> ~~`--save --legacy-peer-deps` オプションをつけることで解決  
※依存関係のエラーを無視してインストールしているだけなので実行してみて不具合があれば別で解決する必要がある~~  
webpackのバージョンの問題だった。最新のsass-loaderはwebpack4は非推奨 -> `npm install --save-dev sass-loader@10`でsass-loader@10系をインストールして解決
- ブラウザではNode依存モジュールが使えないので`net`モジュールを使っている`mysql`ライブラリが使えない -> アプリケーションサーバーを立ててaxiosでAPIと通信する or 他のデータ保存方法を考える 必要がある


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
