const cssNano = require('cssnano')
const cssNext = require('postcss-cssnext')

module.exports = {
  plugins: [
    cssNext(),
    cssNano({ zIndex: false, mergeRules: false })
  ]
}
