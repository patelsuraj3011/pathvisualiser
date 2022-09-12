import { EventEmitter } from "../events";
import Graph from "../graph";

const shortestDistanceNode = (priorities, visited) => {
  let lowestPriority = null;
  for (let node in priorities) {
    let currentIsShortest =
      lowestPriority === null || priorities[node] < priorities[lowestPriority];
    if (currentIsShortest && !visited.includes(node)) {
      lowestPriority = node;
    }
  }

  return lowestPriority;
};

const heuristic = (start, end) => {
  const startx = parseInt(start) % 70,
    starty = Math.floor(parseInt(start) / 70),
    endx = parseInt(end) % 70,
    endy = Math.floor(parseInt(end) / 70);
  const finaly = Math.abs(endy - starty),
    finalx = Math.abs(endx - startx);

  //const answer = Math.round(Math.sqrt((finaly * finaly) + (finalx * finalx)));
  const answer = finalx + finaly

  return answer*answer;
};

const aStar = (startNode, endNode, forbidden) => {
  const graph = Graph.undirected;

  let distances = {};

  distances[endNode] = "Infinity";

  Object.keys(graph[startNode]).forEach((key) => {
    if (!forbidden.includes(key)) {
      distances[key] = 1;
    }
  });

  let priorities = {};

  priorities[startNode] = heuristic(startNode, endNode);

  Object.keys(graph[startNode]).forEach((key) => {
    if (!forbidden.includes(key)) {
      priorities[key] = distances[key] + heuristic(key, endNode);
    }
  });

  let visited = [];

  let parents = { endNode: null };

  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  let node = shortestDistanceNode(priorities, visited);
  EventEmitter.dispatch("visited", String(node));

  //While there are nodes left to visit...
  while (node) {
    let distance = distances[node];
    let children = graph[node];

    for (let child in children) {
      if (
        String(child) === String(startNode) ||
        forbidden.includes(String(child)) ||
        visited.includes(child)
      ) {
        continue;
      } else {
        let newdistance = distance + children[child];

        if (!distances[child] || distances[child] > newdistance) {
          distances[child] = newdistance;
          parents[child] = node;
          priorities[child] = distances[child] + heuristic(child, endNode);
        }
      }
    }

    visited.push(node);
    EventEmitter.dispatch("visited", String(node));

    if (String(node) === String(endNode)) {
      break;
    }

    node = shortestDistanceNode(priorities, visited);
  }

  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };

  return results;
};

export default aStar;
