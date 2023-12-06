import input from './input';

const DAY = 6;
const PUZZLE = 2;

// @ts-ignore
const { solve } = await import(`./${DAY}.${PUZZLE}.ts`);

solve(input);
