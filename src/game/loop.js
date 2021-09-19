import { Egg } from "./models/Egg";
import { Chicken } from "./models/Chicken";
import { get } from "svelte/store";
import { eggs, chickens, score, fails } from "./store";
import { BREAK, SPEED } from "./const";
import random from "../lib/random";

let startTime;
let lastTime;
let loopId;
let spawnOffset;
let breakOffset;
let level = 1;

const getSpawnOffset = () => {
  return SPEED * random(1, 3) + random(0, SPEED);
};

export const start = () => {
  startTime = Date.now();
  lastTime = startTime;

  spawnOffset = getSpawnOffset();
  breakOffset = BREAK;

  eggs.set([]);
  score.set(0);
  fails.set(0);
  level = 1;

  loopId = requestAnimationFrame(tick);
};

export const stop = () => {
  cancelAnimationFrame(loopId);
};

const tick = () => {
  const newTime = Date.now();
  const dt = newTime - lastTime;

  if (breakOffset < 0) {
    let newScore = get(score);
    let newFails = get(fails);
    let newEggs = [];

    const newChickens = get(chickens).filter((chicken) => {
      chicken.tick(dt);

      return !chicken.done;
    });

    for (const egg of get(eggs)) {
      egg.tick(dt);

      if (egg.done) {
        if (egg.success) {
          newScore += 1;
        } else {
          newFails += 1;

          newChickens.push(new Chicken(egg.d === 0 || egg.d === 3 ? 0 : 1));
          breakOffset = BREAK;
          newEggs = [];
          break;
        }
      } else {
        newEggs.push(egg);
      }
    }

    if (newScore < 5) {
      level = 1;
    } else if (newScore < 15) {
      level = 2;
    } else {
      level = 3;
    }

    spawnOffset -= dt;
    if (spawnOffset <= 0) {
      spawnOffset = getSpawnOffset();

      if (newFails < 3 && newEggs.length < level) {
        newEggs.push(new Egg());
      }
    }

    eggs.set(newEggs);
    chickens.set(newChickens);
    score.set(newScore);
    fails.set(newFails);
  } else {
    breakOffset -= dt;
  }

  lastTime = newTime;
  loopId = requestAnimationFrame(tick);
};
