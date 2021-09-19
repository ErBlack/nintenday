import { writable } from "svelte/store";

export const V = {
  top: true,
  bottom: false,
};

export const H = {
  left: true,
  right: false,
};

export const started = writable(true);

export const eggs = writable([]);
export const chickens = writable([]);

export const basketH = writable(H.left);
export const basketV = writable(V.top);

export const score = writable(0);
export const fails = writable(0);
