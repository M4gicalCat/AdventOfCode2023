const parse = (s: string) =>
  s
    .split('\n')
    .map(l => {
      const arr = (l.match(/\d+/g) ?? []).join('').split('');
      return +`${arr[0]}${arr.at(-1)}`;
    })
    .reduce((a, b) => a + b, 0);

export const solve = (input: string) => console.log(parse(input));
