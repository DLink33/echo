import { Deck } from './deck.js';
import { Player } from './player.js';
import { getCanvasDimensions } from '../utils.js';

let DECK_SPACING = 10;
let CARD_WIDTH = 71;
//let CARD_HEIGHT = 100;
export class Echo {
  constructor(params = {}) {
    const {
      numPlayers = 2,
      handSize = 7,
      rounds = 1,
      trackScore = false,
    } = params || {};
    this.deck = new Deck({
      pos: {
        x: Math.ceil(
          (getCanvasDimensions().width - CARD_WIDTH - DECK_SPACING) / 2
        ),
        y: getCanvasDimensions().height / 2,
        theta: 0,
      },
    });
    this.players = [];
    this.numPlayers = numPlayers;
    this.handSize = handSize;
    this.rounds = rounds;
    this.trackScore = trackScore;
    this.currentPlayer = 0;
    this.direction = false; // true will mean CW, false will mean CCW
    this.winner = null;
    this.gameOver = false;
  }
  createPlayers(numPlayers) {
    // Calculate the position of each player's hand
    const calcPlayerPos = (playerNum) => {
      let canvasWidth = getCanvasDimensions().width;
      let canvasHeight = getCanvasDimensions().height;
      //let cardWidth = 71;
      let cardHeight = 100;
      let x = 0;
      let y = 0;
      let theta = 0;
      switch (playerNum) {
        case 0:
          x = canvasWidth / 2;
          y = canvasHeight - cardHeight / 2;
          theta = 0;
          break;
        case 1:
          x = canvasWidth - cardHeight / 2;
          y = canvasHeight / 2;
          theta = -90;
          break;
        case 2:
          x = canvasWidth / 2;
          y = cardHeight / 2;
          theta = 180;
          break;
        case 3:
          x = cardHeight / 2;
          y = canvasHeight / 2;
          theta = 90;
          break;
        default:
          x = 250;
          y = 375;
          theta = 45;
          break;
      }
      return { x, y, theta };
    };
    // Create all necessary players
    for (let i = 0; i < this.numPlayers; i++) {
      let pos1 = calcPlayerPos(i);
      let currentPlayer = new Player({
        name: `Player ${i + 1}`,
        pos: pos1,
      });
      this.players.push(currentPlayer);
    }
    // Set the adjacent players for each player (i.e. which players are directly to the left and
    // right of the current player
    for (let i = 0; i < this.numPlayers; i++) {
      this.players[i].Player2Left =
        this.players[(i - 1 + numPlayers) % this.numPlayers];
      this.players[i].Player2Right = this.players[(i + 1) % this.numPlayers];
    }
    // Set the first player as the user
    this.players[0].isUser = true;
  }
  async batchDeal() {
    for (let j = 0; j < this.numPlayers; j++) {
      await this.deck.drawCards(this.players[j].hand, this.handSize);
    }
  }
  async roundRobinDeal() {
    for (let i = 0; i < this.handSize; i++) {
      for (const player of this.players) {
        await this.deck.drawCards(player.hand, 1);
      }
    }
  }
}
