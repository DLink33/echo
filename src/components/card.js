import { Actor } from "./actor.js";
import { drawCard } from "../display.js";

export class Card extends Actor {
  constructor(params = {}) {
    const {
      pos = { x: 0, y: 0, theta: 0 },
      vel = { vx: 0, vy: 0, omega: 0 },
      type = undefined,
      color = undefined,
      symbol = undefined,
      faceUp = false,
    } = params || {};
    super({ pos, vel });
    this.type = type;
    this.color = color;
    this.symbol = symbol;
    this.faceUp = faceUp;
  }
  flip() {
    this.faceUp = !this.faceUp;
  }
  toString() {
    return `${this.color} ${this.symbol}`;
  }
  draw() {
    drawCard(this);
  }
}
