const parse = (s: string) =>
  s
    .split('\n')
    .map(l => {
      const reg = /one|two|three|four|five|six|seven|eight|nine|\d/;
      const first = l.search(reg);
      let last: number = -1;
      for (let i = l.length - 1; i >= 0; i--) {
        last = l.slice(i).search(reg);
        if (last !== -1) {
          last = i;
          break;
        }
      }
      const n1 = Number.isNaN(+l.charAt(first))
        ? l.slice(first).startsWith('one')
          ? 1
          : l.slice(first).startsWith('two')
          ? 2
          : l.slice(first).startsWith('three')
          ? 3
          : l.slice(first).startsWith('four')
          ? 4
          : l.slice(first).startsWith('five')
          ? 5
          : l.slice(first).startsWith('six')
          ? 6
          : l.slice(first).startsWith('seven')
          ? 7
          : l.slice(first).startsWith('eight')
          ? 8
          : 9
        : +l.charAt(first);
      const n2 = Number.isNaN(+l.charAt(last))
        ? l.slice(last).startsWith('one')
          ? 1
          : l.slice(last).startsWith('two')
          ? 2
          : l.slice(last).startsWith('three')
          ? 3
          : l.slice(last).startsWith('four')
          ? 4
          : l.slice(last).startsWith('five')
          ? 5
          : l.slice(last).startsWith('six')
          ? 6
          : l.slice(last).startsWith('seven')
          ? 7
          : l.slice(last).startsWith('eight')
          ? 8
          : 9
        : +l.charAt(last);
      console.log(l, { n1, n2, first, last });
      return n1 * 10 + n2;
    })
    .reduce((a, b) => a + b, 0);

export const solve = (input: string) => console.log(parse(input));
