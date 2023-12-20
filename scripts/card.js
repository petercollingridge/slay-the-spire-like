const CARD_DATA = [
  {
    name: 'Gentle prod',
    img: 'attack',
    effect: { damage: 1 },
  },
  {
    name: 'Strike',
    img: 'attack',
    effect: { damage: 2 },
  },
  {
    name: 'Ultimate smash',
    img: 'attack',
    effect: { damage: 5 },
  },
  {
    name: 'Mighty slash',
    img: 'attack',
    effect: { damage: 3 },
  },
  {
    name: 'Prepare',
    img: 'draw-card',
    effect: { draw: 2 },
  },
];

const startingDeck = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 4];

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
      duration: 200,
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
      this.play();
    } else {
      // Return card to hand
      this.game.hand.reorderHand();
    }
  }

  play() {
    if (this.effect.damage) {
      this.game.enemy.dealDamage(this.effect.damage);
    }
    if (this.effect.draw) {
      this.game.drawCards(this.effect.draw);
    }
    this.game.hand.removeCard(this);
    this.game.discard.addCard(this);
  }
}
