//Can reuse words
// Construct graph with possibilities; However, DO NOT TAKE FROM MIDDLE (only take suffux and prefixes)
// When we reach emptyString we return True

/*
    m = target.length
    n = wordBank.length
    Brute Force O(n^m * m) time the additional m is from the slice method, that at worst runs in linear
                O(m^2) Space we will at most go m Depth, The SLice will return a new string which is linear,
                Each m StackFram will need to store a string of length m

    Memorized O(n * m^2) time We no longer need to explore dup subtrees
              O(m^2) space
*/
const canConstruct = (target, wordBank, memo = {}) => {
  if (target in memo) return memo[target];
  if (target === '') return true;

  wordBank.forEach((word) => {
    if (target.indexOf(word) === 0) {
      target = target.slice(word.length);
      if (canConstruct(target, wordBank, memo) === true) {
        memo[target] = true;
        return true;
      }
    }
  });

  memo[target] = false;
  return false;
};

console.log(
  canConstruct('purple', ['purpl', 'p', 'ur', 'le', 'purp']),
); //2

console.log(
  canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', [
    'e',
    'ee',
    'eeee',
    'eeeeeeeee',
    'eeeeee',
  ]),
);
