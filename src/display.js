import { degToRads } from "./utils.js";

var CARD_COLORS = ["red", "blue", "green", "yellow"];
var SPECIAL_CARD_NAMES = ["back1", "back2", "wild", "wild4"];
var CARD_NAMES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "draw2",
  "skip",
  "reverse",
];

var SPRITE_MAP;

export async function loadSpriteBoard(spriteBoardImgPath, numRows, numCols) {
  return new Promise(async (resolve, reject) => {
    try {
      const spriteBoard = new Image();
      spriteBoard.src = spriteBoardImgPath;
      await spriteBoard.decode(); // Wait for the image to be fully loaded

      let spriteMap = {};
      let spriteWidth = spriteBoard.width / numCols;
      let spriteHeight = spriteBoard.height / numRows;

      // Adds the first row of special sprites to the map
      for (let k = 0; k < 5; k++) {
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
        for (let j = 5; j < numCols; j++) {
          let name = `${CARD_COLORS[i - 1]}${CARD_NAMES[j]}`;
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
      console.log(SPRITE_MAP);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export const getCanvasCtx = () => {
  const canvas = document.getElementById("display");
  const ctx = canvas.getContext("2d");
  return ctx;
};

export function drawCard(Card) {
  const ctx = getCanvasCtx();
  let key;
  if (Card.faceUp) {
    //TODO: Need to get the correct sprite based on the card's color and symbol when it's face up
    key = `${Card.color}${Card.symbol}`;
  } else {
    key = "back1";
    //key = "back2";
    let sprite = SPRITE_MAP[key];
    ctx.rotate(degToRads(Card.theta));
    ctx.translate(Card.x, Card.y);
    ctx.drawImage(
      sprite.spriteBoard,
      sprite.x,
      sprite.y,
      sprite.spriteWidth,
      sprite.spriteHeight,
      Card.x,
      Card.y,
      sprite.spriteWidth,
      sprite.spriteHeight
    );
    ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix
  }
}

export function drawPlayer(Player) {
  const ctx = getCanvasCtx();
}

export function drawDeck(Deck) {
  const ctx = getCanvasCtx();
}

export function clearCanvas(width = 500, height = 500) {
  const ctx = getCanvasCtx();
  ctx.clearRect(0, 0, width, height);
}

export function drawSprite(name, x, y) {
  const ctx = getCanvasCtx();
  ctx.drawImage(images.name, x, y);
}
