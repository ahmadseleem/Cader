const Cader = require('../Cader');
const Environment = require('../Environment');

const tests = [
    require('./self-eval-test.js'),
    require('./math-test.js'),
    require('./variables-test.js'),
    require('./block-test.js'),
    require('./if-test.js'),
    require('./while-test.js'),
];



// ======================================
// Tests:
const cader = new Cader(
  new Environment({
    null: null,

    true: true,
    false: false,

    VERSION: "0.1",
  })
);


tests.forEach((test) => { test(cader) });

console.log("All assrtions passed!");
  
