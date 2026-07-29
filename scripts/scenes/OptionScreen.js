class Choice extends Phaser.Scene {
  constructor(name) {
    super(name);
  }

  init(data) {
    this.choices = data.choices;
  }

  create() {
    const dx = 180;
    const optionY = MIDY - 5;

    this.add.image(MIDX, MIDY, 'background');
    this.add.text(MIDX, MIDY - 144, this.title, OPTION_STYLE).setOrigin(0.5);


    this.selectButton = new Button(
      this,
      { x: MIDX, y: MIDY + 140, text: 'Fight', trigger: () => this.makeSelection() }
    );
    this.selectButton.disable();

    this.deckButton = new Button(
      this,
      { x: MIDX - dx, y: MIDY + 140, text: 'Cards', trigger: () => this.scene.start('DeckBuilder') }
    );


    let x = (WIDTH - dx * (this.choices.length - 1)) / 2;
    const choiceImages = this.choices.map((choice) => {
      const data = this.choiceData[choice];
      const card = this.getSprite(data, x, optionY);

      card.img.setInteractive({ useHandCursor: true });
      card.img.on('pointerup', () => {
        choiceImages.forEach((box) => box.img.clearTint());
        card.img.setTint(YELLOW_TINT);
        this.selectedChoice = { name: choice, data: card.data };
        this.selectButton.enable();
      });

      x += dx;
      return card;
    });
  }

  addText(x, y, txt) {
    this.add.text(x, y, txt, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '12px',
    }).setOrigin(0);
  }

  addCircleNum(x, y, cardImg, txt) {
    const textY = y - cardImg.height / 2 + 26;
    this.add.text(x, textY, txt, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '13px',
    }).setOrigin(0.5);
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
    const image = this.add.sprite(x, y - 14, data.img);
  
    // Card name
    const fontSize = Math.min(16, Math.ceil(144 / (data.name.length + 2)));
    this.add.text(x, y - cardImg.height / 2 + 26, data.name, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: `${fontSize}px`,
    }).setOrigin(0.5);
  
    // Get level for this specific enemy
    const pHigherLevel = (data.defeated || 0) / (1 + (data.defeated || 0));
    data.level = (data.baseLevel || 1) + (Math.random() < pHigherLevel ? 1 : 0);

    // Get data for enemy of this level
    const enemyData = getEnemyData(data, data.level);
    enemyData.test = true;

    // Health
    let textY = y - cardImg.height / 2 + 22;
    this.add.text(x - image.width / 2 + 8, textY, enemyData.health, CIRCLE_NUM_STYLE).setOrigin(0.5);

    // Level
    this.add.text(x + image.width / 2 - 7, textY, data.level || 1, CIRCLE_NUM_STYLE).setOrigin(0.5);

    // Show enemy actions
    const textX = x - image.width / 2;
    textY = y + 50;
    const dy = 16;

    enemyData.actions.forEach((action) => {
      this.addText(textX, textY, actionToString(action));
      textY += dy;
    })
  
    return { img: cardImg, data: enemyData };
  }

  makeSelection() {
    this.scene.start('Fight', {
      enemyType: this.selectedChoice.name,
      enemyLevel: this.selectedChoice.data.level,
    });
  }
}

class CardChoice extends Choice {
  constructor() {
    super("CardChoice");
    this.choiceData = PLAYER_CARDS;
    this.title = 'Choose a new card for your deck';
  }

  getSprite(data, x, y) {
    const card = getCardSprite(this, data, x, y);
    return { img: card.list[0], data: data.name };
  }

  makeSelection() {
    // Add chosen card to player's deck
    const cardName = this.selectedChoice.name;
    startingDeck[cardName] = (startingDeck[cardName] || 0) + 1;
    this.scene.start('EnemyChoice', { choices: getMonstersToFight(3) });
  }
}
