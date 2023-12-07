type Card = string[];
const ORDER = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
const replaceable = ORDER.slice(0, -1);
enum HANDS {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

const getHand = (card: Card) => {
  const totals = {} as Record<string, number>;
  for (const o of ORDER) totals[o] = 0;
  for (const c of card) totals[c]++;
  const values = Object.values(totals)
    .filter(i => i)
    .sort((a, b) => a - b);
  if (values.length === 1) return HANDS.FIVE_OF_A_KIND;
  if (values.length === 4) return HANDS.ONE_PAIR;
  if (values.length === 5) return HANDS.HIGH_CARD;
  // length 2
  if (values[0] === 2 && values[1] === 3) return HANDS.FULL_HOUSE;
  if (values[0] === 1 && values[1] === 4) return HANDS.FOUR_OF_A_KIND;
  // length 3
  if (values[2] === 3) return HANDS.THREE_OF_A_KIND;
  return HANDS.TWO_PAIR;
};

const getHandWrapper = (card: Card) => {
  let max = -1;
  for (const o of replaceable) {
    max = Math.max(max, getHand(card.map(c => (c === 'J' ? o : c))));
  }
  return max;
};

const compare = (cardA: Card, cardB: Card) => {
  for (let i = 0; i < 5; i++) {
    const s = ORDER.indexOf(cardB[i]) - ORDER.indexOf(cardA[i]);
    if (s !== 0) return s;
  }
};

const strongest = (cardA: Card, cardB: Card) =>
  getHandWrapper(cardA) - getHandWrapper(cardB) || compare(cardA, cardB);

export const solve = (input: string) => {
  const sorted = input
    .split('\n')
    .map<[string[], number]>(line => {
      const s = line.split(' ');
      return [s[0].split(''), +s[1]];
    })
    .sort((a, b) => strongest(a[0], b[0]));
  console.log(sorted);
  const total = sorted.reduce((a, b, index) => a + +b[1] * (index + 1), 0);
  console.log(total);
};
