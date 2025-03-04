class CardGrid {
  constructor(scene, name, x, y, width, height, cards) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.margin = 10;

    this.zone = scene.add.zone(x + width / 2, y + height / 2, width, height).setRectangleDropZone(width, height);
    this.zone.name = name;
    scene.zones[name] = this;

    this.cards = createCards(cards, scene);
    this.cards.forEach((card) => {
      card.zone = this;
    })
  }

  // Get an array of <n> positions for <n> cards
  getCardPositions(n) {
    const positions = [];
    let cardX = this.x + this.margin + CARD_WIDTH * 0.5;
    let cardY = this.y + this.margin + CARD_HEIGHT * 0.5;

    for (let i = 0; i < n; i++) {
      positions.push({ x: cardX, y: cardY });
      cardX += CARD_WIDTH + this.margin;

      if (cardX > WIDTH / 2) {
        cardX = this.x + this.margin + CARD_WIDTH * 0.5;
        cardY += this.margin + CARD_HEIGHT;
      }
    };

    return positions;
  }

  showCards() {
    const positions = this.getCardPositions(this.cards.length);

    this.cards.forEach((card, index) => {
      const position = positions[index];
      card.setPosition(position.x, position.y);
      card.show();
    });

    this.scene.add.graphics()
    .lineStyle(2, 0x0000ff)
    .strokeRect(this.x, this.y, this.width, this.height);
  }

  reorganiseCards() {
    const positions = this.getCardPositions(this.cards.length);
    positions.forEach(({ x, y, rotation }, index) => {
      this.cards[index].moveTo(x, y, rotation);
      this.cards[index].container.depth = index;
    });
  }

  dropCard(card, position) {
    const { x, y } = position.position;
    const row = Math.max(0, Math.floor((y - this.y - this.margin / 2) / (CARD_HEIGHT + this.margin)));
    const col = Math.max(0, Math.floor((x - this.x - this.margin / 2) / (CARD_WIDTH + this.margin)));
    const nCols = Math.floor((this.width - this.margin) / (CARD_WIDTH + this.margin));
    const cardIndex = Math.min(row * nCols + col, this.cards.length);
    this.addCard(card, cardIndex);
  }

  addCard(card, index) {
    if (index === undefined) {
      this.cards.push(card)
    } else {
      this.cards.splice(index, 0, card);
    }
    this.reorganiseCards();
  }

  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index === -1) {
      console.error('card not found');
      console.error(card);
      return;
    }

    // Remove card from hand and from sprites
    this.cards.splice(index, 1);
    this.reorganiseCards();
    // card.hide();
  }
  
};
