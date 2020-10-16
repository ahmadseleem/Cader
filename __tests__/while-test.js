const assert = require("assert");

/**
 * (if <condition>
 *      <consequent>
 *      <alternate>)
 **/
module.exports = (cader) => {
  assert.strictEqual(
    cader.eval([
      "begin",

      ["var", "counter", 0],
      ["var", "result", 0],

      [
        "while",
        ["<", "counter", 10],
        // result++
        // TODO: implement ["++", <exp>]
        [
          "begin",
          ["set", "result", ["+", "result", 1]],
          ["set", "counter", ["+", "counter", 1]],
        ],
      ],
      "result",
    ]),
    10
  );
};