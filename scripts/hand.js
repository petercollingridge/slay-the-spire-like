// Object dealing with cards in the player's hand
class Hand {
  constructor(game, x, y) {
    this.game = game;
    this.cards = [];

    // Radius of circle formed by cards, but we only every show an arc
    this.r = 320;
    this.x = x;
    this.y = y + this.r;
  }

  // Draw <n> cards from <deck> into hand
  // Determine the location and rotation of each card
  addCards(deck, n) {
    this.getCardPositions(n).forEach(({ x, y, rotation }, index) => {
      const card = deck[index];
      card.createSprite(x, y, rotation, index);
      this.cards.push(card);
    });
  }

  addCard(card) {
    this.cards.push(card);
    card.show();
    this.reorderHand();
  }

  // Animate cards to move into nice positions
  reorderHand() {
    const positions = this.getCardPositions(this.cards.length);
    positions.forEach(({ x, y, rotation }, index) => {
      this.cards[index].moveTo(x, y, rotation);
    });
  }

  bringToFront(card) {
    // Move all cards on top of this one level down
    this.moveCardsDown(card.depth)

    // Move this card to the top
    card.depth = this.cards.length - 1;
  }

  // Get an array of <n> positions (x, y, rotation) for <n> cards fanned out in the hand
  getCardPositions(n) {
    const positions = [];
    for (let i = 0; i < n; i++) {
      // Index of card relative to the middle card
      const p = i - (n - 1) / 2;
      const angle = Phaser.Math.DegToRad(p * 12);
      const x = this.x + Math.sin(angle) * this.r * 1.5;
      const y = this.y - Math.cos(angle) * this.r;
      positions.push({ x, y, rotation: angle });
    }
    return positions;
  }

  // Move all cards above the targetDepth down
  moveCardsDown(targetDepth = 0) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].container.depth > targetDepth) {
        this.cards[i].container.depth--;
      }
    }
  }

  disable() {
    this.cards.forEach((card) => card.disable());
  }

  hide() {
    this.cards.forEach((card) => card.hide());
  }

  // Remove the given card from the hand and reorganise the rest of the cards in the hand
  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index === -1) {
      console.error('card not found');
      console.error(card);
      return;
    }

    // Remove card from hand and from sprites
    this.cards.splice(index, 1);
    card.hide();

    // Move any cards on top of this one down to keep depth in a sensible range
    this.moveCardsDown(card.depth);

    this.reorderHand();
  }

  size() {
    return this.cards.length;
  }
}