const CARD_DATA = {
  'attack-1': {
    effect: 'DAMAGE 1',
  },
  'attack-2': {
    effect: 'DAMAGE 2',
  },
  'attack-3': {
    effect: 'DAMAGE 3',
  },
};

class Card {
  constructor(game, id) {
    this.game = game;
    this.img = `card-${id}`;
    this.effect = CARD_DATA[id];
  };

  createSprite(x, y, rotation, depth) {
    const sprite = this.game.add.sprite(x, y, this.img);

    this.sprite = sprite;
    sprite.parent = this;

    // Rotate around the bottom of the card
    sprite.setOrigin(0.5, 1);
    sprite.rotation = rotation;

    sprite.depth = depth;
    sprite.setInteractive({ draggable: true });
    return sprite;
  }

  dragStart() {
    this.sprite.setTint(YELLOW_TINT);
    this.game.hand.bringToFront(this);
    // Save card's current position so we can return it if the card is cancelled
    this.startX = this.sprite.x;
    this.startY = this.sprite.y;
  }

  drag() {
    const tint = this.sprite.y < this.game.dropY ? BLUE_TINT : YELLOW_TINT;
    this.sprite.setTint(tint);
  }

  dragEnd() {
    this.sprite.clearTint();
    if (this.sprite.y < this.game.dropY) {
      // Use card
      this.game.hand.removeCard(this);
    } else {
      // Return card to hand
      this.animateTo(this.startX, this.startY);
    }
  }

  animateTo(x, y) {
    this.game.tweens.add({
      targets: this,
      x,
      y,
      duration: 150,
      ease: 'Quad.easeIn',
    });
  }
}

const startingDeck = [
  'attack-1',
  'attack-1',
  'attack-1',
  'attack-2',
  'attack-2',
  'attack-3',
];
