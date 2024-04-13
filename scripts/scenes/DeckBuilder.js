class DeckBuilder extends Phaser.Scene {
  constructor(name) {
    super(name);
  }

  init() {}

  create() {
    this.add.image(MIDX, MIDY, 'background');
  }
};
