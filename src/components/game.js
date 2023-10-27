const Deck = require("./Deck");
const Player = require("./Player");

class Game {
  constructor(numPlayers = 2, handSize = 7, rounds = 1, trackScore = false) {
    this.deck = new Deck();
    this.players = [];
    this.numPlayers = numPlayers;
    this.handSize = handSize;
    this.trackScore = trackScore;
    this.currentPlayer = 0;
    this.direction = false; // true will mean CW, false will mean CCW
    this.winner = null;
    this.gameOver = false;
    this.initGame();
  }
  createPlayers(numPlayers) {
    // Create all necessary players
    for (let i = 0; i < this.numPlayers; i++) {
      this.players.push(new Player(i));
      this.players[i].name = `Player ${i + 1}`;
    }
    // Set the adjacent players for each player (i.e. which players are directly to the left and
    // right of the current player
    for (let i = 0; i < this.numPlayers; i++) {
      this.players[i].Player2Left = this.players[(i - 1) % this.numPlayers]; //TODO: FIX THIS
      this.players[i].Player2Right = this.player[(i + 1) % this.numPlayers];
    }
  }
  dealCards(handSize) {
    for (let i = 0; i < handSize; i++) {
      for (let j = 0; j < this.numPlayers; j++) {
        this.deck.draw(this.players[j].hand, this.handSize);
      }
    }
  }
  initGame() {
    this.createPlayers(this.numPlayers);
    this.dealCards(this.handSize);
  }
}

module.exports = Game;
