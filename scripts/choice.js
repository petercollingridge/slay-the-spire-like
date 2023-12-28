class Choice extends Phaser.Scene {
  constructor() {
    super("Choice");
  }

  preload() {
    this.load.image('background', 'assets/option_background.svg');
    this.load.image('rect', 'assets/characters/choice_outline.svg');
    this.load.image('button', 'assets/button.svg');
    this.load.image('enemy-1', 'assets/characters/sasquatch.svg');
    this.load.image('enemy-2', 'assets/characters/minotaur.svg');
    this.load.image('enemy-3', 'assets/characters/spikey.svg');
  }

  create() {
    const mx = WIDTH / 2;
    const y = HEIGHT / 2;
    this.add.image(mx, y, 'background');
    this.add.text(mx, y - 110, 'Choose an enemy to battle', OPTION_STYLE).setOrigin(0.5);

    this.button = new Button(
      this,
      mx,
      y + 100,
      'Select',
      this.makeSelection.bind(this)
    );

    this.button.disable();

    const choices = ['minotaur', 'yeti', 'spikey'];
    const dx = 150;
    let x = (WIDTH - dx * (choices.length - 1)) / 2;
    const optionY = y - 10;

    const choiceBoxes = choices.map((choice) => {
      const box = this.add.image(x, optionY, 'rect');
      const img = ENEMY_DATA[choice].img;
      this.add.image(x, optionY, img);

      box.setInteractive({ useHandCursor: true });
      box.on('pointerup', () => {
        choiceBoxes.forEach((box) => box.clearTint());
        box.setTint(YELLOW_TINT);
        this.selectedChoice = choice;
        this.button.enable();
      });

      x += dx;
      return box;
    });
  }

  makeSelection() {
    this.scene.start('Fight', { enemy: this.selectedChoice });
  }
}
