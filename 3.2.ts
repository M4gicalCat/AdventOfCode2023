function getPossibilities(
  givenX: number,
  givenY: number,
  maxWidth: number,
  maxHeight: number,
) {
  const startX = Math.max(0, givenX - 1);
  const endX = Math.min(maxWidth, givenX + 1);
  const startY = Math.max(0, givenY - 1);
  const endY = Math.min(maxHeight, givenY + 1);
  const arr: { x: number; y: number }[] = [];
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      arr.push({ x, y });
    }
  }
  return arr;
}

const getWholeNumber = (x: number, line: string) => {
  let n = '';
  let m = { left: x, right: x };
  for (
    let left = x, right = x + 1;
    left >= 0 || right < line.length;
    left--, right++
  ) {
    if (left >= 0) {
      const l = line.charAt(left);
      if (Number.isNaN(+l)) left = -1;
      else {
        n = `${l}${n}`;
        m.left = left;
      }
    }
    if (right < line.length) {
      const l = line.charAt(right);
      if (Number.isNaN(+l)) right = line.length;
      else {
        n = `${n}${l}`;
        m.right = right;
      }
    }
  }
  return { ...m, value: +n };
};

export const solve = (input: string) => {
  let total = 0;
  const stars: { x: number; y: number }[] = [];
  const split = input.split('\n');
  for (let y = 0; y < split.length; y++) {
    for (let x = 0; x < split[y].length; x++) {
      if (split[y].charAt(x) === '*') stars.push({ x, y });
    }
  }
  for (const star of stars) {
    const possibilities = getPossibilities(
      star.x,
      star.y,
      split[0].length,
      split.length,
    );
    let adjacents = new Set<string>();
    for (const p of possibilities) {
      if (!Number.isNaN(+(split[p.y]?.charAt(p.x) ?? 'a'))) {
        adjacents.add(JSON.stringify(getWholeNumber(p.x, split[p.y])));
      }
    }
    if (adjacents.size === 2) {
      let n = 1;
      adjacents.forEach(v => (n *= +JSON.parse(v).value));
      total += n;
    }
  }
  console.log(total);
};
