class Card {
  constructor(game, name) {
    const data = CARD_DATA[name];

    this.data = data;
    this.game = game;

    // Copy some values from data to make look up easier
    this.cost = data.cost;
    this.effect = data.effect || {};
    this.enchant = data.enchant;
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

    if (Array.isArray(this.effect)) {
      this.effect.forEach((effect) => this._applyEffect(effect, target));
    } else {
      this._applyEffect(this.effect, target);
    }

    if (this.enchant) {
      const value = getCardValue(this.enchant.energy, this);
      target.enchant(this, value);
    } else if (!this.data.oneUse) {
      // Add card to discard pile after it's effect is resolved, unless it's one use only
      this.game.discard.addCard(this);
    }
  }

  _applyEffect(effect, target) {
    if (effect.damage) {
      const value = getCardValue(effect.damage, this);
      this.game.player.dealDamage(target, value);
    }
    if (effect.draw) {
      const value = getCardValue(effect.draw, this, target);
      this.game.drawCards(value);
    }
    if (effect.heal) {
      const value = getCardValue(effect.heal, this);
      target.heal(value);
    }
    if (effect.special) {
      effect.special(this, target);
    }
    if (effect.store) {
      const value = getCardValue(effect.store, this);
      this.game.player.manaBonus(value);
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

// Get and array of card object from an objecting mapping card name to count
function createCards(cardCounts, scene) {
  const cards = [];
  Object.entries(cardCounts).forEach(([name, count]) => {
    for (let i = 0; i < count; i++) {
      cards.push(new Card(scene, name));
    }
  });
  return cards;
}