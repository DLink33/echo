import { clearCanvas, getCanvasCtx } from '../display.js';
import { Echo } from './echo.js';
const FPS = 60;

export class Game {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.actors = [];
    this.echo = new Echo({ numPlayers: 1, handSize: 1 }); //create a new game of Echo
    console.log(this.echo.drawPile);
    this.initActors();
    this.echo.initGame();
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
  initActors() {
    for (const card of this.echo.deck.drawPile.cards) {
      this.actors.push(card);
    }
  }
}
