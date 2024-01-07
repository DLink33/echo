import { interpolationFuncs } from "../utils.js";

export class Actor {
  constructor(params) {
    const {
      x = 0,
      y = 0,
      theta = 0,
      vx = 0,
      vy = 0,
      omega = 0,
      img = undefined,
    } = params || {};
    //TODO: for some reason the pos elements are being init to 'NaN'
    // need to fix
    this.pos = { x: x, y: y, theta: theta };
    this.vel = { vx: vx, vy: vy, omega: omega };
    this.img = img;
    this.moveStruct = {
      startPos: null,
      destination: null,
      startTime: null,
      duration: null,
      interpolMethod: null,
    };
  }
  getPosition() {
    return this.pos;
  }
  getVelocity() {
    return this.vel;
  }
  setPosition(pos) {
    this.pos = { x: pos.x, y: pos.y, theta: pos.theta };
  }
  setVelocity(vel) {
    this.vel = { vx: vel.vx, vy: vel.vy, omega: vel.omega };
  }
  setMove(dest, dur, interpol) {
    this.moveStruct.startTime = performance.now();
    this.moveStruct.startPos = this.getPosition();
    this.moveStruct.destination = { x: dest.x, y: dest.y, theta: dest.theta };
    this.moveStruct.duration = dur / 1000;
    this.moveStruct.interpolMethod = interpol;
  }
  resetMove() {
    for (let prop in this.moveStruct) {
      if (this.moveStruct.hasOwnProperty(prop)) {
        this.moveStruct[prop] = null;
      }
    }
  }
  update() {
    if (this.moveStruct.destination) {
      const elapsedTime =
        (performance.now() - this.moveStruct.startTime) / 1000;

      //TODO: There is an issue with the var 'progress' and how it is being calculated with the interpolation function.  I think I am mistake with how this should work.

      let progress = elapsedTime / this.moveStruct.duration;
      if (progress >= 1) {
        this.setPosition(this.moveStruct.destination);
        this.setVelocity({ vx: 0, vy: 0, omega: 0 });
        this.resetMove();
      } else {
        progress = this.moveStruct.interpolMethod(progress);
        let [x, y, theta] = [
          this.moveStruct.startPos.x +
            (this.moveStruct.destination.x - this.moveStruct.startPos.x) *
              progress,
          this.moveStruct.startPos.y +
            (this.moveStruct.destination.y - this.moveStruct.startPos.y) *
              progress,
          this.moveStruct.startPos.theta +
            (this.moveStruct.destination.theta -
              this.moveStruct.startPos.theta) *
              progress,
        ];
        this.setPosition({ x, y, theta });
      }
    } else {
      this.setPosition({
        x: this.x + this.vx,
        y: this.y + this.vy,
        theta: this.theta + this.omega,
      });
    }
  }
  moveTo(destination, duration, interpolation) {
    const interpolMethod = interpolationFuncs[interpolation];
    if (!interpolMethod) {
      throw new Error(`Unknown interpolation method: ${interpolation}`);
    }
    this.setMove(destination, duration, interpolMethod);
  }
}
