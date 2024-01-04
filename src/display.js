var CARD_COLORS = ["red", "blue", "green", "yellow"];
var CARD_NAMES = [
  "back1",
  "back2",
  "blank",
  "wild",
  "wild4",
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
  return new Promise((resolve, reject) => {
    const spriteBoard = new Image();
    spriteBoard.onload = () => {
      const spriteBoard = new Image();
      let spriteMap = {};
      spriteBoard.src = spriteBoardImgPath;
      let rows = numRows;
      let cols = numCols;
      let spriteWidth = spriteBoard.width / cols;
      let spriteHeight = spriteBoard.height / rows;
      //adds the first row of special sprites to the map
      for (let k = 0; k < 5; k++) {
        let name = `${CARD_NAMES[k]}`;
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
      //adds the rest of the sprites to the map
      for (let i = 1; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
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
      resolve(spriteMap);
    };
    spriteBoard.onerror = (error) => {
      reject(error);
    };
    spriteBoard.src = spriteBoardImgPath;
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
    //SPRITE_MAP;
    ctx.drawImage();
  } else {
    key = "back1";
    //key = 'back2';
    let val = SPRITE_MAP[key];
    ctx.drawImage(
      val.spriteBoard,
      val.x,
      val.y,
      val.spriteWidth,
      val.spriteHeight,
      Card.x,
      Card.y,
      val.spriteWidth,
      val.spriteHeight
    );
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
