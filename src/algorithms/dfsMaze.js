import Graph from "../graph";
import { EventEmitter } from "../events";

const graph = Graph.directed;

const randomNeighbour = (node, visited, count, checked) => {
  let keys = [],
    i = parseInt(node);

  if (i - 2 >= 0 && Math.floor((i - 2) / 70) >= Math.floor(i / 70)) {
    keys.push(i - 2);
  }

  if (Math.floor((i + 2) / 70) <= Math.floor(i / 70)) {
    keys.push(i + 2);
  }

  if (i - 140 >= 0) keys.push(i - 140);

  if (i + 140 < 2100) keys.push(i + 140);

  if (keys.length > 0) {
    let random =
      keys.length === 1 ? 0 : Math.floor((Math.random() * 10) % keys.length);

    while (true && count <= keys.length) {
      if (!visited.includes(String(keys[random]))) {
        //count++;
        break;
      } else {
        if (!checked.includes(String(keys[random]))) {
          checked.push(String(keys[random]));
        }
        count++;
        random =
          keys.length === 1
            ? 0
            : Math.floor((Math.random() * 10) % keys.length);
      }
    }

    if (count <= keys.length) {
      return keys[random];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const checkPixel = (node) => {
  let i = parseInt(node);
  // if (Math.floor(i / 70) % 2 === 1 && i % 2 === 1) {
  //   return true;
  if (Math.floor(i / 70) % 2 === 0 && i % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

const createMaze = (node, visited) => {
  visited.push(String(node));

  let count = 0,
    checked = [];

  let currentNode = randomNeighbour(node, visited, count, checked);

  while (currentNode !== null) {
    //console.log(currentNode);

    if (checkPixel(currentNode)) {
      if (parseInt(currentNode) === parseInt(node) - 2)
        EventEmitter.dispatch("hole", String(parseInt(node) - 1));
      else if (parseInt(currentNode) === parseInt(node) + 2)
        EventEmitter.dispatch("hole", String(parseInt(node) + 1));
      else if (parseInt(currentNode) === parseInt(node) - 140)
        EventEmitter.dispatch("hole", String(parseInt(node) - 70));
      else EventEmitter.dispatch("hole", String(parseInt(node) + 70));

      createMaze(currentNode, visited);
    }

    currentNode = randomNeighbour(node, visited, count, checked);
  }
  return;
};

const dfsMaze = () => {
  console.log("called");
  let visited = [];
  //console.log((randomNeighbour("2099", [], 0, [])));

  createMaze("0", visited);

  for (let i = 0; i < 2100; ++i) {
    // if (Math.floor(i / 70) % 2 === 1 && i % 2 === 1) {
    //   EventEmitter.dispatch("hole", String(i));
    if (Math.floor(i / 70) % 2 === 0 && i % 2 === 0) {
      EventEmitter.dispatch("hole", String(i));
    } else {
      continue;
    }
  }
};

export default dfsMaze;
