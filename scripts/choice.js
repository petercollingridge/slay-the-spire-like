class Choice extends Phaser.Scene {
  constructor(name) {
    super(name);
  }

  init(data) {
    this.choices = data.choices;
  }

  create() {
    this.add.image(MIDX, MIDY, 'background');
    this.add.text(MIDX, MIDY - 144, this.title, OPTION_STYLE).setOrigin(0.5);

    this.button = new Button(
      this,
      MIDX,
      MIDY + 140,
      'Select',
      this.makeSelection.bind(this)
    );

    this.button.disable();

    const dx = 180;
    let x = (WIDTH - dx * (this.choices.length - 1)) / 2;
    const optionY = MIDY - 5;

    const choiceImages = this.choices.map((choice) => {
      const data = this.choiceData[choice];
      const card = this.getSprite(data, x, optionY);

      card.setInteractive({ useHandCursor: true });
      card.on('pointerup', () => {
        choiceImages.forEach((box) => box.clearTint());
        card.setTint(YELLOW_TINT);
        this.selectedChoice = choice;
        this.button.enable();
      });

      x += dx;
      return card;
    });
  }

  addText(x, y, txt) {
    this.add.text(x, y, txt, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '13px',
    }).setOrigin(0);
  }
}

class EnemyChoice extends Choice {
  constructor() {
    super("EnemyChoice");
    this.choiceData = ENEMY_DATA;
    this.title = 'Choose an enemy to battle';
  }

  getSprite(data, x, y) {
    const cardImg = this.add.sprite(x, y, 'card-large');
    const image = this.add.sprite(x, y - 20, data.img);
  
    // Card name
    this.add.text(x, y - cardImg.height / 2 + 25, data.name, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '16px',
    }).setOrigin(0.5);
  
    const textX = x - image.width / 2 + 2;
    let textY = y + 44;
    const dy = 18;

    this.addText(textX, textY, `Health: ${data.health}`);
    textY += dy;
    this.addText(textX, textY, `Attack: ${data.attack}`);
    textY += dy;

    if (data.shield) {
      this.addText(textX, textY, `Shield: ${data.shield}`);
      textY += dy;
    }
    if (data.poisonAttack) {
      const poison = data.poisonAttack;
      this.addText(textX, textY, `Poison: ${poison.amount} (${poison.chance * 100}%)`);
      textY += dy;
    }
  
    return cardImg;
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

  getSprite(data, x, y) {
    const card = getCardSprite(this, data, x, y);
    return card.list[0];
  }

  makeSelection() {
    // Add chosen card to player's deck
    startingDeck[this.selectedChoice] = (startingDeck[this.selectedChoice] || 0) + 1;
    this.scene.start('EnemyChoice', { choices: getMonstersToFight(3) });
  }
}
