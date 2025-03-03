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
    const y2 = HEIGHT - y1 * 2;

    this.add.image(MIDX, MIDY + y1, 'deck-builder');
    this.add.text(MIDX, y1, "Deck Builder", OPTION_STYLE).setOrigin(0.5);

    this.zone1 = new CardGrid(this, 'zone1', 0, y1 * 2, MIDX, y2, startingDeck);
    // this.zone2 = new CardGrid(this, 'zone2', MIDX, y1 * 2, MIDX, y2, []);

    this.zone1.showCards();
    // this.zone2.showCards();

    this.selectedCard = null;
  }

  selectCard(card) { }

  dragStart(pointer, target) {
    console.log('Deckbuilder drag start');
    target.depth = 1;
    this.selectedCard = target;
    target.parent.zone.removeCard(target.parent);
  }

  drop(pointer, target) {
    console.log('Deckbuilder drop');
  }

  dropCard(card) {
    console.log('dropCard')
    console.log(card)
    // this.reorderCards(this.unusedCards);
  }

  dragEnter() {
    console.log('Deckbuilder drag enter')
  }

  reorderCards(cards) {
    const positions = this.getCardPositions(cards.length, 0, 40);

    positions.forEach(({ x, y }, index) => {
      cards[index].moveTo(x, y);
    });
  }
};
