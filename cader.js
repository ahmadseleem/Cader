/*jshint esversion: 6 */

const assert = require('assert');
const Environment = require('./Environment')

/**
 * Cader Interpreter *
 **/
class Cader {
  /**
   * Creates an Cader instance with the program environment.
   **/
  constructor(prog = new Environment()) {
    this.prog = prog;
  }

  /**
   * Evaluates an expression in a given environment.
   **/
  eval(exp, env = this.prog) {
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

    // .............................................
    // Variable declaration : (var foo 10)

    if (exp[0] === "var") {
      let [_, name, value] = exp;
      return env.define(name, this.eval(value));
    }

    // .............................................
    // Variable access : foo

    if (isVariableName(exp)) {
      return env.lookup(exp);
    }


    throw `Unimplemented: ${JSON.stringify(exp)}`;
  }
}

function isNumber(exp) {
  return typeof exp === 'number';
}

function isString(exp) {
  return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9]*$/.test(exp);
}


// ======================================
// Tests:
const cader = new Cader(new Environment({
  null: null,

  true: true,
  false: false,

  VERSION: '0.1',
}));

assert.strictEqual(cader.eval(1), 1);
assert.strictEqual(cader.eval('"hello"'), 'hello');

// Math
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

// Variables :
assert.strictEqual(cader.eval(['var', 'x', 9]), 9);
assert.strictEqual(cader.eval('x'), 9);
assert.strictEqual(cader.eval(['var', 'M9', 9]), 9);
assert.strictEqual(cader.eval('M9'), 9);

assert.strictEqual(cader.eval('VERSION'), '0.1');

// var isUser = true
assert.strictEqual(cader.eval(['var', 'isUser', 'true']), true);

assert.strictEqual(cader.eval(['var', 'x', ['*', 2, 4]]), 8);


console.log('All assrtions passed!');
