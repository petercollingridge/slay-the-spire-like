class PropertySprite extends Phaser.GameObjects.Container {
  constructor(scene, x, y, value, colour) {
    super(scene, x, y);
    this.value = value;
    this.colour = colour;
    this.circle = scene.add.graphics();
    this.circle.fillStyle(colour, 1);
    this.circle.fillCircle(0, 0, 8);
    this.text = scene.add.text(0, 0, value, CIRCLE_NUM_STYLE).setOrigin(0.5);
    this.add([this.circle, this.text]);
  }

  setValue(value) {
    this.value = value;
    this.text.setText(value);
  }
}

function getCardSprite(scene, data, x, y) {
  const width = CARD_WIDTH;
  const height = CARD_HEIGHT;

  // const cardImg = scene.add.sprite(0, 0, 'card');
  const background = scene.add.graphics();
  background.fillStyle(0xffffff, 1);
  background.fillRoundedRect(-width / 2, 1 - height / 2, width, height, 10);
  background.lineStyle(1, 0x000000, 1);
  background.strokeRoundedRect(-width / 2, 1 - height / 2, width, height, 10);

  const image = scene.add.sprite(0, -13, data.img); 

  const detailY = 12 - height / 2;
  const headerY = 28 - height / 2;
  const cardName = scene.add.text(0, headerY, data.name, CARD_NAME_STYLE).setOrigin(0.5);

  const text = scene.add.text(10 - width / 2, 24, data.text || '', {
    fill: '#202030',
    fontFamily: 'Arial',
    fontSize: '11px',
    wordWrap: { width: width - 20 }
  });

  const elements = [background, image, cardName, text];

  elements.push(new PropertySprite(scene, 12 - width / 2, detailY, data.cost, 0x51814f));
  
  if (data.time) {
    elements.push(new PropertySprite(scene, width / 2 - 30, detailY, data.time, 0x416296));
  }
  if (data.power) {
    elements.push(new PropertySprite(scene, width / 2 - 12, detailY, data.power, 0x8b4348));
  }

  const container = scene.add.container(x, y, elements);
  container.setSize(width, height);
  return container
}

function getSpellSprite(scene, data, x, y) {
  const w2 = SPELL_WIDTH / 2;
  const h2 = SPELL_HEIGHT / 2;

  const background = scene.add.graphics();
  background.fillStyle(0xffffff, 1);
  background.fillRoundedRect(-w2, 1 - h2, SPELL_WIDTH, SPELL_HEIGHT, 5);
  background.lineStyle(1, 0x000000, 1);
  background.strokeRoundedRect(-w2, 1 - h2, SPELL_WIDTH, SPELL_HEIGHT, 5);

  const image = scene.add.sprite(12 - w2, 1, data.img).setScale(0.28);
  const cardName = scene.add.text(24 - w2, 2, data.name, CARD_NAME_STYLE).setOrigin(0, 0.5);

  const timeSprite = new PropertySprite(scene, w2 - 27, 1, data.time, 0x416296);
  const powerSprite = new PropertySprite(scene, w2 - 10, 1, data.power, 0x8b4348);

  const elements = [background, image, cardName, timeSprite, powerSprite];
  const container = scene.add.container(x, y, elements);
  container.setSize(SPELL_WIDTH, SPELL_HEIGHT);

  return { container, timeSprite, powerSprite };
}
