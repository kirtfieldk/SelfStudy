// Travler on 2D grid, begin in top-left corner and goal to travel to bottom right, May only move down/right
//  Take 2,3 Grid
// Move right and our grid is now 2,2
// Move Down and our grid is 1,3
// Not the number of moves for a n, m gris is the same as m, n

/**
 *  Each node can have Two Children
 *  Numbers of levels will ne n + m, so O(t) = 2 ^(n + m)
 *  Space will be O(n + m)
 */
const gridTravlerOld = (m, n) => {
  if (m == 1 && n == 1) return 1;
  if (m == 0 || n == 0) return 0;
  return gridTravler(m - 1, n) + gridTravler(m, n - 1);
};

/**
 *  Recipe:
 *      Stick to two high level steps, Make it work then make it efficient
 *      Visualize it as a tree
 *      Impliment tree with recursion
 *
 *      Add memo object woth base case
 * @param {*} m
 * @param {*} n
 * @param {*} memo
 * @returns
 */
const gridTravler = (m, n, memo = {}) => {
  const key = m + ',' + n;
  if (key in memo) return memo[key];
  if (m == 1 && n == 1) return 1;
  if (m == 0 || n == 0) return 0;
  memo[key] =
    gridTravler(m - 1, n, memo) + gridTravler(m, n - 1, memo);
  return memo[key];
};

console.log(gridTravler(1, 1));
console.log(gridTravler(2, 3));
console.log(gridTravler(3, 2));
console.log(gridTravler(3, 3));
console.log(gridTravler(18, 18));
