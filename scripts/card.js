class Card {
  constructor(game, name) {
    const data = CARD_DATA[name];

    this.data = data;
    this.game = game;

    // Copy some values from data to make look up easier
    this.cost = data.cost;
    this.effect = data.effect;
    this.target = data.target;

    // Keep track of how many times this card was cast during the game
    // Used for some card effects
    this.castCount = 0;

    // Create a sprite and text
    this.container = getCardSprite(game, data, 60, HEIGHT - 80);
    this.container.parent = this;
    this.cardImg = this.container.list[0];

    // Make card draggable
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
    this.setTint(GREY_TINT);
  }

  enable() {
    this.container.setInteractive();
    this.clearTint();
  }

  dragStart() {
    this.canPlay = this.cost <= this.game.maxMana - this.game.manaSpent;
    // Save card's current position so we can return it if the card is cancelled
    this.startX = this.container.x;
    this.startY = this.container.y;
  }

  dragEnd() {
    // Return card to hand
    this.clearTint();
    this.game.hand.reorderHand();
  }

  setPlayability(availableMana) {
    if (this.cost <= availableMana) {
      this.enable()
    } else {
      this.disable();
    }
  }

  setTint(tint) {
    this.cardImg.setTint(tint);
  }

  clearTint() { 
    this.cardImg.clearTint();
  }

  play(target) {
    this.game.spendMana(this.cost);
    this.castCount++;
    this.game.hand.removeCard(this);

    if (this.effect.damage) {
      let value = getCardValue(this.effect.damage, this);
      value += this.game.player.attackBonus;
      target.damage(value);
    }
    if (this.effect.draw) {
      const value = getCardValue(this.effect.draw, this);
      this.game.drawCards(value);
    }
    if (this.effect.heal) {
      const value = getCardValue(this.effect.heal, this);
      target.heal(value);
    }
    if (this.effect.poison) {
      const value = getCardValue(this.effect.poison, this);
      target.poison(value);
    }
    if (this.effect.shield) {
      const value = getCardValue(this.effect.shield, this);
      target.shield(value);
    }
    if (this.effect.special) {
      this.effect.special(this);
    }
    if (this.effect.store) {
      const value = getCardValue(this.effect.store, this);
      this.game.player.manaBonus(value);
    }

    if (this.effect.enchant) {
      target.enchant(this);
    } else if (!this.data.oneUse) {
      // Add card to discard pile after it's effect is resolved, unless it's one use only
      this.game.discard.addCard(this);
    }
  }
}

function getCardSprite(scene, data, x, y) {
  const cardImg = scene.add.sprite(0, 0, 'card');
  const image = scene.add.sprite(0, -20, data.img);

  const headerY = 15 - cardImg.height / 2;
  const cardName = scene.add.text(7, headerY, data.name, CARD_NAME_STYLE).setOrigin(0.5);

  const cost = scene.add.text(13 - cardImg.width / 2, headerY - 1, data.cost, CIRCLE_NUM_STYLE).setOrigin(0.5);

  const text = scene.add.text(10 - cardImg.width / 2, 18, data.text || '', {
    fill: '#202030',
    fontFamily: 'Arial',
    fontSize: '11px',
    wordWrap: { width: cardImg.width - 20 }
  });

  const container = scene.add.container(x, y, [cardImg, image, cost, cardName, text]);
  container.setSize(cardImg.width, cardImg.height);
  return container
}
