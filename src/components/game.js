const Deck = require("./Deck");
const Player = require("./Player");

class Game {
  constructor(numPlayers = 2, handSize = 7, rounds = 1) {
    this.deck = new Deck();
    this.players = [];
    this.currentPlayer = 0;
    this.direction = true; // true will mean CW, false will mean CCW
    this.winner = null;
    this.gameOver = false;
    this.createPlayers(numPlayers);
    this.dealCards(handSize);
  }
  createPlayers(numPlayers) {
    for (let i = 0; i < numPlayers; i++) {
      this.players.push(new Player(i));
    }
  }
  dealCards(handSize) {
    for (let i = 0; i < handSize; i++) {
      for (let j = 0; j < this.players.length; j++) {
        this.players[j].hand.push(this.deck.draw(1)[0]);
      }
    }
  }
}

module.exports = Game;
