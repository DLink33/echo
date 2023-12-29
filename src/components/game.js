import { clearCanvas, getCanvasCtx } from "../display.js";
import { Echo } from "./echo.js";

export class Game {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.actors = [];
    this.echo = new Echo(); //create a new game of Echo
  }

  //TODO: Work on creating all of the following functions for displaying and updating the UI for the game.
  run() {
    this.isRunning = true;
    this.loop();
  }

  update() {
    if (this.isPaused) {
      return;
    }
  }

  draw() {
    clearCanvas();
    const ctx = getCanvasCtx();
    ctx.save();
    for (let i = 0; i < this.actors.length; i++) {}
    ctx.restore();
  }
  integrate() {
    this.draw();
    this.update();
  }
  loop() {
    setInterval(() => {
      this.integrate();
    }, 1000 / 60); // This will run the game at 60fps
  }
}
