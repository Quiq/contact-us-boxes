import postcss from 'rollup-plugin-postcss'
import babel, {getBabelOutputPlugin} from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import {uglify} from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'QuiqContactUs',
      file: pkg.browser,
      format: 'iife',
    },
    plugins: [
      resolve(),
      postcss({extensions: ['.sass', '.css']}),
      babel({exclude: 'node_modules/**'}),
      commonjs(),
      // uglify(),
    ],
  },
]
