import { randomNumBetweenExcluding, randomNumBetween } from './helpers'

export default class Cloud {
  constructor(args, state) {
    this.height = randomNumBetween(10, 50);
    this.width = randomNumBetween(10, 50) * randomNumBetween(1, 5);;
    this.velocity = randomNumBetweenExcluding(-0.75, 0.75, -0.1, 0.1);
    this.xPos = randomNumBetween(0, state.screenWidth);
    this.yPos = randomNumBetween(0, state.screenHeight / 2);
  }

  componentDidMount() {
    requestAnimationFrame(() => this.update());
  }

  update(state) {
    this.xPos += this.velocity
    if(this.xPos > state.screenWidth){
        this.xPos -= state.screenWidth + this.width;
        this.yPos = randomNumBetween(0, state.screenHeight / 2);
    }
    if(this.xPos < -this.width){
        this.xPos += state.screenWidth;
        this.yPos = randomNumBetween(0, state.screenHeight / 2);
    }
  }

  render(state) {
    const context = state.context;
    context.save();
    context.fillStyle = '#fff';
    context.fillRect(0 + this.xPos, this.yPos, this.width, this.height);
    context.restore();
  }
}
// 
// var sky = document.getElementsByClassName('back')[0];
//     screenWidth = window.screen.width,
//     boxHeight = 300,
//     clouds = [],
//     path = "M107.135,8.127c2.2-5.374,3.422-11.253,3.422-17.419c0-25.415-20.603-46.018-46.018-46.018c-17.446,0-32.622,9.708-40.426,24.017c-3.559-1.221-7.372-1.893-11.344-1.893c-5.978,0-11.604,1.503-16.524,4.148c-6.439-5.353-14.714-8.573-23.742-8.573c-18.438,0-33.731,13.428-36.656,31.037c-4.543-4.418-10.741-7.144-17.578-7.144c-12.732,0-23.255,9.436-24.971,21.695c-9.527,3.3-16.37,12.346-16.37,22.995c0,13.441,10.896,24.336,24.336,24.336v0H98.734c13.44,0,24.337-10.896,24.337-24.337C123.071,20.485,116.436,11.548,107.135,8.127z";
// var cloud = function (screenWidth, boxHeight) {
//     var yPos = Math.random()*boxHeight,
//         xPos = Math.random()*screenWidth,
//         speed = Math.random(),
//         direction = Math.random(),
//         scale = speed,
//         scaleString = 'scale(' + scale + ' ' + scale + ')',
//         opacity = scale;
// 
// 
// 
//     var cloud = document.createElementNS("http://www.w3.org/2000/svg", 'path');//create SVG
// 
//     cloud.setAttribute('d', path);//set path
//     cloud.setAttribute('fill', "white");//color
//     cloud.setAttribute('fill-opacity', opacity);
// 
//     if(direction > 0.5){//set random direction
//         speed = -speed;
//     }
// 
//     sky.appendChild(cloud);//put clouds in the sky
// 
//     this.animate = function(){//animation method
// 
//     };
// };
// 
// var createClouds = function(quantity){
//     for (var i = 0; i < quantity; i++) {//create clouds and put them inside array
//         clouds.push(new cloud(screenWidth, boxHeight));
//     }
// };
// 
// 
// 
// var render = function(){//call the animate method from each cloud and control flow with requestAnimationFrame
//     for (var i = 0; i < clouds.length; i++) {
//         clouds[i].animate();
// 
//     }
//     requestAnimationFrame(render);
// };
// 
// createClouds(10);
// render();
