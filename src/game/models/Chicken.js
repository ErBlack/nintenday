import { SPEED } from "../const";

export class Chicken {
  constructor(d) {
    this.d = d;
    this.s = 0;
    this.timeout = SPEED;
    this.done = false;
  }
  tick(dt) {
    if (this.done) return;

    this.timeout -= dt;

    if (this.timeout < 0) {
      this.s += 1;
      this.timeout = SPEED;
    }

    if (this.s > 4) {
      this.done = true;
    }
  }
}
