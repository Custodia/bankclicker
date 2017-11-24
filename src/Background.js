class Background {

  constructor(state) {
    const context = state.context;
    this.height = 0;
  }

  componentDidMount() {
    requestAnimationFrame(() => this.update());
  }
  update() {}
  
  render(state) {
    const context = state.context;
    context.save();
    context.fillStyle = '#8ef1ff';
    context.fillRect(0, 0, state.screenWidth, state.screenHeight);
    context.fillStyle = '#78ff79';
    context.fillRect(0, state.screenHeight / 2 + 50, state.screenWidth, state.screenHeight);
    context.restore();
  }
}

export default Background;
