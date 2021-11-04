// Return array containing any combination of elements that add up to target, return null if non
// Needs to return just one

// Brute Force O(n^m * m) time and O(m) space
// Memoized O(n * m * m), The copying of the Array with at most m elemnts O(m * m) space m Keys time a m array
const howSum = (target, numbers, memo = {}) => {
  if (target in memo) return memo[target];
  if (target === 0) return [];
  if (target < 0) return null;

  for (let num of numbers) {
    const remainder = target - num;
    const remainderResult = howSum(remainder, numbers, memo);
    if (remainderResult !== null) {
      memo[target] = [...remainderResult, num];
      return memo[target];
    }
  }
  memo[target] = null;
  return memo[target];
};

console.log(howSum(7, [2, 3]));
console.log(howSum(7, [5, 3, 4, 7]));
console.log(howSum(7, [2, 4]));
console.log(howSum(300, [7, 14]));
