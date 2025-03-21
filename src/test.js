const arr = [1, 2, 3, 4, 5];

const result = arr.map(num => {
  if (num === 3) return undefined; // Skipping 3
  return num * 2;
});

console.log(result); // [2, 4, undefined, 8, 10]
