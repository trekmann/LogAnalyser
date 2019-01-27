// vue.config.js
module.exports = {
   pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "de.trekmann.loganalyser",
        productName: "Log Analyser",
        icon: "./src/assets/icon_512x512.png",
        copyright: `Copyright © 2019 Marcell Kalsen-Friese`
      }
    }
  }
};
