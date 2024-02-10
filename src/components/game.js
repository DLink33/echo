import { clearCanvas, getCanvasCtx, drawBg } from '../display.js';
import { Echo } from './echo.js';
import { randInt, arraySort, delay } from '../utils.js';

const FPS = 60;

export class Game {
  constructor(test = false) {
    this.isRunning = false;
    this.isPaused = false;
    this.test = test;
    this.echo = new Echo({ numPlayers: 4, handSize: 3, test: this.test }); //create a new game of Echo
    this.actors = [];
    this.initGame(this.test);
    if (this.test) {
      this.flipAllCards();
    }
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
  async initGame(test) {
    this.echo.createPlayers(this.echo.numPlayers);
    if (!test) {
      this.echo.deck.shuffleCards(this.echo.deck.drawPile.cards);
    }
    this.echo.deck.adjustCardPositions();
    this.initActors();
    let dealMethod = undefined;
    randInt(0, 1) === 0
      ? (dealMethod = this.echo.roundRobinDeal())
      : (dealMethod = this.echo.batchDeal());
    dealMethod;
    await delay(1250);
    this.echo.players[0].sortHandByColor(false);
    // Move top card from draw pile to discard pile
    // Determine who goes first
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
