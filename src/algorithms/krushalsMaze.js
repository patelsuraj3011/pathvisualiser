import { EventEmitter } from "../events";
const MersennerTwister = require("mersenne-twister");

const generator = new MersennerTwister();

const randomNeighbour = (node, checked) => {
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

    while (true) {
      if (!checked.includes(parseInt(keys[random]))) {
        //count++;
        break;
      } else {
        random =
          keys.length === 1
            ? 0
            : Math.floor((Math.random() * 10) % keys.length);
      }
    }

    return keys[random];
  } else {
    return null;
  }
};

const find = (visited, node) => {
  if (visited[parseInt(node)].parent !== parseInt(node))
    visited[parseInt(node)].parent = find(
      visited,
      visited[parseInt(node)].parent
    );

  return visited[parseInt(node)].parent;
};

const Union = (visited, x, y) => {
  let xroot = find(visited, x);
  let yroot = find(visited, y);

  if (visited[xroot].rank < visited[yroot].rank) visited[xroot].parent = yroot;
  else if (visited[xroot].rank > visited[yroot].rank)
    visited[yroot].parent = xroot;
  else {
    visited[yroot].parent = xroot;
    visited[xroot].rank++;
  }
};

const getNumOfNeighbours = (node) => {
  let i = parseInt(node),
    count = 0;

  if (i - 2 >= 0 && Math.floor((i - 2) / 70) >= Math.floor(i / 70)) {
    count++;
  }

  if (Math.floor((i + 2) / 70) <= Math.floor(i / 70)) {
    count++;
  }

  if (i - 140 >= 0) count++;

  if (i + 140 < 2100) count++;

  return count;
};

const checkPixel = (node) => {
  let i = parseInt(node);
 // if (Math.floor(i / 70) % 2 === 1 && i % 2 === 1) {
    //return true;
  if (Math.floor(i / 70) % 2 === 0 && i % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

const krushalsMaze = () => {
  let visited = new Array(2100);
  let random = Math.floor(generator.random() * 2100),
    totalCount = 1;

  for (let i = 0; i < 2100; ++i) {
    visited[i] = {
      arr: [],
      parent: i,
      rank: 0,
    };
  }

  while (totalCount < 525) {
    if (
      visited[random].arr.length < getNumOfNeighbours(random) &&
      checkPixel(random)
    ) {
      //console.log(totalCount);
      const randomEdge = randomNeighbour(
        String(random),
        visited[random].arr
      );

      if (randomEdge !== null) {
        const x = find(visited, random);
        const y = find(visited, parseInt(randomEdge));

        if (x !== y) {
          EventEmitter.dispatch("hole", String(random));

          if (parseInt(randomEdge) === random - 2)
            EventEmitter.dispatch("hole", String(random - 1));
          else if (parseInt(randomEdge) === random + 2)
            EventEmitter.dispatch("hole", String(random + 1));
          else if (parseInt(randomEdge) === random - 140)
            EventEmitter.dispatch("hole", String(random - 70));
          else EventEmitter.dispatch("hole", String(random + 70));

          EventEmitter.dispatch("hole", String(randomEdge));

          // visited[random].arr.push(parseInt(randomEdge));
          // totalCount++;
          Union(visited, x, y);
        }

        visited[random].arr.push(parseInt(randomEdge));
        totalCount++;
      }
    }
    random = Math.floor(generator.random() * 2100);
  }

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

export default krushalsMaze;
