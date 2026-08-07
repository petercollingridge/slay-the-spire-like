
const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  type: Phaser.WEBGL,
  scene: [StartScene, DeckBuilder, EnemyChoice, Fight, CardChoice],
};

const game = new Phaser.Game(config);
