class Choice extends Phaser.Scene {
  constructor(name) {
    super(name);
  }

  init(data) {
    this.choices = data.choices;
  }

  create() {
    this.add.image(MIDX, MIDY, 'background');
    this.add.text(MIDX, MIDY - 110, this.title, OPTION_STYLE).setOrigin(0.5);

    this.button = new Button(
      this,
      MIDX,
      MIDY + 100,
      'Select',
      this.makeSelection.bind(this)
    );

    this.button.disable();

    const dx = 150;
    let x = (WIDTH - dx * (this.choices.length - 1)) / 2;
    const optionY = MIDY - 10;

    const choiceBoxes = this.choices.map((choice) => {
      const box = this.add.image(x, optionY, 'rect');
      const img = this.choiceData[choice].img;
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
}

class EnemyChoice extends Choice {
  constructor() {
    super("EnemyChoice");
    this.choiceData = ENEMY_DATA;
    this.title = 'Choose an enemy to battle';
  }

  makeSelection() {
    this.scene.start('Fight', { enemy: this.selectedChoice });
  }
}

class CardChoice extends Choice {
  constructor() {
    super("CardChoice");
    this.choiceData = CARD_DATA;
    this.title = 'Choose a new card for your deck';
  }

  makeSelection() {
    // Add chosen card to player's deck
    startingDeck[this.selectedChoice] = (startingDeck[this.selectedChoice] || 0) + 1;
    this.scene.start('EnemyChoice', { choices: getMonstersToFight(3) });
  }
}
