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
    let id = 0;
    // for each color...
    for (let i = 0; i < 4; i++) {
      // Add one zero card
      this.drawPile.cards.push(
        new Card({
          value: 0,
          type: 'number',
          color: colors[i],
          symbol: '0',
          pos: this.pos,
          vel: this.vel,
          id: ++id,
        })
      );
      for (var j = 1; j <= 9; j++) {
        // Add two version of the 1-9
        this.drawPile.cards.push(
          new Card({
            value: j,
            type: 'number',
            color: colors[i],
            symbol: j.toString(),
            pos: this.pos,
            vel: this.vel,
            id: ++id,
          })
        );
        this.drawPile.cards.push(
          new Card({
            value: j,
            type: 'number',
            color: colors[i],
            symbol: j.toString(),
            pos: this.pos,
            vel: this.vel,
            id: ++id,
          })
        );
      }
      // Add the special cards
      for (j = 1; j <= 2; j++) {
        this.drawPile.cards.push(
          new Card({
            value: 10,
            type: 'reverse',
            color: colors[i],
            symbol: '<->',
            pos: this.pos,
            vel: this.vel,
            id: ++id,
          })
        );
        this.drawPile.cards.push(
          new Card({
            value: 11,
            type: 'skip',
            color: colors[i],
            symbol: 'X',
            pos: this.pos,
            vel: this.vel,
            id: ++id,
          })
        );
        this.drawPile.cards.push(
          new Card({
            value: 12,
            type: 'draw2',
            color: colors[i],
            symbol: '+2',
            pos: this.pos,
            vel: this.vel,
            id: ++id,
          })
        );
      }
    }
    // Add the wilds
    this.drawPile.cards.push(
      new Card({
        value: 13,
        type: 'wild',
        color: 'all',
        symbol: '~',
        pos: this.pos,
        vel: this.vel,
        id: ++id,
      })
    );
    for (j = 0; j < 4; j++) {
      this.drawPile.cards.push(
        new Card({
          value: 14,
          type: 'wild4',
          color: 'all',
          symbol: '+4',
          pos: this.pos,
          vel: this.vel,
          id: ++id,
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
  async transferCards(src, dest, numCards, ms) {
    if (src.length < numCards) {
      console.log('Not enough cards in source to transfer to destination.');
      return;
    }
    for (let i = 0; i < numCards; i++) {
      let card = src.cards.pop();
      dest.cards.push(card);
      await card.moveTo(dest.pos, ms, 'easeOutCubic', true);
      //console.log(`The ${card} card was moved to ${dest.parent.name}'s hand`); //DEBUG
    }
    dest.parent.adjustCardPositions();
    //TODO: src.parent.adjustCardPositions(); // The source's card positions need to be adjusted as well
    return;
  }
  async drawCards(hand, numCards = 1, ms) {
    let totalDrawableCards =
      this.discardPile.cards.length + this.drawPile.cards.length;
    if (totalDrawableCards >= numCards) {
      if (this.drawPile.cards.length >= numCards) {
        await this.transferCards(this.drawPile, hand, numCards, ms);
        return;
      } else {
        let numRemainingCards = numCards - this.drawPile.cards.length;
        await this.transferCards(
          this.drawPile,
          hand,
          this.drawPile.cards.length,
          ms
        );
        await this.transferCards(
          this.discardPile,
          this.drawPile,
          this.discardPile.cards.length,
          ms
        );
        this.shuffleCards(this.drawPile);
        await this.transferCards(this.drawPile, hand, numRemainingCards, ms);
        return;
      }
    } else {
      await this.transferCards(
        this.drawPile,
        hand,
        this.drawPile.cards.length,
        ms
      );
      this.shuffleCards(this.discardPile);
      await this.transferCards(
        this.discardPile,
        hand,
        this.discardPile.cards.length,
        ms
      );
      return;
    }
  }

  async adjustCardPositions() {
    //TODO: Implement this
  }

  async discardCards(hand, numCards = 1) {
    await this.transferCards(hand, this.discardPile, numCards);
    return;
  }

  toString() {
    return this.drawPile.join(', ');
  }
}
