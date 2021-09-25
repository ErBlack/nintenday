import preload from "../lib/preloadImage";

const files = [
  "bp.png",
  "c1.png",
  "c2.png",
  "c3.png",
  "cl1.png",
  "cl2.png",
  "cl3.png",
  "cl4.png",
  "cr1.png",
  "cr2.png",
  "cr3.png",
  "cr4.png",
  "e.png",
  "ebl.png",
  "ebr.png",
  "game.webp",
  "wbl.png",
  "wbr.png",
  "whlb.png",
  "whlt.png",
  "whrb.png",
  "whrt.png",
];

const src = (name) => `/nintenday/${name}`;

export const assetsReady = Promise.all(files.map(src).map(preload));
