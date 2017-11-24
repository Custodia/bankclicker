const JUMP_VELOCITY = 4;

export default class Pig {
  constructor(state) {
    const context = state.context;
    this.height = 0;
    this.velocity = JUMP_VELOCITY;
  }

  update() {
    this.velocity -= 0.25;
    this.height += this.velocity;
    if (this.height < 0) this.velocity = JUMP_VELOCITY
  }

  render(state) {
    const context = state.context;
    context.save();
    context.fillStyle = '#f99';
    const xOffset = state.screenWidth / 2 - 150;
    const yOffset = - this.height + state.screenHeight / 2 - 200;
    context.fillRect(100 + xOffset, 200 + yOffset, 150, 100);
    context.fillRect(100 + xOffset, 300 + yOffset, 10, 10);
    context.fillRect(240 + xOffset, 300 + yOffset, 10, 10);
    context.fillRect(250 + xOffset, 230 + yOffset, 10, 40);
    context.fillRect(90 + xOffset, 250 + yOffset, 10, 10);
    context.fillStyle = '#000';
    context.fillRect(220 + xOffset, 230 + yOffset, 10, 10);
    context.restore();
  }
}
