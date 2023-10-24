const Card = require("./Card");
//import { Card } from "./Card.js";

var colors = ["red", "yellow", "blue", "green"];

class Deck {
  constructor() {
    this.cards = [];
    this.discardPile = [];
    this.drawPile = [];
    this.createDeck();
  }
  createDeck() {
    // for each color...
    for (let i = 0; i < 4; i++) {
      // Add one zero card
      this.cards.push(new Card(colors[i], "0"));
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
}

module.exports = Deck;
