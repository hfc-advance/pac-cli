import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import eslintFormate from 'eslint-friendly-formatter'
import css from 'rollup-plugin-css-only'
import { version, dependencies } from '../package.json'

export default {
  plugins: [
    eslint({
      include: ['src/**/*.js', 'src/**/*.vue'],
      formatter: eslintFormate
    }),
    resolve({}),
    commonjs(),
    babel(
      {
        babelrc: true,
        "runtimeHelpers": true
      }
    ),
    css(),
    replace({
      VERSION: JSON.stringify(version),
    }),
  ],
  external: id => {
    let keys = Object.keys(dependencies) || []
    for (let key of keys) {
      let reg = new RegExp(`^${key}`)
      if (reg.test(id)) return true
    }
    return false
  }
}
