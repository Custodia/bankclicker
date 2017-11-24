const JUMP_VELOCITY = 4;

class Pig {

  constructor(state) {
    const context = state.context;
    //context.addHitRegion({id: "bigGreen"});
    this.height = 0;
    this.velocity = JUMP_VELOCITY;
  }

  componentDidMount() {
    requestAnimationFrame(() => this.update());
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
    context.fillRect(100, 200 - this.height, 150, 100);
    context.restore();
  }
}

export default Pig;
