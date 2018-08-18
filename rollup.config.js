/*eslint-disable no-console*/
const path = require('path');
const pkg = require('./package.json');

const ROOT_DIR = path.resolve(__dirname);

const banner = `/**
 * ${pkg.name}
 *
 * @author ${pkg.author}
 * @version: ${pkg.version}
 * @license: ${pkg.license}
 **/
`;

module.exports = {
  input: path.join(ROOT_DIR, 'src', 'index.js'),
  output: {
    banner,
    file: path.join(ROOT_DIR, 'dist', 'index.js'),
    format: 'cjs'
  },
  external: ['react', 'recompose/compose']
};
