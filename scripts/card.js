class Card {
  constructor(game, name) {
    const data = CARD_DATA[name];

    this.game = game;
    this.effect = data.effect;
    this.target = data.target;
    this.oneUse = data.oneUse;
    this.castCount = 0;

    // Create a sprite and text
    this.cardImg = game.add.sprite(0, 0, 'card');
    const image = game.add.sprite(0, -20, data.img);

    const cardName = game.add.text(0, 18 - this.cardImg.height / 2, name, {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '12px',
    }).setOrigin(0.5);

    const text = game.add.text(12 - this.cardImg.width / 2, 18, data.text || '', {
      fill: '#202030',
      fontFamily: 'Arial',
      fontSize: '11px',
      wordWrap: { width: this.cardImg.width - 24 }
    });

    this.container = game.add.container(60, HEIGHT - 80, [this.cardImg, image, cardName, text]);
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
  }

  dragEnter(zone) {
    if (!this.canPlay) {
      this.cardImg.setTint(RED_TINT);
    } else if (zone.name === 'player') {
      this.cardImg.setTint(this.target === 'self' ? BLUE_TINT : RED_TINT);
    } else {
      this.cardImg.setTint(this.target === 'enemy' ? BLUE_TINT : RED_TINT);
    }
  }

  dragLeave() {
    this.cardImg.setTint(YELLOW_TINT);
  }

  dragEnd() {
    // Return card to hand
    this.cardImg.clearTint();
    this.game.hand.reorderHand();
  }

  drop(zone) {
    this.cardImg.clearTint();
    if (this.canPlay) {
      this.play();
    } else {
      this.game.hand.reorderHand();
    }
  }

  play() {
    this.game.spendMana(1);
    this.castCount++;
    this.game.hand.removeCard(this);

    if (this.effect.damage) {
      const value = getCardValue(this.effect.damage, this);
      this.game.enemy.dealDamage(value);
    }
    if (this.effect.draw) {
      const value = getCardValue(this.effect.draw, this);
      this.game.drawCards(value);
    }
    if (this.effect.heal) {
      const value = getCardValue(this.effect.heal, this);
      this.game.player.heal(value);
    }
    if (this.effect.poison) {
      const value = getCardValue(this.effect.poison, this);
      this.game.enemy.poison(value);
    }
    if (this.effect.shield) {
      const value = getCardValue(this.effect.shield, this);
      this.game.player.shield(value);
    }
    if (this.effect.store) {
      const value = getCardValue(this.effect.store, this);
      this.game.player.manaBonus(value);
    }

    // Add card to discard pile after it's effect is resolved, unless it's one use only
    if (!this.oneUse) {
      this.game.discard.addCard(this);
    }
  }
}
