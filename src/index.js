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
const game = new Game();
window.game = game; // for debugging
//game.flipAllCards();
game.run();
console.log('Game End');

// STATE OF DEV:
// Cards are now adjusting their position according to the number of cards in a hand.
// The hands are being centered properly on their respective sides of the canvas.
// There are now two ways for the dealer to deal cards: Batch and RR. The method is chosen randomly.
// Cards are flipped for the User Player

//TODO:
// I should have an adjustCardPosition method for draw and discard piles to show roughly that a piles is made up of a stack of cards.

// Add Echo Title to the Canvas or make special bg for the canvas (or both)
// Adjust card positions for User so they are easily visible. (Maybe make the hands for the non-user players slightly offscreen to increase clarity of the canvas

// I think I need a way of adjusting the Actors array in the game class.  Right now the cards are not being drawn int the right order for each player.  I would like to change this, but I need to reorder the the actor array, or I need to make the actor array carry more information about draw order.

// I'd like to add an animation for flipping cards. I need to think about how to do that.

// It's about time to implement events.  I need the ability for a player to "select" a card to play.

// After this, I will probably need to implement the logic for the rules of the game on each turn.
