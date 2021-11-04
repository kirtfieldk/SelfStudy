// canSum(target, numbers) The function should return boolean if target can be made with the values in array
// Can use elements numerouse times
// canSum(7, [5. 3. 4. 7]) -> true

/**
 * O(m * n) time
 * O(m) space
 * @param {*} target
 * @param {*} numbers
 * @param {*} memo
 * @returns
 */
const canSum = (target, numbers, memo = {}) => {
  if (target in memo) return memo[target];
  if (target == 0) return true;
  if (target < 0) return false;
  for (let num of numbers) {
    const remainder = target - num;
    memo[target] = canSum(remainder, numbers, memo);
    if (memo[target] === true) {
      return true;
    }
  }
  memo[target] = false;
  return memo[target];
};

console.log(canSum(300, [7, 14]));
