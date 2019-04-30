import { name, } from '../package.json'
import config from './rollup.config.base.js'
const { rollupMerge } = require('./utils.js')

const outArrays = [
  { format: 'umd', name: `${name}.umd.min.js` },
  { format: 'cjs',  name: `${name}.cjs.js` },
  { format: 'es',  name: `${name}.es.js` }
]

module.exports = outArrays.map(item => {
  const currentConfig = {
    output: {
      file: `dist/${item.name}`,
      format: item.format,
      name,
    },
    watch: {
      include: 'src/**',
    }
  }
  return rollupMerge(config, currentConfig)
})