/**
 * Traversal of graphs
 */

const graph = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: [],
};

const dephthFirst = (graph, sourceNode) => {
  const stack = [sourceNode];
  while (stack.length > 0) {
    const current = stack.pop();
    console.log(current);
    for (let n of graph[current]) {
      stack.push(n);
    }
  }
};

const dephthFirstRecursion = (graph, sourceNode) => {
  console.log(sourceNode);
  for (let n of graph[current]) {
    dephthFirstRecursion(graph, n);
  }
};

const bredthFirst = (graph, sourceNode) => {
  const queue = [sourceNode];
  while (queue.length > 0) {
    const element = queue.shift();
    console.log(element);
    for (let n of graph[element]) {
      queue.push(n);
    }
  }
};

// dephthFirst(graph, 'a'); //abdfce
bredthFirst(graph, 'a');
