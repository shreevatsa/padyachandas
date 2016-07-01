const assert = require('assert');  // Can change to import { assert } from 'assert' after https://github.com/nodejs/help/issues/53
const identify = require('./identify');

function blobify(lines) {
  if (lines.length !== 4) {
    throw new Error('Give me four lines');
  }
  return [lines[0] + lines[1] + lines[2] + lines[3]];
}

function test() {
  const line = '22221111122122122';

  const verseUnknown = ['112211', '111122', '122111', '121121'];
  assert.deepStrictEqual(identify(verseUnknown), {});
  assert.deepStrictEqual(identify(blobify(verseUnknown)), {});

  const versePerfect = [line, line, line, line];
  assert.deepStrictEqual(identify(versePerfect), { exact: 'mandakranta' });
  assert.deepStrictEqual(identify(blobify(versePerfect)), { blobExact: 'mandakranta' });

  // One or both of the even pAda-s ending in a laghu
  const lineLaghu = line.replace(/2$/, '1');
  for (const verseOkay of [[line, line, line, lineLaghu],
                           [line, lineLaghu, line, line],
                           [line, lineLaghu, line, lineLaghu]]) {
    assert.deepStrictEqual(identify(verseOkay), { okay: 'mandakranta' });
    assert.deepStrictEqual(identify(blobify(verseOkay)), { blobOkay: 'mandakranta' });
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
    assert.deepStrictEqual(identify(verse), { paadaanta: 'mandakranta' });
    assert.deepStrictEqual(identify(blobify(verse)), { blobPaadaanta: 'mandakranta' });
  }

  // Still to test:
  // 2 lines
  // 1 or 3 lines
  // blob: half a verse
  // blob: some padas
  // other metres
  // matra metres
  // anushtup shloka
  // arya, giti
  // stotra metres: 4-4 4-4 or 3-5 3-5 etc.
}

test();
