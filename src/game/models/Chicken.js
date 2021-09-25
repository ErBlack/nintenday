import { CHIKEN_SPEED } from '../const';
import { c } from '../ost';

export class Chicken {
  constructor(d) {
    this.d = d;

    this.pik = c.cloneNode();

    this.s = 0;
    this.timeout = CHIKEN_SPEED;
    this.done = false;

    this.play(this.pik);
  }
  tick(dt) {
    if (this.done) return;

    this.timeout -= dt;

    if (this.timeout < 0) {
      this.s += 1;
      this.timeout = CHIKEN_SPEED;

      if (this.s <= 4) {
        this.play(this.pik);
      }
    }

    if (this.s > 4) {
      this.done = true;
    }
  }
  play(sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
