import Game from "components/game";
import { loadSpriteBoard } from "./display";

var cardSpriteBoardImgPath = "./assets/echo-cards-test.png";

console.log("Loading Sprite Board...");
var spriteMap = await loadSpriteBoard(
  cardSpriteBoardImgPath,
  (numRows = 5),
  (numCols = 13)
);
console.log("Sprite Board Loaded");

console.log("Game start...");
const game = new Game();
game.run();
console.log("Game Over");
