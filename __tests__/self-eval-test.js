const assert = require('assert');

module.exports = (cader) => {
  assert.strictEqual(cader.eval(1), 1);
  assert.strictEqual(cader.eval('"hello"'), "hello");
};