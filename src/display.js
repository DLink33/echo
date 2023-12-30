export async function loadSpriteBoard(spriteBoardImgPath, numRows, numCols) {
  return new Promise((resolve, reject) => {
    const spriteBoard = new Image();
    spriteBoard.onload = () => {
      const spriteBoard = new Image();
      let colors = ["red", "blue", "green", "yellow"];
      let spriteMap = {};
      spriteBoard.src = spriteBoardImgPath;
      let rows = numRows;
      let cols = numCols;
      let spriteWidth = spriteBoard.width / cols;
      let spriteHeight = 100;
      let n = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; i++) {
          let name = `${colors[i]}${j}`;
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
    };
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
