import { EventEmitter } from "../events";
const Graph = require("../graph");

const bfs = (startNode, endNode, forbidden) => {
  const tree = Graph.undirected;
  let queue = [],
    visited = [],
    keys = [];
  queue.push(tree[startNode]);

  let dist = new Array(2100);
  let pred = new Array(2100);

  dist[startNode] = 0;
  pred[startNode] = -1;

  visited.push(String(startNode));
  keys.push(String(startNode));

  let answer = [];

  while (queue.length > 0) {
    EventEmitter.dispatch("visited", String(keys[0]));

    if (keys[0] === String(endNode)) {
      break;
    }

    Object.keys(queue[0]).forEach((key) => {
      if (
        String(key) !== String(startNode) &&
        !visited.includes(String(key)) &&
        !forbidden.includes(String(key))
      ) {
        //console.log(key);
        visited.push(String(key));
        keys.push(String(key));
        dist[key] = dist[keys[0]] + 1;
        pred[key] = keys[0];

        // if (String(key) === String(endNode)) {
        //   console.log("Found it!");
        // }

        queue.push(tree[key]);
      }
    });

    queue.shift();
    keys.shift();
  }

  if (keys.includes(endNode)) {
    let crawl = parseInt(endNode);
    answer.push(endNode);
    while (pred[crawl] !== -1) {
      answer.push(pred[crawl]);
      crawl = pred[crawl];
    }
    return { distance: answer.length, path: answer };
  } else {
    return { distance: "Infinity", path: answer };
  }
};

export default bfs;
