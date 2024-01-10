import { Actor } from "./actor.js";
import { drawPlayer } from "../display.js";

export class Player extends Actor {
  constructor(params) {
    const {
      name = "",
      player2Left = undefined,
      player2Right = undefined,
      isUser = false,
    } = params || {};
    super();
    this.isUser = isUser;
    this.name = name;
    this.points = 0;
    this.hand = [];
    this.adjacentPlayers = (player2Left, player2Right);
  }
  draw() {
    drawPlayer(this);
  }
}
