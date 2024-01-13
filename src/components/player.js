import { Actor } from "./actor.js";
import { drawPlayer } from "../display.js";

export class Player extends Actor {
  constructor(params = {}) {
    const {
      pos = { x: 0, y: 0, theta: 0 },
      vel = { vx: 0, vy: 0, omega: 0 },
      name = "",
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
    this.adjacentPlayers = (player2Left, player2Right);
  }
  draw() {
    drawPlayer(this);
  }
}
