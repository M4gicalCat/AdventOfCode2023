const RED = 12;
const GREEN = 13;
const BLUE = 14;

export const solve = (input: string) => {
  const games = input.split('\n').map(l => ({
    id: +l.split(' ')[1].slice(0, -1),
    hints: l
      .split(':')[1]
      .split(';')
      .map(h => h.split(',').map(h => h.trim())),
    max_red: -Infinity,
    max_green: -Infinity,
    max_blue: -Infinity,
  }));
  for (const game of games) {
    for (const hint of game.hints) {
      for (const c of hint) {
        const [n, color] = c.split(' ');
        game[`max_${color}`] = Math.max(game[`max_${color}`], +n);
      }
    }
  }
  const ids = games
    .filter(g => g.max_red <= RED && g.max_green <= GREEN && g.max_blue <= BLUE)
    .map(({ id }) => id)
    .reduce((a, b) => a + b, 0);
  console.log(ids);
};
