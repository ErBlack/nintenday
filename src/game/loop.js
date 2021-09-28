import { Egg } from './models/Egg';
import { Chicken } from './models/Chicken';
import { get } from 'svelte/store';
import { eggs, chickens, score, fails, playing } from './store';
import { BREAK, SPEED } from './const';
import random from '../lib/random';
import { over } from './ost';
import { uploadScore } from './api';

let startTime;
let lastTime;
let loopId;
let spawnDelay;
let breakDelay;
let spawnDelayOffsetIndex;
let level;
let speedMultiplier;
let maxSpawnPreventChance;

const offsets = [0, 20, -20];

const getOffset = () => {
  const current = offsets[spawnDelayOffsetIndex];

  spawnDelayOffsetIndex = (spawnDelayOffsetIndex + 1) % 3;

  return current;
};

const shouldSpawn = (chance) => !(random(0, chance) % chance);

export const start = () => {
  stop();

  startTime = Date.now();
  lastTime = startTime;

  spawnDelay = 0;
  spawnDelayOffsetIndex = 0;

  breakDelay = BREAK;

  eggs.set([]);
  score.set(0);
  fails.set(0);

  level = 1;
  maxSpawnPreventChance = 6;
  speedMultiplier = 1;

  loopId = requestAnimationFrame(tick);
  playing.set(true);
};

export const stop = () => {
  cancelAnimationFrame(loopId);
  playing.set(false);
};

const tick = () => {
  const newTime = Date.now();
  const dt = newTime - lastTime;
  const newChickens = get(chickens).filter((chicken) => {
    chicken.tick(dt);

    return !chicken.done;
  });

  if (breakDelay < 0) {
    let newScore = get(score);
    let newFails = get(fails);
    let newEggs = [];

    for (const egg of get(eggs)) {
      egg.tick(dt);

      if (egg.done) {
        if (egg.success) {
          newScore += 1;
        } else {
          newFails += 1;

          if (newFails === 3) {
            uploadScore(newScore);
            over.currentTime = 0;
            over.play();
          }

          newChickens.push(new Chicken(egg.d === 0 || egg.d === 3 ? 0 : 1));
          breakDelay = BREAK;
          newEggs = [];
          break;
        }
      } else {
        newEggs.push(egg);
      }
    }

    updateLevel(newScore);

    spawnDelay -= dt;
    if (spawnDelay <= 0 && newFails < 3) {
      if (
        newEggs.length < level &&
        shouldSpawn(Math.min(1 + newEggs.length, maxSpawnPreventChance))
      ) {
        newEggs.push(new Egg());
      }

      spawnDelay =
        SPEED * speedMultiplier + getOffset() * Math.min(newEggs.length + 1, 2);
    }

    eggs.set(newEggs);
    score.set(newScore);
    fails.set(newFails);
  } else {
    breakDelay -= dt;
  }

  chickens.set(newChickens);

  lastTime = newTime;
  loopId = requestAnimationFrame(tick);
};

const updateLevel = (score) => {
  if (score < 5) {
    level = 1;
    maxSpawnPreventChance = 6;
    speedMultiplier = 1;
  } else if (score < 15) {
    level = 2;
    maxSpawnPreventChance = 5;
    speedMultiplier = 1;
  } else if (score < 30) {
    level = 3;
    maxSpawnPreventChance = 4;
    speedMultiplier = 0.95;
  } else if (score < 50) {
    level = 5;
    maxSpawnPreventChance = 3;
    speedMultiplier = 0.9;
  } else if (score < 100) {
    level = 10;
    maxSpawnPreventChance = 2;
    speedMultiplier = 0.85;
  } else {
    level = 16;
    maxSpawnPreventChance = 1;
    speedMultiplier = 0.8;
  }
};
