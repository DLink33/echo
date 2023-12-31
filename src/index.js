import { Game } from "./components/Game.js";
import { loadSpriteBoard } from "./display.js";

var cardSpriteBoardImgPath = "src/assets/echo-cards-test.png";

console.log("Loading Sprite Board...");
try {
  const spriteMap = await loadSpriteBoard(cardSpriteBoardImgPath, 5, 13);
  console.log("Sprite Board:");
  console.log(spriteMap);
} catch (error) {
  console.log(error);
}
console.log("Sprite Board Loaded");

console.log("Game Start...");
const game = new Game();
game.run();
console.log("Game Over");
