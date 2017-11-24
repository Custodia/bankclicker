import Cloud from './Cloud';

class Background {
  constructor(state) {
    const context = state.context;
    this.height = 0;
    this.clouds = []
    for(var i = 0; i < 5; i++) {
      this.clouds.push(new Cloud({}, state))
    }
  }
  update() {
    this.clouds.forEach(c => c.update());
  }
  
  render(state) {
    const context = state.context;
    context.save();
    context.fillStyle = '#8ef1ff';
    context.fillRect(0, 0, state.screenWidth, state.screenHeight);
    this.clouds.forEach(c => c.render(state));
    context.fillStyle = '#78ff79';
    context.fillRect(0, state.screenHeight / 2 + 50, state.screenWidth, state.screenHeight);
    context.restore();
  }
}

export default Background;
