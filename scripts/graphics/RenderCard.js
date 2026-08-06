class PropertySprite extends Phaser.GameObjects.Container {
  constructor(scene, x, y, value, colour) {
    super(scene, x, y);
    this.value = value || 0;
    this.colour = colour;
    this.circle = scene.add.graphics();
    this.circle.fillStyle(colour, 1);
    this.circle.fillCircle(0, 0, 8);
    this.text = scene.add.text(0.5, -0.5, value, CARD_PROP_STYLE).setOrigin(0.5);
    this.add([this.circle, this.text]);
  }

  setValue(value) {
    this.value = value || 0;
    this.text.setText(value);
  }
}

class RenderCard {
  constructor(scene, name) {
    const data = CARD_DATA[name];

    if (!data) {
      console.error(`No data for card: ${name}`);
    }

    this.data = data;
    this.scene = scene;

    // Copy some values from data to make look up easier
    this.cost = data.cost;
    this.effect = data.effect || {};
    this.target = data.target;

    // Create a sprite and text
    this.container = getCardSprite(scene, data, 60, HEIGHT - 80);
    this.container.parent = this;
    this.cardImg = this.container.list[0];

    // Make card draggable
    this.container.setInteractive();
    scene.input.setDraggable(this.container);
    this.container.setVisible(false);

    this.container.on('pointerdown', () => {
      // this.cardImg.setTint(YELLOW_TINT);
      this.scene.selectCard(this);
    });
  };

  show() {
    this.container.setVisible(true);
  }

  hide() {
    this.container.setVisible(false);
  }

  moveTo(x, y, rotation = 0) {
    this.scene.tweens.add({
      targets: this.container,
      x,
      y,
      rotation,
      duration: 240,
      ease: 'Sine.easeOut',
    });
  }

  setPosition(x, y, rotation = 0) {
    this.container.x = x;
    this.container.y = y;
    this.container.rotation = rotation;
  }

  disable() {
    this.container.disableInteractive();
    this.setTint(GREY_TINT);
  }

  enable() {
    this.container.setInteractive();
    this.clearTint();
  }

  dragStart() {
    // Save card's current position so we can return it if the card is cancelled
    this.startX = this.container.x;
    this.startY = this.container.y;
  }

  dragEnd() {
    // Return card to hand
    this.clearTint();
    this.scene.drop(this);
  }

  setPlayability(availableMana) {
    if (this.cost <= availableMana) {
      this.enable()
    } else {
      this.disable();
    }
  }

  setTint(tint) {
    // this.cardImg.setTint(tint);
  }

  clearTint() { 
    // this.cardImg.clearTint();
  }
}

// Get and array of card object from an objecting mapping card name to count
function createCards(cardCounts, scene) {
  const cards = [];
  Object.entries(cardCounts).forEach(([name, count]) => {
    for (let i = 0; i < count; i++) {
      cards.push(new RenderCard(scene, name));
    }
  });
  return cards;
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
  elements.push(new PropertySprite(scene, width / 2 - 30, detailY, data.time, 0x416296));
  elements.push(new PropertySprite(scene, width / 2 - 12, detailY, data.power, 0x8b4348));

  const container = scene.add.container(x, y, elements);
  container.setSize(width, height);
  return container
}
