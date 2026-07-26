class DeckBuilder extends DraggableScene {
  constructor() {
    super("DeckBuilder");
  }

  init() {
    super.init();
    console.log('DeckBuilder');
  }

  create() {
    const y1 = 20;

    this.add.image(MIDX, MIDY + y1, 'deck-builder');
    this.add.text(MIDX, y1, "Deck Builder", OPTION_STYLE).setOrigin(0.5);

    // this.zone1 = new CardGrid(this, 'zone1', 0, y1 * 2, MIDX, y2, startingDeck);
    // this.zone2 = new CardGrid(this, 'zone2', MIDX, y1 * 2, MIDX, y2, {'Gentle jab': 2});

    const LIST_WIDTH = 320;
    const LIST_Y1 = 60
    const LIST_Y2 = HEIGHT - LIST_Y1 - 20;
    this.zone1 = new CardList(this, 'zone1', 20, LIST_Y1, LIST_WIDTH, LIST_Y2);
    this.zone2 = new CardList(this, 'zone2', WIDTH - 10 - LIST_WIDTH, LIST_Y1, LIST_WIDTH, LIST_Y2);

    this.zone1.addCards(startingDeck);
    this.zone2.addCards({'Gentle jab': 2});
    this.zone1.showCards();
    this.zone2.showCards();

    this.selectedCard = null;
  }

  dragStart(pointer, target) {
    console.log('Deckbuilder drag start');
    target.depth = 100;
    this.selectedCard = target;
    target.parent.zone.removeCard(target.parent);
  }

  dragEnter() {
    console.log('Deckbuilder drag enter')
  }

  dragLeave() {}

  dropCard(card) {
    console.log('dropCard')
  }

  update() {
    const pointer = this.input.activePointer;
    // this.zone1.mouseOver(pointer.x, pointer.y);
    // this.zone2.mouseOver(pointer.x, pointer.y);
  }
};
