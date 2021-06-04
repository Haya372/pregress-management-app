module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      externals: ['sqlite3'],
      nodeIntegration: true
    },
  }
}
