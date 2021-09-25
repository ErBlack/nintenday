function loadSound(src) {
  const audio = new Audio();
  Object.assign(audio, {
    preload: true,
    src: src,
  });

  return audio;
}

export const s1 = loadSound('/nintenday/1.mp3');
export const s2 = loadSound('/nintenday/2.mp3');
export const s3 = loadSound('/nintenday/3.mp3');
export const s4 = loadSound('/nintenday/4.mp3');
export const c = loadSound('/nintenday/c.mp3');
export const fail = loadSound('/nintenday/fail.mp3');
export const over = loadSound('/nintenday/over.mp3');
export const score = loadSound('/nintenday/score.mp3');

export const initSound = () => {
  [s1, s2, s3, s4, c, fail, over, score].forEach((audio) => {
    audio.play();
    audio.pause();
  });
};
