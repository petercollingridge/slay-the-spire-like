
const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: [StartScene, EnemyChoice, Fight, CardChoice],
};

const game = new Phaser.Game(config);