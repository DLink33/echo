var COLORS = ["red", "blue", "green", "yellow"];
var NAMES = [
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
      let n = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let name = `${COLORS[i]}${NAMES[j]}`;
          let x = j * spriteWidth;
          let y = i * spriteHeight;
          spriteMap[name + "_" + n] = {
            spriteBoard,
            x,
            y,
            spriteWidth,
            spriteHeight,
          };
          n++;
        }
      }
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
  ctx.drawImage();
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
