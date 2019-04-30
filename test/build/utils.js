
function rollupMerge () {
  let plugins = []
  let config = {}
  let arr = Array.from(arguments)
  arr.forEach(item => {
    item.plugins && item.plugins.forEach(plugin => {
      plugins.push(plugin)
    })
    if (Object.prototype.toString.call(item) === '[object Object]') {
      config = Object.assign({}, config, item)
    }
  })
  config.plugins = plugins
  return config
}

module.exports = {
  rollupMerge
}