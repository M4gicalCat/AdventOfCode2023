enum CATEGORIES {
  SEED = 'seed',
  SOIL = 'soil',
  FERTILIZER = 'fertilizer',
  WATER = 'water',
  LIGHT = 'light',
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  LOCATION = 'location',
}

const ORDER = [
  CATEGORIES.SEED,
  CATEGORIES.SOIL,
  CATEGORIES.FERTILIZER,
  CATEGORIES.WATER,
  CATEGORIES.LIGHT,
  CATEGORIES.TEMPERATURE,
  CATEGORIES.HUMIDITY,
  CATEGORIES.LOCATION,
];

const parse = (input: string) => {
  const [seeds, sts, stf, ftw, wtl, ltt, tth, htl] = input.split('\n\n');
  const cats: Record<string, number[][]> = {};
  for (const [block, categories] of [
    [sts, [CATEGORIES.SEED, CATEGORIES.SOIL]],
    [stf, [CATEGORIES.SOIL, CATEGORIES.FERTILIZER]],
    [ftw, [CATEGORIES.FERTILIZER, CATEGORIES.WATER]],
    [wtl, [CATEGORIES.WATER, CATEGORIES.LIGHT]],
    [ltt, [CATEGORIES.LIGHT, CATEGORIES.TEMPERATURE]],
    [tth, [CATEGORIES.TEMPERATURE, CATEGORIES.HUMIDITY]],
    [htl, [CATEGORIES.HUMIDITY, CATEGORIES.LOCATION]],
  ] as [string, [CATEGORIES, CATEGORIES]][]) {
    cats[categories.join('_')] = block
      .split('\n')
      .slice(1)
      .map(row => row.split(' ').map(Number));
  }
  return [seeds.split(': ')[1].split(' ').map(Number), cats];
};

const getOutput = (id: number, mappings: [number, number, number][]) => {
  for (const mapping of mappings) {
    const [from, to] = [mapping[1], mapping[1] + mapping[2]];
    if (id < from || id > to) continue;
    return mapping[0] + (id - mapping[1]);
  }
  return id;
};

export const solve = (input: string) => {
  let min: number = Infinity;
  const [seeds, maps] = parse(input);
  for (const seed of seeds as number[]) {
    let current = seed;
    for (let x = 0, y = 1; y < ORDER.length; x++, y++) {
      const from = ORDER[x];
      const to = ORDER[y];

      current = getOutput(current, maps[[from, to].join('_')]);
    }
    min = Math.min(current, min);
  }
  console.log(min);
};
