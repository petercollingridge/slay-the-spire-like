class DeckBuilder extends DraggableScene {
  constructor() {
    super("DeckBuilder");
  }

  init() {
    super.init();
    console.log('DeckBuilder')
  }

  create() {
    const y1 = 20;

    this.add.image(MIDX, MIDY + y1, 'deck-builder');
    this.add.text(MIDX, y1, "Deck Builder", OPTION_STYLE).setOrigin(0.5);
    
    this.deck = [];
    this.unusedCards = createCards(startingDeck, this);
    this.showCards(this.unusedCards, 0, y1 * 2);
  }

  // Get an array of <n> positions (x, y) for <n> cards
  getCardPositions(n, x, y) {
    const positions = [];
    const margin = 10;
    let cardX = x + margin + CARD_WIDTH * 0.5;
    let cardY = y + margin + CARD_HEIGHT * 0.5;

    for (let i = 0; i < n; i++) {
      positions.push({ x: cardX, y: cardY });
      cardX += CARD_WIDTH + margin;

      if (cardX > WIDTH / 2) {
        cardX = x + margin + CARD_WIDTH * 0.5;
        cardY += margin + CARD_HEIGHT;
      }
    };

    return positions;
  }

  showCards(cards, x, y) {
    const positions = this.getCardPositions(cards.length, x, y);

    cards.forEach((card, index) => {
      const position = positions[index];
      card.setPosition(position.x, position.y);
      card.show();
    });
  }

  selectCard(card) {

  }

  dropCard(card) {
    
    this.reorderCards(this.unusedCards);
  }

  reorderCards(cards) {
    const positions = this.getCardPositions(cards.length, 0, 40);

    positions.forEach(({ x, y }, index) => {
      cards[index].moveTo(x, y);
    });
  }
};
