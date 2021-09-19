import { writable } from "svelte/store";

export const V = {
    top: true,
    bottom: false
}

export const H = {
  left: true,
  right: false,
};

export const started = writable(false);

export const basketH = writable(H.left);
export const basketV = writable(V.top);