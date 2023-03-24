export const getRandomInRange = (min: number, max: number, count: number) => {
  if (count > max - min) {
    throw new Error('Range too small to generate requested count of numbers');
  }

  const result = new Set<number>();

  while (result.size < count) {
    const number = Math.floor(Math.random() * (max - min)) + min;
    result.add(number);
  }

  return [...result];
};
