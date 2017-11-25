export default class Coin {
  constructor(args) {
    this.position = args.position;
    this.velocity = args.velocity || 0;
    this.radius = args.size || 5;
    this.lifeSpan = args.lifeSpan || 10;
    this.inertia = 0.9;
    this.startedHoming = false;
  }

  destroy(){
    this.delete = true;
  }

  render(state){
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    const minVelo = 0.1;
    const xTarget = state.screenWidth / 2 + 20;
    const yTarget = state.screenHeight / 2 - 20;
    const homing = Math.abs(this.velocity.x) < minVelo && Math.abs(this.velocity.y);
    if (homing && !this.startedHoming) {
      if (this.position.x !== xTarget) {
        this.velocity.x = this.position.x < xTarget ? 1 : -1
      }
      if (this.position.y !== yTarget) {
        this.velocity.y = this.position.y < yTarget ? 1 : -1
      }
      this.startedHoming = true;
    } else if (this.startedHoming) {
      if (Math.abs(this.position.x - xTarget) > 20) {
        this.velocity.x /= this.inertia;
      } else {
        this.velocity.x = 0;
      }
      if (Math.abs(this.position.y - yTarget) > 20) {
        this.velocity.y /= this.inertia;
      } else {
        this.velocity.y = 0;
      }
      if (this.velocity.y === 0 && this.velocity.x === 0) {
        this.destroy();
      }

    } else if (!this.startedHoming) {
      this.velocity.x *= this.inertia;
      this.velocity.y *= this.inertia;
    }

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.fillStyle = '#ffda3d';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -this.radius);
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
