import { EventEmitter } from "../events";

const binaryTreeMaze = () => {
  for (let i = 0; i < 2100; ++i) {
    if (i % 70 === 0 && i / 70 === Math.floor(i / 70)) {
        continue;
      //EventEmitter.dispatch("maze", i);
    } else if (Math.floor(i / 70) === 29) {
        continue;
      //EventEmitter.dispatch("maze", i);
    } else {
      const random = Math.floor((Math.random()*10)%2);
      if (random === 0) {
        EventEmitter.dispatch("maze", i);
      }
    }
  }
};

export default binaryTreeMaze;
