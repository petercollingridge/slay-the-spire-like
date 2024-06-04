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
    this.unusedCardGrid = new CardGrid(0, y1 * 2, WIDTH / 2, HEIGHT - y1 * 2, this.unusedCards);
    this.unusedCardGrid.showCards();
  }

  selectCard(card) { }

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
