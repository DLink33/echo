import { degToRads } from './utils.js';

var CARD_COLORS = ['red', 'blue', 'green', 'yellow'];
var SPECIAL_CARD_NAMES = ['back1', 'back2', 'wild', 'wild4'];
var CARD_SYMBOLS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+2',
  'X',
  '<->',
];

var SPRITE_MAP;

export function loadSpriteBoard(spriteBoardImgPath, numRows, numCols) {
  return new Promise((resolve, reject) => {
    try {
      const spriteBoard = new Image();
      spriteBoard.src = spriteBoardImgPath;
      spriteBoard
        .decode()
        .then(() => {
          // Wait for the image to be fully loaded
          let spriteMap = {};
          let spriteWidth = spriteBoard.width / numCols;
          let spriteHeight = spriteBoard.height / numRows;

          // Adds the first row of special sprites to the map
          for (let k = 0; k < 4; k++) {
            let name = `${SPECIAL_CARD_NAMES[k]}`;
            let x = k * spriteWidth;
            let y = 0;
            spriteMap[name] = {
              spriteBoard,
              x,
              y,
              spriteWidth,
              spriteHeight,
            };
          }

          // Adds the rest of the sprites to the map
          for (let i = 1; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              let name = `${CARD_COLORS[i - 1]}${CARD_SYMBOLS[j]}`;
              let x = j * spriteWidth;
              let y = i * spriteHeight;
              spriteMap[name] = {
                spriteBoard,
                x,
                y,
                spriteWidth,
                spriteHeight,
              };
            }
          }

          SPRITE_MAP = spriteMap;
          console.log(SPRITE_MAP); // for debugging
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export const getCanvasCtx = () => {
  const canvas = document.getElementById('display');
  const ctx = canvas.getContext('2d');
  return ctx;
};

export function drawCard(Card) {
  const ctx = getCanvasCtx();
  let key;
  if (Card.faceUp) {
    if (SPECIAL_CARD_NAMES.includes(Card.type)) {
      key = `${Card.type}`;
    } else {
      key = `${Card.color}${Card.symbol}`;
    }
  } else {
    key = 'back1';
    //key = "back2"; // if a alternate back design is desired
  }
  let sprite = SPRITE_MAP[key];
  ctx.save();
  ctx.translate(Card.pos.x, Card.pos.y);
  ctx.rotate(degToRads(Card.pos.theta));
  ctx.drawImage(
    sprite.spriteBoard,
    sprite.x,
    sprite.y,
    sprite.spriteWidth,
    sprite.spriteHeight,
    -sprite.spriteWidth / 2,
    -sprite.spriteHeight / 2,
    sprite.spriteWidth,
    sprite.spriteHeight
  );
  ctx.restore();
}

export function clearCanvas(width = 500, height = 500) {
  const ctx = getCanvasCtx();
  ctx.clearRect(0, 0, width, height);
}

export class Transform {
  constructor() {
    this.start = null;
    this.current = null;
    this.dest = null;
    this.startTime = null;
    this.duration = null;
    this.interpolMethod = null;
  }
  setMove(start, dest, dur, interpol) {
    this.startTime = performance.now();
    this.startPos = start;
    this.current = start;
    this.dest = { x: dest.x, y: dest.y, theta: dest.theta };
    this.duration = dur;
    this.interpolMethod = interpol;
  }
  updateCurrent() {
    const elapsedTime = performance.now() - this.startTime;
    let progress = elapsedTime / this.duration;
    if (progress >= 1) {
      this.current = this.dest;
      this.resetMove();
    } else {
      progress = this.interpolMethod(progress);
      let [x, y, theta] = [
        this.startPos.x + (this.dest.x - this.startPos.x) * progress,
        this.startPos.y + (this.dest.y - this.startPos.y) * progress,
        this.startPos.theta +
          (this.dest.theta - this.startPos.theta) * progress,
      ];
      this.current = { x, y, theta };
    }
  }
  resetMove() {
    this.start = null;
    this.dest = null;
    this.startTime = null;
    this.duration = null;
    this.interpolMethod = null;
  }
}
