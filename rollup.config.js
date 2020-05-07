import pkg from './package.json'

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'QuiqContactUs',
      file: pkg.browser,
      format: 'iife',
    },
  },
]
