const JUMP_VELOCITY = 4;

export default class Pig {
  constructor(state) {
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
    const xOffset = state.screenWidth ? (state.screenWidth / 2 - 150) : -50;
    const yOffset = - this.height + (state.screenHeight ? (state.screenHeight / 2 - 200) : -100);
    context.fillRect(100 + xOffset, 200 + yOffset, 150, 100);
    context.fillRect(100 + xOffset, 300 + yOffset, 10, 10);
    context.fillRect(240 + xOffset, 300 + yOffset, 10, 10);
    context.fillRect(250 + xOffset, 230 + yOffset, 10, 40);
    context.fillRect(90 + xOffset, 250 + yOffset, 10, 10);
    context.fillStyle = '#000';
    context.fillRect(220 + xOffset, 230 + yOffset, 10, 10);
    if (state.styles.hat.level === 2) drawCap(context, xOffset, yOffset, '#0973ff');
    if (state.styles.hat.level > 2) drawTophat(context, xOffset, yOffset, '#323232', state.styles.hat.level);
    if (state.styles.cigar.level > 1) drawCigar(context, xOffset, yOffset, '#323232', state.styles.cigar.level - 1 );
    if (state.styles.pants.level > 1) drawPants(context, xOffset, yOffset, '#323232', state.styles.pants.level - 1 );
    context.restore();
  }
}

const drawCap = (context, xOffset, yOffset, color) => {
  context.fillStyle = color;
  context.fillRect(200 + xOffset, 200 + yOffset, 70, 10);
  context.fillRect(200 + xOffset, 200 + yOffset, 50, -15);
}

const drawTophat = (context, xOffset, yOffset, color, height) => {
  context.fillStyle = color;
  context.fillRect(190 + xOffset, 190 + yOffset, 70, 10);
  context.fillRect(200 + xOffset, 200 + yOffset, 50, - height * 10);
}

const drawCigar = (context, xOffset, yOffset, color, level) => {
  context.fillStyle = color;
  const length = level * 10;
  context.fillRect(250 + xOffset, 275 + yOffset, length, 10);
  context.fillStyle = '#ffbf00';
  context.fillRect(250 + xOffset + length, 275 + yOffset, 5, 10);
}

const drawPants = (context, xOffset, yOffset, color, level) => {
  context.fillStyle = color;
  const length = level * 10 + 10;
  context.fillRect(100 + xOffset, 200 + yOffset, length, 100);
}
