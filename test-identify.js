const assert = require('assert');  // Can change to import { assert } from 'assert' after https://github.com/nodejs/help/issues/53
const identify = require('./identify');

function test() {
  const line = '22221111122122122';
  const verse = line + line + line + line;
  assert.equal(identify(verse), 'mandakranta');
}

test();
