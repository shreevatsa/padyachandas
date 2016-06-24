// Has a bunch of "strategies". Returns possible metres for each strategy.

function strict(lines) {
  if (lines.length === 4) {
    if (lines.every((line) => line === '22221111122122122')) {
      return 'mandakranta';
    }
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

function identify(lines) {
  let result = strict(lines);
  if (result && result.length) {
    return { exact: result };
  }
  result = allowLaghuOnEvenLines(lines);
  if (result && result.length) {
    return { okay: result };
  }
  return { paadaanta: 'mandakranta' };
}

module.exports = identify;
