import { Actor } from "./actor.js";
import { drawCard } from "../display.js";

export class Card extends Actor {
  constructor(type, color, symbol) {
    this.type = type;
    this.color = color;
    this.symbol = symbol;
  }
  toString() {
    return `${this.color} ${this.symbol}`;
  }
  draw(ctx) {
    drawCard(this, ctx);
  }
}
