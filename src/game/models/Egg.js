import { get } from "svelte/store";
import random from "../../lib/random";
import { SPEED } from "../const";
import { basketV, basketH, H, V } from "../store";

export class Egg {
  constructor() {
    this.d = random(0, 4);
    this.s = 0;
    this.timeout = SPEED;
    this.done = false;
    this.success = null;
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
      const v = get(basketV);
      const h = get(basketH);

      this.success =
        (this.d === 0 || this.d === 1 ? v === V.top : v === V.bottom) &&
        (this.d === 0 || this.d === 3 ? h === H.left : h === H.right);
    }
  }
}
