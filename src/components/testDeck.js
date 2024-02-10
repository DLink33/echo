import { Card } from './card.js';
import { Deck } from './deck.js';

var colors = ['red', 'yellow', 'blue', 'green'];

export class TestDeck extends Deck {
  constructor(params = {}) {
    const { pos = { x: 0, y: 0, theta: 0 }, vel = { vx: 0, vy: 0, omega: 0 } } =
      params || {};
    super({ pos, vel });
    this.drawPile = { cards: [], pos: pos, parent: this };
    this.discardPile = { cards: [], pos: pos, parent: this };
    this.createDeck();
  }
  createDeck() {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 3; j++) {
        this.drawPile.cards.push(
          new Card({
            value: j,
            type: 'number',
            color: colors[i],
            symbol: j.toString(),
            pos: this.pos,
            vel: this.vel,
          })
        );
      }
    }
  }
}
