const assert = require('assert');

module.exports = (cader) => {
  // Math
  assert.strictEqual(cader.eval(["+", 1, 4]), 5);
  assert.strictEqual(cader.eval(["+", ["+", 1, 4], 8]), 13);
  assert.strictEqual(cader.eval(["+", 8, ["+", 1, 4]]), 13);

  assert.strictEqual(cader.eval(["-", 9, 4]), 5);
  assert.strictEqual(cader.eval(["-", ["-", 4, 2], 2]), 0);
  assert.strictEqual(cader.eval(["-", 8, ["-", 1, 4]]), 11);

  assert.strictEqual(cader.eval(["*", 1, 4]), 4);
  assert.strictEqual(cader.eval(["*", ["*", 1, 4], 8]), 32);
  assert.strictEqual(cader.eval(["*", 5, ["*", 2, 4]]), 40);

  assert.strictEqual(cader.eval(["/", 4, 1]), 4);
  assert.strictEqual(cader.eval(["/", ["/", 40, 2], 5]), 4);
  assert.strictEqual(cader.eval(["/", 60, ["/", 4, 2]]), 30);
};