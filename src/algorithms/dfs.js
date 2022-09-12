import { EventEmitter } from "../events";
const Graph = require("../graph");

let graph = Graph.undirected,
  flag = false;

const search = (node, endNode, visited, forbidden, pred) => {
  visited.push(String(node));
  EventEmitter.dispatch("visited", node);
  const arr = Object.keys(graph[node]);
  for (let i = 0; i < arr.length; ++i) {
    if (
      !visited.includes(String(arr[i])) &&
      !forbidden.includes(String(arr[i]))
    ) {
      pred[String(arr[i])] = node;
      if (String(arr[i]) === String(endNode) || flag) {
        flag = true;
        break;
      }
      search(String(arr[i]), endNode, visited, forbidden, pred);
    }
  }
};

const dfs = (startNode, endNode, forbidden) => {
  // console.log(forbidden);
  let visited = [],
    pred = {},
    answer = [];

  pred[String(startNode)] = -1;

  search(startNode, endNode, visited, forbidden, pred);

  if (pred[String(endNode)]) {
    let crawl = endNode;
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

export default dfs;
