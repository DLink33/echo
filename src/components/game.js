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
    this.direction = true; // true will mean CW, false will mean CCW
    this.winner = null;
    this.gameOver = false;
    this.createPlayers(numPlayers);
    this.dealCards(this.handSize);
    this.initGame();
  }
  createPlayers(numPlayers) {
    for (let i = 0; i < numPlayers; i++) {
      this.players.push(new Player(i));
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
