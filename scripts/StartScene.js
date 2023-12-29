class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image('background', 'assets/option_background.svg');
  }

  create() {
    const background = this.add.image(MIDX, MIDY, 'background');
    this.add.text(MIDX, MIDY - 40, 'Click to start', IMPACT_STYLE).setOrigin(0.5);

    const choices_ = {
      title: 'Choose an enemy to battle',
      type: 'enemy',
      choices: ['minotaur', 'spikey', 'yeti'],
    };

    const choices = {
      title: 'Choose a new card for your deck',
      type: 'card',
      choices: ['minotaur', 'spikey', 'yeti'],
    };

    background.setInteractive();
    background.on('pointerup', () => {
      this.scene.start('Choice', choices);
    });
  }
}
