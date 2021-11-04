/**
 * Given edge list of Undirected Graph
 * Want to convert edges to a node graph
 * A good way to avoid cycles is to mark nodes as visted
 *
 * n nodes / e edges
 * The worst case, we will need to travel through all edges to find node, and we will need space for all nodes
 * Time O(e)
 * Space O(n)
 */

const edges = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n'],
];

// Since undirected, nodes must be reverse added too
// Note Node O and N form a trivial node
const graph = {
  i: ['j', 'k'],
  l: ['i'],
  k: ['i', 'm', 'l'],
  m: ['k'],
  l: ['k'],
  o: ['n'],
  n: ['o'],
};
// Depth First
const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
};

const buildGraph = (edge) => {
  const graph = {};
  for (let x of edge) {
    const [a, b] = x;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};

//Depth Recursion Need to account for cycles! Need to add seen param
const hasPath = (graph, src, dst, seen) => {
  if (src === dst) return true;
  if (seen.has(src)) return false;
  seen.add(src);
  for (let x of graph[src]) {
    if (hasPath(graph, x, dst, seen)) return true;
  }
  return false;
};
