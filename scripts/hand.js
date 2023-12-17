// Object dealing with cards in the player's hand

const CARD_WIDTH = 96;
const CARD_HEIGHT = 120;

class Hand {
  constructor(game, x, y) {
    this.game = game;
    this.cards = [];

    // Radius of circle formed by cards, but we only every show an arc
    this.r = 200;
    this.x = x;
    this.y = y + this.r;
  }

  addCards(n) {
    for (let i = 0; i < n; i++) {
      // Index of card relative to the middle card
      const p = i - (n - 1) / 2;
      const angle = Phaser.Math.DegToRad(p * 12);
      const x = this.x + Math.sin(angle) * this.r * 1.5;
      const y = this.y - Math.cos(angle) * this.r;

      const card = this.game.add.sprite(x, y, 'card');

      // Rotate around the bottom of the card
      card.setOrigin(0.5, 1);
      card.rotation = angle;

      card.depth = i;
      card.setInteractive({ draggable: true });
      this.cards.push(card);
    }
  }

  bringToFront(card) {
    const n = this.cards.length;
    const currentDepth = card.depth;

    // Move all cards on top of this one level down
    for (let i = 0; i < n; i++) {
      if (this.cards[i].depth > currentDepth) {
        this.cards[i].depth--;
      }
    }

    // Move this card to the top
    card.depth = n - 1;
  }
}