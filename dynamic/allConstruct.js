//Return 2D array to return allways toconstruct word from wordbank

/*
    m = target.length
    n = wordBank.length
    O(n^m)
    O(m)
*/
const allConstruct = (target, wordBank, memo = {}) => {
  if (target in memo) return memo[target];
  if (target === '') return [[]];
  let combo = [];

  wordBank.forEach((word) => {
    if (target.indexOf(word) === 0) {
      const suff = target.slice(word.length);
      const currCombo = allConstruct(suff, wordBank, memo);
      const targetWays = currCombo.map((way) => [word, ...way]);
      combo.push(...targetWays);
    }
  });

  memo[target] = combo;
  return combo;
};

console.log(
  allConstruct('purple', ['purpl', 'p', 'ur', 'le', 'purp']),
); //2

console.log(
  allConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eeee',
    'eeeeeeeee',
    'eeeeee',
  ]),
);
