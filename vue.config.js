// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
    ]
  },
  devServer: {
    disableHostCheck: true
  }
}

/** 
 * 
 * 
      {electronBuilder: {
        builderOptions: {
          "appId": "de.trekmann.loganalyser",
          "icon": "./src/assets/logo.png"
        }
      }}
 * 
 * "files": [
            "dist_electron/bundled/background.js"
          ],
*/