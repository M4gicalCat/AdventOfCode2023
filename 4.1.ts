export const solve = (input: string) => {
  const total = input
    .split('\n')
    .map(card => {
      const [winning, current] = card
        .split(': ')[1]
        .split(' | ')
        .map(s =>
          s
            .split(' ')
            .filter(i => i.length)
            .map(Number),
        );
      const n = current.filter(c => winning.includes(c)).length;
      return n === 0 ? 0 : Math.pow(2, n - 1);
    })
    .reduce((a, b) => a + b, 0);
  console.log(total);
};
