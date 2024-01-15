import { Game } from './components/game.js';
import { loadSpriteBoard } from './display.js';

var cardSpriteBoardImgPath = 'src/assets/echo-cards.png';

console.log('Loading Sprite Board...');
try {
  await loadSpriteBoard(cardSpriteBoardImgPath, 5, 13);
} catch (error) {
  console.log(error);
}
console.log('Sprite Board Loaded');

console.log('Game Start...');
const game = new Game();
window.game = game; // for debugging
game.flipAllCards();
game.run();
console.log('Game End');
