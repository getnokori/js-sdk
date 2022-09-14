'strict'

// LolaDB.PACKAGE_VERSION = require('../package.json').version
import LolaDB from './classes/loladb.class'

const exports = {
  LolaDB,
}
module.exports = exports

// Allow use with the TypeScript compiler without `esModuleInterop`.
// We may also want to add `Object.defineProperty(exports, "__esModule", {value: true});` in the future, so that Babel users will use the `default` version.
module.exports.default = exports
