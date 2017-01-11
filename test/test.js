const assert = require("assert");
const fs = require("fs");
const generate = require("../generator");
const transform = require("../transformer");

const doFullTest = function(testPath){
  try {
    var source      = fs.readFileSync(testPath + ".nex", 'utf-8');
    var parsed      = fs.readFileSync(testPath + ".parsed.ast", 'utf-8');
    var transformed = fs.readFileSync(testPath + ".transformed.ast", 'utf-8');
    var generated   = fs.readFileSync(testPath + ".ne", 'utf-8');
  } catch (e){}
  describe("@"+testPath, _ => {
    // it("should correctly parse .nex into .parsed.ast", () => assert.equal(true, false))
    it("should correctly transform .parsed.ast into .transformed.ast", () => testTransform(parsed, transformed))
    it("should correctly generate .transformed.ast into .ne", () => testGenerator(transformed, generated))
  })
}

const testTransform = function(parsed, transformed){
  assert.deepEqual(transform(JSON.parse(parsed)), JSON.parse(transformed))
}

const testGenerator = function(transformed, generated){
  assert.equal(generate(JSON.parse(transformed)[0]), generated)
}

const root = "./test";

const tests = fs.readdirSync(root).filter(f => fs.statSync(root+"/"+f).isDirectory()).map(f => root+"/"+f+"/"+f);

describe("Test", _ => tests.forEach(doFullTest));