function test(cader, code, expected) {
    const exp = caderParser.parse(code);
    assert.strictEqual(cader.eval(exp), expected);
}