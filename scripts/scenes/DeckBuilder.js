class DeckBuilder extends Phaser.Scene {
  constructor() {
    super("DeckBuilder");
  }

  init() {
  }

  create() {
    const y1 = 20;

    this.add.image(MIDX, MIDY + y1, 'deck-builder');
    this.add.text(MIDX, y1, "Deck Builder", OPTION_STYLE).setOrigin(0.5);
    
    this.deck = [];
    this.unusedCards = createCards(startingDeck, this);
    this.showCards(this.unusedCards, 0, y1 * 2);
  }

  showCards(cards, x, y) {
    const margin = 10;
    let cardX = x + margin + CARD_WIDTH * 0.5;
    let cardY = y + margin + CARD_HEIGHT * 0.5;

    this.unusedCards.forEach((card, index) => {
      card.setPosition(cardX, cardY);
      card.show();
      cardX += CARD_WIDTH + margin;

      if (cardX > WIDTH / 2) {
        cardX = x + margin + CARD_WIDTH * 0.5;
        cardY += margin + CARD_HEIGHT;
      }
    });
  }
};
