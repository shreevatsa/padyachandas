const assert = require('assert');  // Can change to import { assert } from 'assert' after https://github.com/nodejs/help/issues/53
const identify = require('./identify');

function blobify(lines) {
  if (lines.length !== 4) {
    throw new Error('Give me four lines');
  }
  return lines[0] + lines[1] + lines[2] + lines[3];
}

function test() {
  const line = '22221111122122122';

  const verseUnknown = ['112211', '111122', '122111', '121121'];
  assert.deepEqual(identify(verseUnknown), {});
  assert.deepEqual(identify(blobify(verseUnknown)), {});

  const versePerfect = [line, line, line, line];
  assert.deepEqual(identify(versePerfect), { exact: 'mandakranta' });
  assert.deepEqual(identify(blobify(versePerfect)), { blobExact: 'mandakranta' });

  // One or both of the even pAda-s ending in a laghu
  const lineLaghu = line.replace(/2$/, '1');
  for (const verseOkay of [[line, line, line, lineLaghu],
                           [line, lineLaghu, line, line],
                           [line, lineLaghu, line, lineLaghu]]) {
    assert.deepEqual(identify(verseOkay), { okay: 'mandakranta' });
    assert.deepEqual(identify(blobify(verseOkay), { okay: 'mandakranta' }));
  }

  // Also the *odd* pAda-s ending in a laghu. The remaining 16 - (1 + 3) cases.
  for (const verse of [[line, line, lineLaghu, line],
                       [line, line, lineLaghu, lineLaghu],
                       [line, lineLaghu, lineLaghu, line],
                       [line, lineLaghu, lineLaghu, lineLaghu],
                       [lineLaghu, line, line, line],
                       [lineLaghu, line, line, lineLaghu],
                       [lineLaghu, line, lineLaghu, line],
                       [lineLaghu, line, lineLaghu, lineLaghu],
                       [lineLaghu, lineLaghu, line, line],
                       [lineLaghu, lineLaghu, line, lineLaghu],
                       [lineLaghu, lineLaghu, lineLaghu, line],
                       [lineLaghu, lineLaghu, lineLaghu, lineLaghu]]) {
    assert.deepEqual(identify(verse), { paadaanta: 'mandakranta' });
    assert.deepEqual(blobify(identify(verse)), { blobPaadaanta: 'mandakranta' });
  }
}

test();
