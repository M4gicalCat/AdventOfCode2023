import input from './input';

const DAY = 4;
const PUZZLE = 2;

// @ts-ignore
const { solve } = await import(`./${DAY}.${PUZZLE}.ts`);

solve(input);
