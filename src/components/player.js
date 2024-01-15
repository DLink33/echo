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
    this.hand = { cards: [], pos: pos };
    this.adjacentPlayers = [player2Left, player2Right];
  }
  calculateCardPositions() {
    let pos = this.hand.pos;
    let numCards = this.hand.cards.length;
    let cardPositions = [];

    if (pos.theta === 0 || pos.theta === 90) {
      
    } else {

    }
    
  }
  update() {
    // if the actor has a destination, then update the current position
    if (this.transform.dest) {
      this.transform.updateCurrent();
      this.setPosition(this.transform.current);
      // if the actor has no destination, then update the position based on the velocity
    } else {
      this.setPosition({
        x: this.pos.x + this.vel.vx,
        y: this.pos.y + this.vel.vy,
        theta: this.pos.theta + this.vel.omega,
      });
    }
  }
  toString() {
    return `${this.name}: ${this.hand.cards} `;
  }
}
