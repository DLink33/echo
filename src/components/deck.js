const Card = require("./Card");

var colors = ["red", "yellow", "blue", "green"];

class Deck {
  constructor() {
    this.cards = [];
    this.discardPile = [];
    this.createDeck();
    this.drawPile = this.cards;
  }
  createDeck() {
    // for each color...
    for (let i = 0; i < 4; i++) {
      // Add one zero card
      this.cards.push(new Card("number", colors[i], "0"));
      for (var j = 1; j <= 9; j++) {
        // Add two version of the 1-9
        this.cards.push(new Card("number", colors[i], j.toString()));
        this.cards.push(new Card("number", colors[i], j.toString()));
      }
      for (j = 1; j <= 2; j++) {
        this.cards.push(new Card("reverse", colors[i], "<->"));
        this.cards.push(new Card("skip", colors[i], "X"));
        this.cards.push(new Card("draw 2", colors[i], "+2"));
      }
    }
    for (j = 0; j < 4; j++) {
      this.cards.push(new Card("wild draw 4", "wild", "+4"));
      this.cards.push(new Card("wild", "wild", "~"));
    }
  }
  shuffleCards(cards) {
    let size = cards.length;
    for (let i = size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  resetDeck() {
    this.cards = [];
    this.createDeck();
  }
  drawCard(numCards) {
    if (this.drawPile.length === 0) {
      this.drawPile = this.discardPile;
      this.discardPile = [];
      this.shuffleCards(this.drawPile);
    }
    let drawnCards = [];
    for (let i = 0; i < numCards; i++) {
      drawnCards.push(this.drawPile.pop());
    }
    return drawnCards;
  }
  toString() {
    return this.cards.join(", ");
  }
}

module.exports = Deck;
