import filesize from 'rollup-plugin-filesize'
import { name, version, author } from '../package.json'
import config from './rollup.config.base.js'
import minify from 'rollup-plugin-minify-es'
const { rollupMerge } = require('./utils.js')

let banner = `${'/*!\n' + ' * '}🏆${name}.js v${version}🏆\n` +
            ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
            ` * Released under the MIT License.\n` +
            ` */`

const outArrays = [
  { format: 'umd', name: `${name}.umd.js` },
  { format: 'cjs',  name: `${name}.cjs.js` },
  { format: 'es',  name: `${name}.es.js` },
  { format: 'iife', minify: false, name: `${name}.min.js` }
]

module.exports = outArrays.map(item => {
  const currentConfig = {
    input: 'src/index.js',
    output: {
      file: `dist/${item.name}`,
      format: item.format,
      name,
      banner
    },
    plugins: [
      filesize()
    ]
  }
  if (item.minify) {
    currentConfig.plugins.push(minify())
  }

  let result = rollupMerge(config, currentConfig)
  if (item.format === 'iife') {
    delete result.external
  }
  return result
})