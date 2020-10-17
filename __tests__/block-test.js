const assert = require("assert");
const testUtil = require("./test-util");

module.exports = (cader) => {
  // Blocks :
  assert.strictEqual(
    cader.eval([
      "begin",

      ["var", "x", 10],
      ["var", "y", 20],

      ["*", ["+", "x", "y"], 30],
    ]),
    900
  );

  /// Blocks: Nested.
  assert.strictEqual(
    cader.eval([
      "begin",
      ["var", "x", 10],
      ["begin", ["var", "x", 20], "x"],
      "x",
    ]),
    10
  );

  /// Blocks: Env Chain. ( ID resolution )
  assert.strictEqual(
    cader.eval([
      "begin",

      ["var", "value", 10],

      ["var", "result", ["begin", ["var", "x", ["+", "value", 10]], "x"]],

      "result",
    ]),
    20
  );

  /// Blocks: Assignment.
  assert.strictEqual(
    cader.eval([
      "begin",

      ["var", "data", 10],

      ["begin", ["set", "data", 100], "x"],

      "data",
    ]),
    100
  );
};

  /// Blocks: S-Expressions.
  testUtil.test(`
  (begin
    (var x 10)
    (var y 20)
    (+ (* x 10) y))
  `,
  120);

