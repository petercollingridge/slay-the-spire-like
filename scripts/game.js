
const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: [StartScene, DeckBuilder, EnemyChoice, Fight, CardChoice],
};

const game = new Phaser.Game(config);