const f = (a: number, x: number) => x * (a - x); // -x² + ax +0

const getValues = (record: number, time: number): number => {
  let min = 0;
  let max = time + 1;
  while (f(time, min) <= record) {
    min++;
    max--;
  }
  return max - min;
};

export const solve = (input: string) => {
  const [time, distance] = input
    .split('\n')
    .map(line => line.split(': ')[1].split(' ').join(''))
    .map(Number);
  console.log(getValues(distance, time));
};
