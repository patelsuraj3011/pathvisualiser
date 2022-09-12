import { EventEmitter } from "../events";

const createMaze = (start, end, top, bottom) => {
  if (parseInt(start) + 2 <= parseInt(end)) {
    if (
      parseInt(start) + 7 >= parseInt(end) &&
      parseInt(start) + 2 <= parseInt(end) &&
      parseInt(top) + 3 <= parseInt(bottom)
    ) {
      let random = Math.floor(
        Math.random() * (parseInt(bottom) - parseInt(top)) + parseInt(top)
      );

      if (random === parseInt(top)) {
        random++;
      }

      for (let i = parseInt(start); i <= parseInt(end); ++i) {
        const wall = 70 * random + i;
        EventEmitter.dispatch("maze", wall);
      }

      let random2 = Math.floor(
        Math.random() * (parseInt(end) - parseInt(start) + 1) + parseInt(start)
      );
      const hole = random * 70 + random2;
      EventEmitter.dispatch("hole", String(hole));

      if (random === parseInt(bottom) - 1) {
        createMaze(start, end, top, String(random - 1));
      } else if (random === parseInt(top) + 1) {
        createMaze(start, end, String(random + 1), bottom);
      } else {
        createMaze(start, end, top, String(random - 1));
        createMaze(start, end, String(random + 1), bottom);
      }
    } else {
      let random = Math.floor(
        Math.random() * (parseInt(end) - parseInt(start)) + parseInt(start)
      );

      if (random === parseInt(start)) {
        random++;
      }

      for (let i = parseInt(top); i <= parseInt(bottom); ++i) {
        const wall = i * 70 + random;
        EventEmitter.dispatch("maze", wall);
      }

      let random2 = Math.floor(
        Math.random() * (parseInt(bottom) - parseInt(top) + 1) + parseInt(top)
      );
      let hole = random2 * 70 + random;
      EventEmitter.dispatch("hole", String(hole));

      random2 = Math.floor(
        Math.random() * (parseInt(bottom) - parseInt(top)) + parseInt(top)
      );
      hole = random2 * 70 + random;
      EventEmitter.dispatch("hole", String(hole));

      if (random === parseInt(end) - 1) {
        createMaze(start, String(random - 1), top, bottom);
      } else if (random === parseInt(start) + 1) {
        createMaze(String(random + 1), end, top, bottom);
      } else {
        createMaze(start, String(random - 1), top, bottom);
        createMaze(String(random + 1), end, top, bottom);
      }
    }
  }
};

const recursiveMaze = () => {
  createMaze("0", "69", "0", "29");
};

export default recursiveMaze;
