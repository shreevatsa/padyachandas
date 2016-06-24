// Has a bunch of "strategies". Returns possible metres for each strategy.

function strict(lines) {
  if (lines.length === 4) {
    if (lines.every((line) => line === '22221111122122122')) {
      return 'mandakranta';
    }
  }
  return [];
}

function identify(lines) {
  const s = strict(lines);
  if (s.length) {
    return { exact: s };
  }
  return { okay: 'mandakranta' };
}

module.exports = identify;
