import { clearCanvas, getCanvasCtx } from "../display.js";
import { Echo } from "./echo.js";

export class Game {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.actors = [];
    this.echo = new Echo(); //create a new game of Echo
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
    for (let i = 0; i < this.actors.length; i++) {
      const currentActor = this.actors[i];
      currentActor.update();
    }
  }
  draw() {
    clearCanvas();
    const ctx = getCanvasCtx();
    ctx.save();
    for (let i = 0; i < this.actors.length; i++) {
      //const currentActor = this.actors[i];
      //currentActor.draw();
    }
    ctx.restore();
  }
  integrate() {
    this.draw();
    this.update();
  }
  loop() {
    setInterval(() => { // setInterval is a built-in function that will run a function every x milliseconds
      this.integrate();
    }, 1000 / 60); // This will run the game at 60fps
  }
  // TODO: Add a method to add actors to the game based on the Cards in the Echo game
  initActors(echoGame) {
    this.actors.push(echoGame.deck);
    for (let i = 0; i < echoGame.players.length; i++) {
      const currentPlayer = echoGame.players[i];
      this.actors.push(currentPlayer);
    }
  }
}
