import { clearCanvas, getCanvasCtx, drawBg } from '../display.js';
import { Echo } from './echo.js';
import { randInt, arraySort } from '../utils.js';

const FPS = 60;

export class Game {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.echo = new Echo({ numPlayers: 4, handSize: 15 }); //create a new game of Echo
    this.actors = [];
    this.initGame();
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
    this.sortActors();
  }
  draw() {
    clearCanvas();
    const ctx = getCanvasCtx();
    ctx.save();
    drawBg();
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
  initGame() {
    this.echo.createPlayers(this.echo.numPlayers);
    this.echo.deck.shuffleCards(this.echo.deck.drawPile.cards);
    this.initActors();
    let dealMethod = undefined;
    randInt(0, 1) === 0
      ? (dealMethod = this.echo.roundRobinDeal())
      : (dealMethod = this.echo.batchDeal());
    dealMethod;
  }
  initActors() {
    for (const card of this.echo.deck.drawPile.cards) {
      this.actors.push(card);
    }
  }
  sortActors() {
    arraySort(this.actors, 'pos.x', false);
  }
  flipAllCards() {
    for (const card of this.echo.deck.drawPile.cards) {
      card.flip();
    }
    for (const card of this.echo.deck.discardPile.cards) {
      card.flip();
    }
    for (const player of this.echo.players) {
      for (const card of player.hand.cards) {
        card.flip();
      }
    }
  }
}
