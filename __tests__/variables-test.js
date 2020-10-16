const assert = require('assert');

module.exports = (cader) => {
  // Variables :
  assert.strictEqual(cader.eval(["var", "x", 9]), 9);
  assert.strictEqual(cader.eval("x"), 9);
  assert.strictEqual(cader.eval(["var", "M9", 9]), 9);
  assert.strictEqual(cader.eval("M9"), 9);

  assert.strictEqual(cader.eval("VERSION"), "0.1");
  // var isUser = true
  assert.strictEqual(cader.eval(["var", "isUser", "true"]), true);

  assert.strictEqual(cader.eval(["var", "x", ["*", 2, 4]]), 8);
};
