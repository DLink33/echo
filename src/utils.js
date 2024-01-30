export function radsToDeg(rads) {
  return Math.trunc((rads * 180) / Math.PI);
}

export function degToRads(deg) {
  return (deg * Math.PI) / 180;
}

export function randFloat(max, min) {
  return Math.random() * (max - min + 1) + min;
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCanvasSize() {
  const canvas = document.getElementById('display');
  if (canvas) {
    return { width: canvas.width, height: canvas.height };
  } else {
    console.error('Canvas element not found');
    return { width: 0, height: 0 };
  }
}

export function arraySort(
  array,
  attribute,
  reverse = false,
  customOrder = null
) {
  function swap(array, index1, index2) {
    let temp = array[index2];
    array[index2] = array[index1];
    array[index1] = temp;
  }
  function getNestedProperty(obj, attribute) {
    return attribute.split('.').reduce((o, k) => o && o[k], obj);
  }
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      let curr = getNestedProperty(array[j], attribute);
      let next = getNestedProperty(array[j + 1], attribute);
      let comparison;
      if (customOrder) {
        comparison = customOrder.indexOf(curr) - customOrder.indexOf(next);
      } else {
        comparison = curr > next ? 1 : -1;
      }
      reverse ? (comparison *= -1) : null;
      comparison > 0 ? swap(array, j, j + 1) : null;
    }
  }
}

export const isSorted = (subArray, reverse = reverse) => {
  let len = subArray.length;
  let cond, c, n;
  for (let i = 0; i < len - 1; i++) {
    c = subArray[i];
    n = subArray[i + 1];
    if (reverse) {
      cond = c <= n;
    } else {
      cond = c > n;
    }
    if (cond) {
      return false;
    }
    return true;
  }
};

export const bubbleSort = (array, reverse = false) => {
  const swap = (array, i1, i2) => {
    let t = array[i2];
    array[i2] = array[i1];
    array[i1] = t;
  };
  let len = array.length;
  let c, n;
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      c = array[j];
      n = array[j + 1];
      reverse
        ? c <= n
          ? swap(array, j, j + 1)
          : null
        : c > n
          ? swap(array, j, j + 1)
          : null;
    }
  }
};

export function getCanvasDimensions() {
  return getCanvasSize();
}

export const delay = async (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
  easeInExp: (f) => (f === 0 ? 0 : Math.pow(2, 10 * (f - 1))),
  easeOutExp: (f) => (f === 1 ? 1 : 1 - Math.pow(2, -10 * f)),
  easeInOutExp: (f) =>
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
