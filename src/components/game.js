import { clearCanvas, getCanvasCtx } from "../display.js";
import { Echo } from "./echo.js";
const FPS = 60;

export class Game {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.actors = [];
    this.echo = new Echo({ numPlayers: 1, handSize: 1 }); //create a new game of Echo
    this.initActors(this.echo);
  }

  run() {
    this.isRunning = true;
    this.loop();
  }
  update() {
    if (this.isPaused) {
      return;
    }
    for (const currentActor of this.actors) {
      currentActor.update();
    }
  }
  draw() {
    clearCanvas();
    const ctx = getCanvasCtx();
    ctx.save();
    for (const currentActor of this.actors) {
      currentActor.draw();
    }
    ctx.restore();
  }
  integrate() {
    this.draw();
    this.update();
  }
  loop() {
    setInterval(() => {
      this.integrate();
    }, 1000 / FPS);
  }
  initActors(echoGame) {
    this.actors.push(...echoGame.deck.drawPile.slice(0, 5)); // Always draw the first 5 cards of the draw pile on the canvas
    this.actors.push(...echoGame.deck.discardPile.slice(0, 5)); // Always draw the first 5 cards of the discard pile on the canvas
    for (const player of echoGame.players) {
      this.actors.push(...player.hand); // Draw each player's hand on the canvas
    }
  }
}
