class Card {
  constructor(game, name) {
    const data = CARD_DATA[name];

    this.game = game;
    this.effect = data.effect;

    // Create a sprite and text
    this.cardImg = game.add.sprite(0, 0, 'card');
    const image = game.add.sprite(0, -20, data.img);
    const text = game.add.text(0, 18 - this.cardImg.height / 2, name, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '12px',
    }).setOrigin(0.5);

    this.container = game.add.container(60, HEIGHT - 80, [this.cardImg, image, text]);
    this.container.parent = this;

    this.container.setSize(this.cardImg.width, this.cardImg.height);
    this.container.setInteractive();
    game.input.setDraggable(this.container);
    this.container.setVisible(false);

    this.container.on('pointerdown', () => {
      this.cardImg.setTint(YELLOW_TINT);
      game.hand.bringToFront(this.container);
    });
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

  setPosition(x, y, rotation = 0) {
    this.container.x = x;
    this.container.y = y;
    this.container.rotation = rotation;
  }

  disable() {
    this.container.disableInteractive();
  }

  dragStart() {
    this.canPlay = this.game.manaSpent < this.game.maxMana;
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
      this.game.manaSpent < this.game.maxMana) {
      this.play();
    } else {
      // Return card to hand
      this.game.hand.reorderHand();
    }
  }

  play() {
    this.game.spendMana(1);
    this.game.hand.removeCard(this);
    this.game.discard.addCard(this);

    if (this.effect.damage) {
      const damage = getCardValue(this.effect.damage, this.game);
      this.game.enemy.dealDamage(damage);
    }
    if (this.effect.draw) {
      this.game.drawCards(this.effect.draw);
    }
    if (this.effect.heal) {
      this.game.player.heal(this.effect.heal);
    }
    if (this.effect.poison) {
      this.game.enemy.poison(this.effect.poison);
    }
    if (this.effect.shield) {
      this.game.player.shield(this.effect.shield);
    }
    if (this.effect.store) {
      this.game.player.manaBonus(this.effect.store);
    }
  }
}
