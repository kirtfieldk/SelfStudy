//Return number of ways work can be construct from wordBank
//Form a tree and each leaf that is '' will return 1

/*
    m = target.length  n = wordBank.length
    O(n*m^2) time O(m^2) space
*/
const countConstruct = (target, wordBank, memo = {}) => {
  if (target in memo) return memo[target];
  if (target === '') return 1;

  let count = 0;
  wordBank.forEach((word) => {
    if (target.indexOf(word) === 0) {
      const numWays = countConstruct(
        target.slice(word.length),
        wordBank,
        memo,
      );
      count += numWays;
    }
  });
  memo[target] = count;
  return count;
};

console.log(
  countConstruct('purple', ['purpl', 'p', 'ur', 'le', 'purp']),
); //2

console.log(
  countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eeee',
    'eeeeeeeee',
    'eeeeee',
  ]),
);
