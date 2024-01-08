class Deck {
  constructor(game, name, x, y, cardsCounts = {}) {
    this.game = game;
    this.name = name;
    this.x = x;
    this.y = y;
    this.cards = [];
    
    Object.entries(cardsCounts).forEach(([name, count]) => {
      for (let i = 0; i < count; i++) {
        this.cards.push(new Card(game, name));
      }
    });

    this.img = game.add.sprite(x, y, 'card');
    game.add.text(x, y - 36, name, {
      fontSize: '13px', fill: '#000', align: 'center', wordWrap: { width: CARD_WIDTH - 24 }
    }).setOrigin(0.5);
    this.cardCount = game.add.text(x, y, this.cards.length, { fontSize: '24px', fill: '#000' }).setOrigin(0.5);

    // Create dropZone for dragging and dropping cards into this deck
    const dropZone = game.add
      .zone(this.x, this.y, CARD_WIDTH, CARD_HEIGHT)
      .setRectangleDropZone(CARD_WIDTH, CARD_HEIGHT)
      .setName(name);

    dropZone.parent = this;
  }

  size() {
    return this.cards.length;
  }

  addCard(card) {
    this.cards.push(card);
    card.setPosition(this.x, this.y);
    this.updateCount();
  }

  addCards(cards) {
    cards.forEach((card) => this.addCard(card));
  }

  draw() {
    if (this.cards.length > 0) {
      const card = this.cards.pop();
      this.updateCount();
      return card;
    }
  }

  empty() {
    const cards = this.cards;
    this.cards = [];
    this.updateCount();
    return cards;
  }

  highlight(colour) {
    this.img.setTint(colour);
  }

  removeHighlight() {
    this.img.clearTint();
  }

  updateCount() {
    this.cardCount.setText(this.cards.length);
  }

  shuffle() {
    Phaser.Utils.Array.Shuffle(this.cards);
  }

  dragEnter(card) {
    const tint = this.isValidDrop(card) ? BLUE_TINT : RED_TINT;
    this.highlight(tint);
  }

  drop(card) {
    if (this.isValidDrop(card)) {
      this.addCard(card);
    } else {
      this.game.hand.reorderHand();
    }
  }

  // By default it will be invalid to drop a card into a deck
  isValidDrop(card) {
    return false;
  }
}