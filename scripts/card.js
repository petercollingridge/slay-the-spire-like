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
    name: 'Mighty slash',
    img: 'attack',
    effect: { damage: 3 },
  },
  {
    name: 'Ultimate smash',
    img: 'attack-2',
    effect: { damage: 5 },
  },
  {
    name: 'Prepare',
    img: 'draw-card',
    effect: { draw: 2 },
  },
  {
    name: 'Heal',
    img: 'heart',
    effect: { heal: 8 },
  },
  {
    name: 'Shield',
    img: 'shield',
    effect: { shield: 6 },
  },
];

const startingDeck = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 6, 6, 6];

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
      duration: 240,
      ease: 'Sine.easeOut',
    });
  }

  dragStart() {
    this.game.hand.bringToFront(this);
    this.canPlay = this.game.manaSpent < MAX_MANA;
    // Save card's current position so we can return it if the card is cancelled
    this.startX = this.container.x;
    this.startY = this.container.y;
  }

  drag() {
    if (!this.canPlay) {
      this.cardImg.setTint(RED_TINT);
    } else if (this.container.y < this.game.dropY) {
      this.cardImg.setTint(BLUE_TINT);
    } else {
      this.cardImg.setTint(YELLOW_TINT);
    }
  }

  dragEnd() {
    this.cardImg.clearTint();
    if (this.container.y < this.game.dropY &&
      this.game.manaSpent < MAX_MANA) {
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
    if (this.effect.heal) {
      this.game.player.heal(this.effect.heal);
    }
    if (this.effect.shield) {
      this.game.player.shield(this.effect.shield);
    }
    this.game.spendMana(1);
    this.game.hand.removeCard(this);
    this.game.discard.addCard(this);
  }
}
