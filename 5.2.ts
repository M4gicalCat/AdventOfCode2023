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
/**
 * 3 possibilities :
 *  =>
 *
 *  =>
 *  =>
 * @param seeds
 * @param block
 */
const filter = (
  seeds: [number, number][],
  block: [number, number, number],
): [number, number][] => {
  const newSeeds: [number, number][] = [];
  for (const array of seeds) {
    const result = [];
    const blockRemoving = [block[1], block[1] + block[2]];
    const blockAdding = [block[0], block[0] + block[2]];
    // echo todo : check what parts of adding actually gets added, then delete all removing parts
  }
  return newSeeds.filter(a => a[0] < a[1]).sort(([a], [b]) => a - b);
};

const filterAll = (
  seeds: [number, number][],
  blocks: [number, number, number][],
): [number, number][] => blocks.reduce((acc, cur) => filter(acc, cur), seeds);

const parse = (input: string): [number[], Record<string, number[][]>] => {
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

/**
 * IDEA : find the smallest location possible for which a seed exists.
 */

export const solve = (input: string) => {
  const [seeds, maps] = parse(input);
  console.log(seeds, maps);
};
