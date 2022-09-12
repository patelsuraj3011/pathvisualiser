import { EventEmitter } from "../events";
const MersennerTwister = require("mersenne-twister");

const randomNeighbour = (node, visited) => {
  let keys = [],
    i = parseInt(node),
    count = 0;

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

    while (true && count < keys.length) {
      if (!visited.includes(parseInt(keys[random]))) {
        //count++;
        break;
      } else {
        count++;
        random =
          keys.length === 1
            ? 0
            : Math.floor((Math.random() * 10) % keys.length);
      }
    }
    if (count < keys.length) {
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

const primsMaze = () => {
  const generator = new MersennerTwister();

  let visited = [];

  let random = Math.floor(generator.random() * 2100);

  while (visited.length < 525) {
    if (checkPixel(random)) {
      //console.log(visited.length);
      const neighbour = randomNeighbour(random, visited);

      if (neighbour !== null) {
        EventEmitter.dispatch("hole", String(random));

        if (parseInt(neighbour) === random - 2)
          EventEmitter.dispatch("hole", String(random - 1));
        else if (parseInt(neighbour) === random + 2)
          EventEmitter.dispatch("hole", String(random + 1));
        else if (parseInt(neighbour) === random - 140)
          EventEmitter.dispatch("hole", String(random - 70));
        else EventEmitter.dispatch("hole", String(random + 70));

        EventEmitter.dispatch("hole", String(neighbour));
      }

      visited.push(random);
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

export default primsMaze;
