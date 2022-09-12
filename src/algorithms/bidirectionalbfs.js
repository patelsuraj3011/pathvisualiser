import { EventEmitter } from "../events";
const Graph = require("../graph");

let graph = Graph.undirected;

const addIfUnset = (previous, key, value) => {
  if (!previous.has(key)) {
    previous.set(key, value);
  }
};

const shortestPathBfs = (
  queue,
  visitedOwn,
  visitedOther,
  previous,
  previousOther,
  forbidden
) => {
  if (queue.length > 0) {
    const { node, dist } = queue.shift();
    if (visitedOther.has(node)) {
      let ans = [],
        n = node;
      ans.push(n);
      // console.log(previous[previousOther.get(n)]);
      // console.log([...previousOther.entries()]);
      for (let i = 0; i < dist + parseInt(visitedOther.get(node)); i++) {
        n = previous.get(n);
        if (n === undefined) break;
        ans.push(n);
      }
      n = node;
      for (let i = 0; i < dist + parseInt(visitedOther.get(node)); i++) {
        n = previousOther.get(n);
        if (n === undefined) break;
        ans.push(n);
      }
      // console.log(ans);
      return {
        shortestDistance: dist + visitedOther.get(node),
        prev: ans,
      };
    }

    for (let neighbour of Object.keys(graph[node])) {
      if (
        !visitedOwn.has(neighbour) &&
        !forbidden.includes(String(neighbour))
      ) {
        addIfUnset(previous, neighbour, node);
        queue.push({ node: neighbour, dist: dist + 1 });
        EventEmitter.dispatch("visited", neighbour);
        visitedOwn.set(neighbour, dist + 1);
      }
    }

    return { shortestDistance: null, prev: null };
  }
};

const bidirectionalbfs = (startNode, stopNode, forbidden) => {
  if (forbidden.includes[startNode])
    return { distance: "Infinity", path: null };

  const visited1 = new Map();
  const visited2 = new Map();
  const previous1 = new Map();
  const previous2 = new Map();
  const queue1 = [];
  const queue2 = [];
  queue1.push({ node: startNode, dist: 0 });
  queue2.push({ node: stopNode, dist: 0 });
  visited1.set(startNode, 0);
  visited2.set(stopNode, 0);

  EventEmitter.dispatch("visited", startNode);
  EventEmitter.dispatch("visited", stopNode);

  let shortestDistance, prev;

  while (queue1.length > 0 || queue2.length > 0) {
    let temp = shortestPathBfs(
      queue1,
      visited1,
      visited2,
      previous1,
      previous2,
      forbidden
    );

    shortestDistance = temp ? temp.shortestDistance : null;
    prev = temp ? temp.prev : null;

    if (shortestDistance !== null && prev !== null) {
      return { distance: shortestDistance, path: prev };
    }
    temp = shortestPathBfs(
      queue2,
      visited2,
      visited1,
      previous2,
      previous1,
      forbidden
    );

    shortestDistance = temp ? temp.shortestDistance : null;
    prev = temp ? temp.prev : null;

    if (shortestDistance !== null && prev !== null) {
      return { distance: shortestDistance, path: prev };
    }
  }
  return { distance: "Infinity", path: null };
};

export default bidirectionalbfs;
