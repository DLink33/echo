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

// NOTE: The drawPile cards are randomized, but they are being drawn on the canvas in the order that they were added to the actor array
//SOLUTION: Need to add cards to the actor array in the same order that they are added to the drawPile array

//TODO: Need to create methods for properly displaying (moving) cards in player's hand as they are being dealt

//TODO: Need to make sure that the users hand is displayed properly (different from non-user hands)

//this.dealCards(this.handSize);
