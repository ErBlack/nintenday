import { writable } from "svelte/store";

export const V = {
  top: true,
  bottom: false,
};

export const H = {
  left: true,
  right: false,
};

export const open = writable(false);
export const playing = writable(false);

export const eggs = writable([]);
export const chickens = writable([]);

export const basketH = writable(H.left);
export const basketV = writable(V.top);

export const score = writable(0);
export const fails = writable(0);
