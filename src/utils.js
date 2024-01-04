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
