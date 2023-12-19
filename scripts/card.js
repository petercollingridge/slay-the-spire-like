const CARD_DATA = [
  {
    name: 'Gentle prod',
    img: 'attack',
    effect: 'DAMAGE 1',
  },
  {
    name: 'Strike',
    img: 'attack',
    effect: 'DAMAGE 2',
  },
  {
    name: 'Mighty slash',
    img: 'attack',
    effect: 'DAMAGE 3',
  },
];

class Card {
  constructor(game, id) {
    const data = CARD_DATA[id];

    this.game = game;
    this.effect = data.effect;

    // Create a sprite and text
    this.cardImg = game.add.sprite(0, 0, 'card');
    const image = game.add.sprite(0, 5, data.img);
    const text = game.add.text(0, -44, data.name, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '11px',
    }).setOrigin(0.5);

    this.container = game.add.container(60, HEIGHT - 80, [this.cardImg, image, text]);
    this.container.parent = this;

    this.container.setSize(this.cardImg.width, this.cardImg.height);
    this.container.setInteractive();
    game.input.setDraggable(this.container);
    this.container.setVisible(false);
  };

  show() {
    this.container.setVisible(true);
  }

  hide() {
    this.container.setVisible(false);
  }

  moveTo(x, y, rotation = 0) {
    this.game.tweens.add({
      targets: this.container,
      x,
      y,
      rotation,
      duration: 150,
      ease: 'Sine.easeOut',
    });
  }

  dragStart() {
    this.cardImg.setTint(YELLOW_TINT);
    this.game.hand.bringToFront(this);
    // Save card's current position so we can return it if the card is cancelled
    this.startX = this.container.x;
    this.startY = this.container.y;
  }

  drag() {
    const tint = this.container.y < this.game.dropY ? BLUE_TINT : YELLOW_TINT;
    this.cardImg.setTint(tint);
  }

  dragEnd() {
    this.cardImg.clearTint();
    if (this.container.y < this.game.dropY) {
      // Use card
      this.game.hand.removeCard(this);
    } else {
      // Return card to hand
      this.game.hand.reorderHand();
    }
  }
}

function createCards(game, cards) {
  return cards.map((id) => new Card(game, id));
}
