const tracer = new GraphTracer({ directed: false, weighted: true });
const logger = new LogTracer();
tracer.log(logger);
const G = Randomize.graph(5, {
  directed: false, weighted: true, ratio: 1, min: 1, max: 9,
});
tracer.set(G);

function BFS() {
  const W = []; // W[i] indicates the length of the shortest path from start node to the i-th node
  const Q = [];
  let i;
  for (i = 0; i < G.length; i++) {
    W.push(MAX_VALUE);
    tracer.weight(i, MAX_VALUE);
  }
  W[s] = 0;
  Q.push(s); // add start node to queue
  tracer.visit(s, undefined, 0).wait();
  while (Q.length > 0) {
    const node = Q.shift(); // dequeue
    for (i = 0; i < G[node].length; i++) {
      if (G[node][i]) { // if the edge from current node to the i-th node exists
        if (W[i] > W[node] + G[node][i]) { // if current path is shorter than the previously shortest path
          W[i] = W[node] + G[node][i]; // update the length of the shortest path
          Q.push(i); // add child node to queue
          tracer.visit(i, node, W[i]).wait();
        }
      }
    }
  }
  return W[e];
}
let s = Randomize.integer(0, G.length - 1); // s = start node
let e; // e = start node
do {
  e = Randomize.integer(0, G.length - 1);
} while (s === e);
let MAX_VALUE = Infinity;
logger.print(`finding the shortest path from ${s} to ${e}`);
const minWeight = BFS(s);
if (minWeight === MAX_VALUE) {
  logger.print(`there is no path from ${s} to ${e}`);
} else {
  logger.print(`the shortest path from ${s} to ${e} is ${minWeight}`);
}