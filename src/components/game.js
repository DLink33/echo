import { clearCanvas, getCanvasCtx } from "../display.js";
import { Echo } from "./echo.js";
const FPS = 60;

export class Game {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.actors = [];
    this.echo = new Echo(); //create a new game of Echo
    this.initActors(this.echo);
    //console.log(this.actors); // for debugging
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
    // this.actors.push(echoGame.deck.drawPile[0]); // just push one card for now
    this.actors.push(echoGame.deck);
    //this.actors.push(...echoGame.deck.discardPile);
    // for (let i = 0; i < echoGame.players.length; i++) {
    //   const currentPlayer = echoGame.players[i];
    //   this.actors.push(currentPlayer);
    // }
  }
}
