import { interpolationFuncs } from '../utils.js';
import { Transform } from '../display.js';

export class Actor {
  constructor(params = {}) {
    const { pos = { x: 0, y: 0, theta: 0 }, vel = { vx: 0, vy: 0, omega: 0 } } =
      params || {};
    this.pos = pos;
    this.vel = vel;
    this.transform = new Transform();
  }
  getPosition() {
    return { ...this.pos };
  }
  getVelocity() {
    return { ...this.vel };
  }
  setPosition(pos) {
    this.pos = { x: pos.x, y: pos.y, theta: pos.theta };
  }
  setVelocity(vel) {
    this.vel = { vx: vel.vx, vy: vel.vy, omega: vel.omega };
  }
  update() {
    // if the actor has a destination, then update the current position
    if (this.transform.dest) {
      this.transform.updateCurrent();
      this.setPosition(this.transform.current);
      // if the actor has no destination, then update the position based on the velocity
    } else {
      this.setPosition({
        x: this.pos.x + this.vel.vx,
        y: this.pos.y + this.vel.vy,
        theta: this.pos.theta + this.vel.omega,
      });
    }
  }
  moveTo(destination, duration, interpolation) {
    const interpolMethod = interpolationFuncs[interpolation];
    if (!interpolMethod) {
      throw new Error(`Unknown interpolation method: ${interpolation}`);
    }
    this.transform.setMove(
      this.getPosition(),
      destination,
      duration,
      interpolMethod
    );
  }
}
