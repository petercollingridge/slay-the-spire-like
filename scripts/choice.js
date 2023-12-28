class Choice extends Phaser.Scene {
  constructor() {
    super("Choice");
  }

  preload() {
    this.load.image('background', 'assets/option_background.svg');
    this.load.image('rect', 'assets/characters/choice_outline.svg');
    this.load.image('enemy-1', 'assets/characters/sasquatch.svg');
    this.load.image('enemy-2', 'assets/characters/minotaur.svg');
  }

  create() {
    const y = HEIGHT / 2;
    this.add.image(WIDTH / 2, y, 'background');

    const choices = ['minotaur', 'yeti'];
    const dx = 150;
    let x = (WIDTH - dx * (choices.length - 1)) / 2;

    choices.forEach((choice) => {
      const box = this.add.image(x, y, 'rect');
      const img = ENEMY_DATA[choice].img;
      this.add.image(x, y, img);

      box.setInteractive({ useHandCursor: true });
      box.on('pointerover', highlightTint);
      box.on('pointerout', clearTint);
      box.on('pointerup', () => {
        this.scene.start('Fight', { enemy: choice });
      });

      x += dx;
    });
  }
}
