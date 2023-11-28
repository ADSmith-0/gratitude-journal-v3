export const matrix = <T>(m: number, n: number, defaultValue: T): T[][] => {
  return Array.from({ length: m }, () => Array(n).fill(defaultValue));
};
