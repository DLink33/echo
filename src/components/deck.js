import { Actor } from './actor.js';
import { Card } from './card.js';

var colors = ['red', 'yellow', 'blue', 'green'];

export class Deck extends Actor {
  constructor(params = {}) {
    const { pos = { x: 0, y: 0, theta: 0 }, vel = { vx: 0, vy: 0, omega: 0 } } =
      params || {};
    super({ pos, vel });
    this.drawPile = { cards: [], pos: pos };
    this.discardPile = { cards: [], pos: pos };
    this.createDeck();
  }
  createDeck() {
    // for each color...
    for (let i = 0; i < 4; i++) {
      // Add one zero card
      this.drawPile.cards.push(
        new Card({
          type: 'number',
          color: colors[i],
          symbol: '0',
          pos: this.pos,
          vel: this.vel,
        })
      );
      for (var j = 1; j <= 9; j++) {
        // Add two version of the 1-9
        this.drawPile.cards.push(
          new Card({
            type: 'number',
            color: colors[i],
            symbol: j.toString(),
            pos: this.pos,
            vel: this.vel,
          })
        );
        this.drawPile.cards.push(
          new Card({
            type: 'number',
            color: colors[i],
            symbol: j.toString(),
            pos: this.pos,
            vel: this.vel,
          })
        );
      }
      // Add the special cards
      for (j = 1; j <= 2; j++) {
        this.drawPile.cards.push(
          new Card({
            type: 'reverse',
            color: colors[i],
            symbol: '<->',
            pos: this.pos,
            vel: this.vel,
          })
        );
        this.drawPile.cards.push(
          new Card({
            type: 'skip',
            color: colors[i],
            symbol: 'X',
            pos: this.pos,
            vel: this.vel,
          })
        );
        this.drawPile.cards.push(
          new Card({
            type: 'draw2',
            color: colors[i],
            symbol: '+2',
            pos: this.pos,
            vel: this.vel,
          })
        );
      }
    }
    // Add the wilds
    for (j = 0; j < 4; j++) {
      this.drawPile.cards.push(
        new Card({
          type: 'wild4',
          color: 'all',
          symbol: '+4',
          pos: this.pos,
          vel: this.vel,
        })
      );
      this.drawPile.cards.push(
        new Card({
          type: 'wild',
          color: 'all',
          symbol: '~',
          pos: this.pos,
          vel: this.vel,
        })
      );
    }
  }
  shuffleCards(cards) {
    let size = cards.length;
    for (let i = size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.drawPile.cards[i], this.drawPile.cards[j]] = [
        this.drawPile.cards[j],
        this.drawPile.cards[i],
      ];
    }
  }
  resetDeck() {
    this.drawPile.cards = [];
    this.createDeck();
  }
  transferCards(src, dest, numCards) {
    if (src.length < numCards) {
      console.log('Not enough cards in source to transfer to destination.');
      return;
    }
    for (let i = 0; i < numCards; i++) {
      console.log(`Transferring ${src.cards[src.cards.length - 1]} to ${dest}`);
      console.log(`Source: ${src.pos}, Destination: ${dest.pos}`);
      let card = src.cards.pop();
      dest.cards.push(card);
      //TODO: Add animation here for when the card is moved
      card.moveTo(dest.pos, 1.25, 'easeOutCubic');
    }
    return;
  }
  drawCards(hand, numCards = 1) {
    let totalDrawableCards =
      this.discardPile.cards.length + this.drawPile.cards.length;
    if (totalDrawableCards >= numCards) {
      if (this.drawPile.cards.length >= numCards) {
        this.transferCards(this.drawPile, hand, numCards);
        return;
      } else {
        let numRemainingCards = numCards - this.drawPile.cards.length;
        this.transferCards(this.drawPile, hand, this.drawPile.cards.length);
        this.transferCards(
          this.discardPile,
          this.drawPile,
          this.discardPile.cards.length
        );
        this.shuffleCards(this.drawPile);
        this.transferCards(this.drawPile, hand, numRemainingCards);
        return;
      }
    } else {
      this.transferCards(this.drawPile, hand, this.drawPile.cards.length);
      this.shuffleCards(this.discardPile);
      this.transferCards(this.discardPile, hand, this.discardPile.cards.length);
      return;
    }
  }
  discardCards(hand, numCards = 1) {
    this.transferCards(hand, this.discardPile, numCards);
    return;
  }

  toString() {
    return this.drawPile.join(', ');
  }
}
