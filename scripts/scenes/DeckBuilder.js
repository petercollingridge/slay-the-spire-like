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
    this.zone1 = new CardList(this, 'Unused cards', 20, LIST_Y1, LIST_WIDTH, LIST_Y2);
    this.zone2 = new CardList(this, 'Deck', WIDTH - 20 - LIST_WIDTH, LIST_Y1, LIST_WIDTH, LIST_Y2);

    this.zone1.addCards(startingDeck);
    this.zone2.addCards({});

    this.selectedCard = null;

    this.addCardButton = new Button(
      this,
      {x: MIDX, y: MIDY + 140, text: 'Add to deck', trigger: () => this.addCard() }
    );

    this.removeCardButton = new Button(
      this,
      {x: MIDX, y: MIDY + 140, width: 180, text: 'Remove from deck', trigger: () => this.removeCard() }
    );

    this.addCardButton.hide();
    this.removeCardButton.hide();
  }

  selectCard(zone, card) {
    if (this.selectedCard) {
      // Deselect previous card
      // this.selectedCard.clearTint();
    }

    const x = MIDX - CARD_WIDTH / 2;
    const cardSprite = getCardSprite(this, card.data, MIDX, MIDY);
    this.selectedCard = card;

    if (zone === 'Deck') {
      this.addCardButton.hide();
      this.removeCardButton.show();
    } else if (zone === 'Unused cards') {
      this.addCardButton.show();
      this.removeCardButton.hide();
    }

  }

  update() {
    const pointer = this.input.activePointer;
    // this.zone1.mouseOver(pointer.x, pointer.y);
    // this.zone2.mouseOver(pointer.x, pointer.y);
  }

  addCard() {
    this.zone1.removeSelectedCard();
    this.zone2.addCard(this.selectedCard);
    this.selectedCard = null;
    this.addCardButton.hide();
    this.removeCardButton.hide();
  }

  removeCard() {
    this.zone1.addCard(this.selectedCard);
    this.zone2.removeSelectedCard();
    this.selectedCard = null;
    this.addCardButton.hide();
    this.removeCardButton.hide();
  }
};
