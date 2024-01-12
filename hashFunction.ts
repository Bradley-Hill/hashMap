export function stringToNumber(key: string): number {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
}

export function hash(key: string): number {
  let hashCode = stringToNumber(key);
  return hashCode % 16;
}
