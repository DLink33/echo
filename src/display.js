//Load Sprite Board
const spriteBoard = new Image();
let colors = ["red", "blue", "green", "yellow"];
let spriteMap = {};
spriteBoard.src = "./assets/echo-cards-test.png";

//When Sprite Board is loaded, create sprite mapping
SpriteBoard.onload = () => {
  let rows = 5;
  let cols = 13;
  let spriteWidth = 71;
  let spriteHeight = 100;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; i++) {
      let name = `${i}${j}`;
      let x = j * spriteWidth;
      let y = i * spriteHeight;
      spriteMap[name] = { x, y };
    }
  }
};

export const getCanvasCtx = () => {
  const canvas = document.getElementById("display");
  const ctx = canvas.getContext("2d");
  return ctx;
};

export function drawCard(Card) {
  const ctx = getCanvasCtx();
}

export function drawPlayer(Player) {
  const ctx = getCanvasCtx();
}

export function drawDeck(Deck) {
  const ctx = getCanvasCtx();
}

export function drawPile() {
  const ctx = getCanvasCtx();
}

export function clearCanvas(width, height) {
  const ctx = getCanvasCtx();
  ctx.clearRect(0, 0, width, height);
}

export function drawSprite(name, x, y) {
  const ctx = getCanvasCtx();
  ctx.drawImage(images.name, x, y);
}
