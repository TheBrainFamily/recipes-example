const watchApp = require('cypress-app-watcher-preprocessor')
module.exports = (on) => {
  on('file:preprocessor', watchApp())
}
