import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/js/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: false,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({
      presets: [ 'es2015-rollup' ],
      babelrc: false,
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
