/*eslint-disable no-console*/
const path = require('path');
const pkg = require('./package.json');
const cleanup = require('rollup-plugin-cleanup');

const ROOT_DIR = path.resolve(__dirname);

const banner = `/**
 * ${pkg.name}
 *
 * @author ${pkg.author}
 * @version: ${pkg.version}
 * @license: ${pkg.license}
 **/
`;

function bundle(format, ext = '') {
  return {
    input: path.join(ROOT_DIR, 'src', 'index.js'),
    output: {
      banner,
      file: path.join(ROOT_DIR, 'dist', 'index' + ext + '.js'),
      format: format,
      name: 'recomposeWithMiddleware',
      globals: {
        react: 'react',
        recompose: 'recompose'
      }
    },
    external: ['react', 'recompose'],
    plugins: [cleanup()]
  };
}

module.exports = [bundle('cjs'), bundle('esm', '.esm')];
