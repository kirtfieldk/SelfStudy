/*
    Brute Force: m = targetSum, n = numbers.length
    Time O(m ^ n * m)
    Space O(m^2) For each stack Fram we need to store a Array

    Memoization:
    Time O(m^2 * n) Need to branch for every number in array, copy array
    Space O(m ^ 2)
*/

const bestSum = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum == 0) return [];
  if (targetSum < 0) return null;
  let shortest = null;
  numbers.forEach((num) => {
    const remainder = targetSum - num;
    const remainderCombo = bestSum(remainder, numbers, memo);
    if (remainderCombo !== null) {
      const combo = [...remainderCombo, num];
      if (shortest === null || combo.length < shortest.length) {
        shortest = combo;
      }
    }
  });

  memo[targetSum] = shortest;
  return shortest;
};

console.log(bestSum(7, [5, 3, 4, 7]));
console.log(bestSum(8, [2, 3, 5]));
console.log(bestSum(100, [1, 2, 5, 25]));
