
const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: [StartScene, Choice, Fight],
};

const game = new Phaser.Game(config);