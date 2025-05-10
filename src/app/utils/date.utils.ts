export function getRandomDateWithin2Days(): Date {
  const now = new Date();
  const randomOffset = Math.random() * 2 * 24 * 60 * 60 * 1000;
  now.setTime(now.getTime() - randomOffset);
  return now;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

