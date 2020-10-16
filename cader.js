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
      return this.eval(exp[1], env) + this.eval(exp[2], env);
    }

    if (exp[0] === "-") {
      return this.eval(exp[1], env) - this.eval(exp[2], env);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1], env) * this.eval(exp[2], env);
    }

    if (exp[0] === "/") {
      return this.eval(exp[1], env) / this.eval(exp[2], env);
    }

    // .............................................
    // Comparison Operators :

    if (exp[0] === ">") {
      return this.eval(exp[1], env) < this.eval(exp[2], env);
    }

    if (exp[0] === ">=") {
      return this.eval(exp[1], env) >=this.eval(exp[2], env);
    }

    if (exp[0] === "<") {
      return this.eval(exp[1], env) < this.eval(exp[2], env);
    }

    if (exp[0] === "<=") {
      return this.eval(exp[1], env) <= this.eval(exp[2], env);
    }



    // .............................................
    // Blocks : sequence of experssions

    if (exp[0] === "begin") {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    // VARs ========================================
    // .............................................
    // Variable declaration : (var foo 10)

    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env)); 
    }

    // .............................................
    // Variable update : (set foo 100)

    if (exp[0] === "set") {
      const [_, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    // .............................................
    // Variable access : foo

    if (isVariableName(exp)) {
      return env.lookup(exp);
    }

    // .............................................
    // if : (if (> x 10)...)

    if (exp[0] === "if") {
      const [_tag, condition, consequent, alternate] = exp;

      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }

      return this.eval(alternate, env);
    }

    // .............................................
    // whie : (while (> x 10) (...))

    if (exp[0] === "while") {
      const [_tag, condition, body] = exp;

      let result;

      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }

      return result;
    }


    // ==========================================

    throw `Unimplemented: ${JSON.stringify(exp)}`;
  }

  _evalBlock(block, env) {
    let result;

    const [_tag, ...expressions] = block;

    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });

    return result;
  }
}

function isNumber(exp) {
  return typeof exp === 'number';
}

function isString(exp) {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
  return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9]*$/.test(exp);
}


module.exports = Cader;