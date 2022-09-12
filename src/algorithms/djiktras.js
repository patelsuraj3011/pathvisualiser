import { EventEmitter } from "../events";
import Graph from "../graph";

const shortestDistanceNode = (distances, visited) => {

  let shortest = null;

  for (let node in distances) {
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];
    if (currentIsShortest && !visited.includes(node)) {
      shortest = node;
    }
  }
  return shortest;
};

const findShortestPath = (startNode, endNode, forbidden) => {
  //return new Promise((resolve, reject) => {
    let graph = Graph.undirected;

    let distances = {};
    distances[endNode] = "Infinity";
    //distances = Object.assign(distances, graph[startNode]);

    Object.keys(graph[startNode]).forEach(key => {
      if(!forbidden.includes(key)) {
        distances[key] = 1;
      }
    })

    let parents = { endNode: null };
    for (let child in graph[startNode]) {
      parents[child] = startNode;
    }

    let visited = [];

    let node = shortestDistanceNode(distances, visited);
    EventEmitter.dispatch("visited", String(node));

    //console.log(node);
    while (node) {

      let distance = distances[node];
      let children = graph[node];

      for (let child in children) {
        if (String(child) === String(startNode) || forbidden.includes(String(child))) {
          continue;
        } else {
          let newdistance = distance + children[child];

          if (!distances[child] || distances[child] > newdistance) {
            distances[child] = newdistance;
            parents[child] = node;
          }
        }
      }
      visited.push(node);
      // console.log("dijktras visited", node);
      //console.log("dijktras done", node);

      if(String(node) === String(endNode)) {
        EventEmitter.dispatch("visited", String(node));
        break;
      }

      EventEmitter.dispatch("visited", String(node));

      node = shortestDistanceNode(distances, visited);
      if(distances[node] === "Infinity")
        break;
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
      path: distances[endNode] === "Infinity" ? [] : shortestPath,
    };

    //resolve(results);
    return results;
  //});
};

export default findShortestPath;
