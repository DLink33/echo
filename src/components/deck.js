import { Actor } from "./actor.js";
import { Card } from "./card.js";
import { drawDeck } from "../display.js";

var colors = ["red", "yellow", "blue", "green"];

export class Deck extends Actor {
  constructor() {
    super();
    this.drawPile = [];
    this.discardPile = [];
    this.createDeck();
  }
  createDeck() {
    // for each color...
    for (let i = 0; i < 4; i++) {
      // Add one zero card
      this.drawPile.push(new Card("number", colors[i], "0"));
      for (var j = 1; j <= 9; j++) {
        // Add two version of the 1-9
        this.drawPile.push(new Card("number", colors[i], j.toString()));
        this.drawPile.push(new Card("number", colors[i], j.toString()));
      }
      // Add the special cards
      for (j = 1; j <= 2; j++) {
        this.drawPile.push(new Card("reverse", colors[i], "<->"));
        this.drawPile.push(new Card("skip", colors[i], "X"));
        this.drawPile.push(new Card("draw2", colors[i], "+2"));
      }
    }
    // Add the wilds
    for (j = 0; j < 4; j++) {
      this.drawPile.push(new Card("wild4", "all", "+4"));
      this.drawPile.push(new Card("wild", "all", "~"));
    }
  }
  shuffleCards(cards) {
    let size = cards.length;
    for (let i = size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.drawPile[i], this.drawPile[j]] = [
        this.drawPile[j],
        this.drawPile[i],
      ];
    }
  }
  resetDeck() {
    this.drawPile = [];
    this.createDeck();
  }
  transferCards(src, dest, numCards) {
    if (src.length < numCards) {
      console.log("Not enough cards in source to transfer to destination.");
      return;
    }
    for (let i = 0; i < numCards; i++) {
      dest.push(src.pop());
    }
    return;
  }
  drawCards(hand, numCards = 1) {
    let totalDrawableCards = this.discardPile.length + this.drawPile.length;
    if (totalDrawableCards >= numCards) {
      if (this.drawPile.length >= numCards) {
        this.transferCards(this.drawPile, hand, numCards);
        return;
      } else {
        let remainingCards = numCards - this.drawPile.length;
        this.transferCards(this.drawPile, hand, this.drawPile.length);
        this.transferCards(
          this.discardPile,
          this.drawPile,
          this.discardPile.length
        );
        this.shuffleCards(this.drawPile);
        this.transferCards(this.drawPile, hand, remainingCards);
        return;
      }
    } else {
      this.transferCards(this.drawPile, hand, this.drawPile.length);
      this.shuffleCards(this.discardPile);
      this.transferCards(this.discardPile, hand, this.discardPile.length);
      return;
    }
  }
  discardCards(hand, numCards = 1) {
    this.transferCards(hand, this.discardPile, numCards);
    return;
  }

  draw() {
    drawDeck(this);
  }

  //TODO
  update() {}

  toString() {
    return this.drawPile.join(", ");
  }
}
