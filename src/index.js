import { Game } from "./components/game.js";
import { loadSpriteBoard } from "./display.js";

var cardSpriteBoardImgPath = "./assets/echo-cards-test.png";

console.log("Loading Sprite Board...");
var spriteMap = await loadSpriteBoard(cardSpriteBoardImgPath, 5, 13);
console.log("Sprite Board Loaded");

console.log("Game start...");
const game = new Game();
game.run();
console.log("Game Over");
