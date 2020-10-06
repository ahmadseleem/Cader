const assert = require('assert');

/**
 * Cader Interpreter *
 **/
class Cader {
  eval(exp) {

    // .............................................
    // Self-evaluating Expressions :

    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    // .............................................
    // Math operations :

    if (exp[0] === "+") {
      return this.eval(exp[1]) + this.eval(exp[2]);
    }

    if (exp[0] === "-") {
      return this.eval(exp[1]) - this.eval(exp[2]);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1]) * this.eval(exp[2]);
    }

    if (exp[0] === "/") {
      return this.eval(exp[1]) / this.eval(exp[2]);
    }

    throw 'Unimplemented';
  }
}

function isNumber(exp) {
  return typeof exp === 'number';
}

function isString(exp) {
  return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}



// ======================================
// Tests:
const cader = new Cader();

assert.strictEqual(cader.eval(1), 1);
assert.strictEqual(cader.eval('"hello"'), 'hello');

assert.strictEqual(cader.eval(['+', 1, 4]), 5);
assert.strictEqual(cader.eval(['+', ['+', 1, 4], 8]), 13);
assert.strictEqual(cader.eval(['+', 8, ['+', 1, 4]]), 13);

assert.strictEqual(cader.eval(['-', 9, 4]), 5);
assert.strictEqual(cader.eval(['-', ['-', 4, 2], 2]), 0);
assert.strictEqual(cader.eval(['-', 8, ['-', 1, 4]]), 11);

assert.strictEqual(cader.eval(['*', 1, 4]), 4);
assert.strictEqual(cader.eval(['*', ['*', 1, 4], 8]), 32);
assert.strictEqual(cader.eval(['*', 5, ['*', 2, 4]]), 40);

assert.strictEqual(cader.eval(['/', 4, 1]), 4);
assert.strictEqual(cader.eval(['/', ['/', 40, 2], 5]), 4);
assert.strictEqual(cader.eval(['/', 60, ['/', 4, 2]]), 30);

console.log('All assrtions passed!');