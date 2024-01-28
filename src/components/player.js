import { Actor } from './actor.js';

const HAND_BUFFER = 5;

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
    let handPos = this.hand.parent.getPosition();
    let numCards = this.hand.cards.length;
    let cards = this.hand.cards;
    let cardPositions = [];
    let cardWidth = 71;
    let spacing;
    let handWidth;
    let currCardPos;
    if (handPos.theta === 0) {
      spacing = Math.floor(432 / (numCards + 1));
      handWidth = (numCards - 1) * spacing + cardWidth;
      for (let i = 0; i < numCards; i++) {
        currCardPos = cards[i].getPosition();
        currCardPos.x =
          handPos.x - Math.floor(0.5 * (handWidth - cardWidth)) + spacing * i;
        cardPositions.push(currCardPos);
      }
    } else if (handPos.theta === 180) {
      spacing = Math.floor(200 / (numCards + 1));
      handWidth = (numCards - 1) * spacing + cardWidth;
      for (let i = 0; i < numCards; i++) {
        currCardPos = cards[i].getPosition();
        currCardPos.x =
          handPos.x - Math.floor(0.5 * (handWidth - cardWidth)) + spacing * i;
        cardPositions.push(currCardPos);
      }
    } else {
      spacing = Math.floor(200 / (numCards + 1));
      handWidth = (numCards - 1) * spacing + cardWidth;
      for (let i = 0; i < numCards; i++) {
        currCardPos = cards[i].getPosition();
        currCardPos.y =
          handPos.y - Math.floor(0.5 * (handWidth - cardWidth)) + spacing * i;
        cardPositions.push(currCardPos);
      }
    }
    return cardPositions;
  }
  async adjustCardPositions() {
    let cardPositions = this.calculateCardPositions();
    for (const card of this.hand.cards) {
      card.moveTo(cardPositions.shift(), 333, 'easeInOutExp');
      if (this.isUser) {
        // if the card's belong to the User, flip them over
        for (const card of this.hand.cards) {
          if (!card.faceUp) {
            card.flip();
          }
        }
      }
    }
  }
  toString() {
    return `${this.name}: ${this.hand.cards} `;
  }
}
