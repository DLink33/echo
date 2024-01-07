export function radsToDeg(rads) {
  return Math.trunc((rads * 180) / Math.PI);
}

export function degToRads(deg) {
  return (deg * Math.PI) / 180;
}

export function randFloat(max, min) {
  return Math.random() * (max - min + 1) + min;
}

export function randInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const interpolationFuncs = {
  linear: (f) => f,
  easeInQuad: (f) => f * f,
  easeOutQuad: (f) => f * (2 - f),
  easeInOutQuad: (f) => (f < 0.5 ? 2 * f * f : -1 + (4 - 2 * f) * f),
  easeInCubic: (f) => f * f * f,
  easeOutCubic: (f) => --f * f * f + 1,
  easeInOutCubic: (f) =>
    f < 0.5 ? 4 * f * f * f : (f - 1) * (2 * f - 2) * (2 * f - 2) + 1,
  easeInQuart: (f) => f * f * f * f,
  easeOutQuart: (f) => 1 - --f * f * f * f,
  easeInOutQuart: (f) =>
    f < 0.5 ? 8 * f * f * f * f : 1 - 8 * --f * f * f * f,
  easeInQuint: (f) => f * f * f * f * f,
  easeOutQuint: (f) => 1 + --f * f * f * f * f,
  easeInOutQuint: (f) =>
    f < 0.5 ? 16 * f * f * f * f * f : 1 + 16 * --f * f * f * f * f,
  easeInExpo: (f) => (f === 0 ? 0 : Math.pow(2, 10 * (f - 1))),
  easeOutExpo: (f) => (f === 1 ? 1 : 1 - Math.pow(2, -10 * f)),
  easeInOutExpo: (f) =>
    f === 0
      ? 0
      : f === 1
      ? 1
      : f < 0.5
      ? Math.pow(2, 10 * (2 * f - 1)) / 2
      : (2 - Math.pow(2, -10 * (2 * f - 1))) / 2,
  easeInSin: (f) => 1 + Math.sin((Math.PI / 2) * f - Math.PI / 2),
  easeOutSin: (f) => Math.sin((Math.PI / 2) * f),
  easeInOutSin: (f) => (1 + Math.sin(Math.PI * f - Math.PI / 2)) / 2,
};
