import { Actor } from './actor.js';

export class Player extends Actor {
  constructor(params = {}) {
    const {
      pos = { x: 0, y: 0, theta: 0 },
      vel = { vx: 0, vy: 0, omega: 0 },
      name = '',
      points = 0,
      player2Left = undefined,
      player2Right = undefined,
      isUser = false,
    } = params || {};
    super({ pos, vel });
    this.isUser = isUser;
    this.name = name;
    this.points = points;
    this.hand = { cards: [], pos: pos, parent: this };
    this.adjacentPlayers = [player2Left, player2Right];
  }
  calculateCardPositions() {
    let handPos = this.hand.pos;
    let numCards = this.hand.cards.length;
    let cards = this.hand.cards;
    let cardPositions = [];
    let spacing = 22;
    let cardWidth = 71;
    let handWidth = cardWidth + (numCards - 1) * spacing;
    let currCardPos;
    if (handPos.theta === 0 || handPos.theta === 180) {
      for (let i = 0; i < numCards; i++) {
        currCardPos = cards[i].getPosition();
        currCardPos.x = handPos.x - ((1 / 2) * handWidth + i * spacing);
        cardPositions.push(currCardPos);
      }
    } else {
      for (let i = 0; i < numCards; i++) {
        currCardPos = cards[i].getPosition();
        currCardPos.y = handPos.y - ((1 / 2) * handWidth + i * spacing);
        cardPositions.push(currCardPos);
      }
    }
    return cardPositions;
  }
  async adjustCardPositions() {
    let cardPositions = this.calculateCardPositions();
    for (const card of this.hand.cards) {
      card.moveTo(cardPositions.shift(), 333, 'easeOutQuad');
    }
  }
  toString() {
    return `${this.name}: ${this.hand.cards} `;
  }
}
