// Has a bunch of "strategies". Returns possible metres for each strategy.

function strict(lines) {
  if (lines.length === 4) {
    if (lines.every(line => line === '22221111122122122')) {
      return 'mandakranta';
    }
  }
  return null;
}

function blobStrict(text) {
  const pada = '22221111122122122';
  if (text === pada.concat(pada).concat(pada).concat(pada)) {
    return 'mandakranta';
  }
  return null;
}

function allowLaghuOnEvenLines(lines) {
  if (lines.length === 4) {
    let ok = true;
    for (let i = 0; i < 4; ++i) {
      if (lines[i] === '22221111122122122') continue;
      if (i === 1 || i === 3) {
        if (lines[i] === '22221111122122121') continue;
      }
      ok = false;
      break;
    }
    if (ok) {
      return 'mandakranta';
    }
  }
  return null;
}

function blobAllowLaghuInEvenPadas(text) {
  const pada = '22221111122122122';
  const padaLaghu = '22221111122122121';
  if ([pada + pada + pada + padaLaghu,
       pada + padaLaghu + pada + pada,
       pada + padaLaghu + pada + padaLaghu].some(full => text === full)) {
    return 'mandakranta';
  }
  return null;
}

function allowLaghuOnOddLines(lines) {
  if (lines.length === 4) {
    if (lines.every(line => line === '22221111122122122' || line === '22221111122122121')) {
      return 'mandakranta';
    }
  }
  return null;
}

function blobAllowLaghuInOddPadas(text) {
  const pada = '22221111122122122';
  const padaLaghu = '22221111122122121';
  if ([pada + pada + padaLaghu + pada,
       pada + pada + padaLaghu + padaLaghu,
       pada + padaLaghu + padaLaghu + pada,
       pada + padaLaghu + padaLaghu + padaLaghu,
       padaLaghu + pada + pada + pada,
       padaLaghu + pada + pada + padaLaghu,
       padaLaghu + pada + padaLaghu + pada,
       padaLaghu + pada + padaLaghu + padaLaghu,
       padaLaghu + padaLaghu + pada + pada,
       padaLaghu + padaLaghu + pada + padaLaghu,
       padaLaghu + padaLaghu + padaLaghu + pada,
       padaLaghu + padaLaghu + padaLaghu + padaLaghu].some(full => text === full)) {
    return 'mandakranta';
  }
  return null;
}


function identify(lines) {
  let result = '';

  result = strict(lines);
  if (result && result.length) {
    return { exact: result };
  }

  result = allowLaghuOnEvenLines(lines);
  if (result && result.length) {
    return { okay: result };
  }

  result = allowLaghuOnOddLines(lines);
  if (result && result.length) {
    return { paadaanta: result };
  }

  result = blobStrict(lines.join(''));
  if (result && result.length) {
    return { blobExact: result };
  }

  result = blobAllowLaghuInEvenPadas(lines.join(''));
  if (result && result.length) {
    return { blobOkay: result };
  }

  result = blobAllowLaghuInOddPadas(lines.join(''));
  if (result && result.length) {
    return { blobPaadaanta: result };
  }

  return {};
}

module.exports = identify;
