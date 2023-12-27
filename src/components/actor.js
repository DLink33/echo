export class Actor {
  constructor(params) {
    const { x = 0, y = 0, theta = 0, vx = 0, vy = 0, omega = 0 } = params || {};
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.vx = vx;
    this.vy = vy;
    this.omega = omega;
  }

  update() {
    this.x += this.vy;
    this.y += this.vx;
  }

  getPosition() {
    return [this.x, this.y, this.theta];
  }

  getVelocity() {
    return [this.vx, this.vy, this.omega];
  }

  setPosition(x, y, theta) {
    this.x = x;
    this.y = y;
    this.theta = theta;
  }

  setVelocity(vx, vy, omega) {
    this.vx = vx;
    this.vy = vy;
    this.omega = omega;
  }
}
