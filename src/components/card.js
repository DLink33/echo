import { Actor } from "./actor.js";
import { drawCard } from "../display.js";

export class Card extends Actor {
  constructor(type, color, symbol, pos) {
    super(pos);
    this.type = type;
    this.color = color;
    this.symbol = symbol;
    this.faceUp = false;
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
