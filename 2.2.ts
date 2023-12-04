export const solve = (input: string) => {
  const games = input.split('\n').map(l => ({
    id: +l.split(' ')[1].slice(0, -1),
    hints: l
      .split(':')[1]
      .split(';')
      .map(h => h.split(',').map(h => h.trim())),
    max_red: 0,
    max_green: 0,
    max_blue: 0,
  }));
  for (const game of games) {
    for (const hint of game.hints) {
      for (const c of hint) {
        const [n, color] = c.split(' ');
        game[`max_${color}`] = Math.max(game[`max_${color}`], +n);
      }
    }
  }
  const powers = games
    .map(g => g.max_blue * g.max_red * g.max_green)
    .reduce((a, b) => a + b, 0);
  console.log(powers);
};
