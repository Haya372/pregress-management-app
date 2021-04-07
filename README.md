# progress-management-app
研究の進捗を管理するためのデスクトップアプリ  
Vue + electron + sqlite3で実装する。
## つまづき
- electronのインストールでエラーが出た -> `node node_modules/electron/install.js`を実行することで解決  
- electronでNodeモジュールを使用するときは`./node_modules/.bin/electron-rebuild  -f -w {モジュール名}`でリビルドが必要らしい

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
