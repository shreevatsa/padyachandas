const assert = require('assert');  // Can change to import { assert } from 'assert' after https://github.com/nodejs/help/issues/53
const identify = require('./identify');

function test() {
  const line = '22221111122122122';

  const versePerfect = [line, line, line, line];
  assert.deepEqual(identify(versePerfect), { exact: 'mandakranta' });

  // One or both of the even pAda-s ending in a laghu
  const lineLaghu = line.replace(/2$/, '1');
  for (const verseOkay of [[line, line, line, lineLaghu],
                           [line, lineLaghu, line, line],
                           [line, lineLaghu, line, lineLaghu]]) {
    assert.deepEqual(identify(verseOkay), { okay: 'mandakranta' });
  }
}

test();
