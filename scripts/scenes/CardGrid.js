class CardGrid {
  constructor(x, y, width, height, cards) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cards = cards;
    this.margin = 10;
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
  }
};
