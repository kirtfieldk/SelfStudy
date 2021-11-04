/**
 * Take an Adjancy List and determin if has path that is acyclic (No Circles!) between source and destination node
 * n = #Nodes e = #edge  Time: O(e) Space: O(n)
 * We can also just use one var (n for Nodes and n^2 is Edges)
 */
const graph = {
  a: ['b', 'c'],
  b: ['e'],
  c: ['d'],
  d: [],
  e: [],
};
// Depth
const hasPath = (graph, src, dst) => {
  if (src === dst) return true;
  for (let n of graph[src]) {
    found = hasPath(graph, n, dst);
    if (found) {
      return true;
    }
  }
  return false;
};

// Queue
const hasPathBredth = (graph, src, dst) => {
  const queue = [src];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === dst) return true;
    // If not found, we add all adjacent nodes to queue
    for (let x of graph[current]) {
      queue.push(x);
    }
  }
  return false;
};

console.log(hasPath(graph, 'a', 'e'));
