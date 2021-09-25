import { get } from 'svelte/store';
import random from '../../lib/random';
import { SPEED } from '../const';
import { basketV, basketH, H, V } from '../store';
import { s1, s2, s3, s4, score, fail } from '../ost';

const getOst = (d) => {
  switch (d) {
    case 0:
      return s1;
    case 1:
      return s2;
    case 2:
      return s3;
    case 3:
      return s4;
  }
};

export class Egg {
  constructor() {
    this.d = random(0, 4);

    this.pik = getOst(this.d).cloneNode();
    this.score = score.cloneNode();
    this.fail = fail.cloneNode();

    this.s = 0;
    this.timeout = SPEED;
    this.done = false;
    this.success = null;

    this.play(this.pik);
  }
  tick(dt) {
    if (this.done) return;

    this.timeout -= dt;

    if (this.timeout < 0) {
      this.s += 1;

      this.timeout = SPEED;

      if (this.s <= 4) {
        this.play(this.pik);
      }
    }

    if (this.s > 4) {
      const v = get(basketV);
      const h = get(basketH);

      this.done = true;
      this.success =
        (this.d === 0 || this.d === 1 ? v === V.top : v === V.bottom) &&
        (this.d === 0 || this.d === 3 ? h === H.left : h === H.right);

      this.play(this.success ? this.score : this.fail);

      this.pik = null;
      this.score = null;
      this.fail = null;
    }
  }
  play(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
