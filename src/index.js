import { Game } from './components/game.js';
import { loadSpriteBoard, loadBoardBg } from './display.js';

const cardSpriteBoardImgPath = 'src/assets/echo-cards.png';
const echoBackGroundImgPath = 'src/assets/echo-bg.png';

// Load the sprite board
console.log('Loading Sprite Board...');
try {
  await loadSpriteBoard(cardSpriteBoardImgPath, 5, 13);
} catch (error) {
  console.log(error);
}
console.log('Sprite Board Loaded');

// Load the background image
console.log('Loading Background...');
try {
  await loadBoardBg(echoBackGroundImgPath);
} catch (error) {
  console.log(error);
}
console.log('Background Loaded');

console.log('Game Start...');
const game = new Game(true);
window.game = game; // for debugging
game.run();
console.log('Game End');
