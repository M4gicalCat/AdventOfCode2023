export const solve = (input: string) => {
  const cards = new Map(
    input.split('\n').map((card, index, arr) => {
      const [winning, current] = card
        .split(': ')[1]
        .split(' | ')
        .map(s =>
          s
            .split(' ')
            .filter(i => i.length)
            .map(Number),
        );
      const n = Math.min(
        current.filter(c => winning.includes(c)).length,
        arr.length - index,
      );
      return [index, new Array(n).fill(0).map((_, i) => index + i + 1)];
    }),
  );
  let total = cards.size;
  const toProcess = new Map(
    new Array(cards.size).fill(0).map((_, i) => [i, 0]),
  );
  for (let i = 0; i < cards.size; i++) {
    const toAdd = cards.get(i);
    const plus = toProcess.get(i);
    total += plus;
    for (const n of toAdd) toProcess.set(n, toProcess.get(n) + 1 + plus);
  }
  console.log(total);
};
