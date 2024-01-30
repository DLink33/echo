import { Actor } from './actor.js';
import { arraySort } from '../utils.js';

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
      if (spacing > 22) {
        spacing = 15;
      }
      handWidth = (numCards - 1) * spacing + cardWidth;
      for (let i = 0; i < numCards; i++) {
        currCardPos = cards[i].getPosition();
        currCardPos.x =
          handPos.x - Math.floor(0.5 * (handWidth - cardWidth)) + spacing * i;
        cardPositions.push(currCardPos);
      }
    } else {
      spacing = Math.floor(200 / (numCards + 1));
      if (spacing > 22) {
        spacing = 15;
      }
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
    if (this.isUser) {
      this.sortHandByColor(false);
    }
    let cardPositions = this.calculateCardPositions();
    for (const card of this.hand.cards) {
      card.moveTo(cardPositions.shift(), 350, 'easeInOutExp');
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
  sortHandByValue(adjust = true, reverse = false) {
    arraySort(this.hand.cards, 'value', reverse);
    if (adjust) {
      this.adjustCardPositions();
    }
  }
  sortHandByColor(adjust = true, reverse = false) {
    const colorOrder = ['red', 'blue', 'yellow', 'green', 'all'];
    this.hand.cards.sort((a, b) => {
      const aColorIndex = colorOrder.indexOf(a.color);
      const bColorIndex = colorOrder.indexOf(b.color);
      if (aColorIndex === bColorIndex) {
        return reverse ? b.value - a.value : a.value - b.value;
      } else {
        return reverse ? bColorIndex - aColorIndex : aColorIndex - bColorIndex;
      }
    });
    if (adjust) {
      this.adjustCardPositions();
    }
  }
  sortHandByType(adjust = true, reverse = false) {
    arraySort(this.hand.cards, 'type', reverse);
    if (adjust) {
      this.adjustCardPositions();
    }
  }
  toString() {
    return `${this.name}: ${this.hand.cards} `;
  }
}
