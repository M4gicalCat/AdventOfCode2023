function* getPossibilities(
  [start, end]: number[],
  givenY: number,
  maxWidth: number,
  maxHeight: number,
) {
  const startX = Math.max(0, start - 1);
  const endX = Math.min(maxWidth, end + 1);
  const startY = Math.max(0, givenY - 1);
  const endY = Math.min(maxHeight, givenY + 1);
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      yield { x, y };
    }
  }
}

const getNumber = (line: string, [start, end]: number[]) => {
  let n = '';
  for (let i = start; i <= end; i++) {
    n += line.charAt(i);
  }
  return +n;
};

export const solve = (input: string) => {
  const numbers: number[] = [];
  input.split('\n').forEach((line, y, arr) => {
    const indexes: [number, number][] = [];
    let isN = false;
    line.split('').forEach((char, x) => {
      if (Number.isNaN(+char)) isN = false;
      else {
        if (isN) {
          indexes.at(-1)[1] = x;
        } else {
          isN = true;
          indexes.push([x, x]);
        }
      }
    });
    for (const number of indexes) {
      let isValid = false;
      let cur: IteratorResult<{ x: number; y: number }>;
      const possibilities = getPossibilities(
        number,
        y,
        line.length,
        arr.length,
      );
      while (!isValid && (cur = possibilities.next()) && !cur.done) {
        console.log(cur.value);
        const char = arr[cur.value.y]?.charAt(cur.value.x);
        isValid = char && char !== '.' && Number.isNaN(+char);
        if (isValid) console.log(char);
      }
      console.log(isValid);
      if (isValid) numbers.push(getNumber(line, number));
    }
  });
  console.log(numbers.reduce((a, b) => a + b, 0));
};
