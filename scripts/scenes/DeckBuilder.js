// TODO
// Sort by card name and/or rarity
// Double click to add/remove card

class DeckBuilder extends DraggableScene {
  constructor() {
    super("DeckBuilder");
  }

  init() {
    super.init();
  }

  create() {
    const y1 = 20;

    this.add.image(MIDX, MIDY + y1, 'deck-builder');
    this.add.text(MIDX, y1, "Deck Builder", OPTION_STYLE).setOrigin(0.5);

    const LIST_WIDTH = 320;
    const LIST_Y1 = 60
    const LIST_Y2 = HEIGHT - LIST_Y1 - 20;
    this.zone1 = new CardList(this, 'Unused cards', 20, LIST_Y1, LIST_WIDTH, LIST_Y2);
    this.zone2 = new CardList(this, 'Deck', WIDTH - 20 - LIST_WIDTH, LIST_Y1, LIST_WIDTH, LIST_Y2);

    this.zone1.addItems(firstPack);
    this.zone2.addItems(startingDeck);

    this.addCardButton = new Button(
      this,
      {x: MIDX, y: MIDY + 140, text: 'Add to deck', trigger: () => this.addCard() }
    );

    this.removeCardButton = new Button(
      this,
      {x: MIDX, y: MIDY + 140, width: 180, text: 'Remove from deck', trigger: () => this.removeCard() }
    );

    const continueButton = new Button(
      this,
      {x: MIDX, y: HEIGHT - 36, width: 180, text: 'Continue', trigger: () => this.continue() }
    );

    this.zone1.selectItem(0);
  }

  continue() {
    this.scene.start('EnemyChoice', { choices: getMonstersToFight(3) });
  }

  selectCard(zone, card) {
    // Show selected card in the middle of the screen
    const x = MIDX - CARD_WIDTH / 2;
    const cardSprite = getCardSprite(this, card.data, MIDX, MIDY);
    this.selectedCard = card;

    // Show the add or remove button
    if (zone === 'Deck') {
      this.zone1.deselectItem();
      this.addCardButton.hide();
      this.removeCardButton.show();
    } else if (zone === 'Unused cards') {
      this.zone2.deselectItem();
      this.addCardButton.show();
      this.removeCardButton.hide();
    }
  }

  deselectCard() {
    if (this.selectedCard) {
      this.selectedCard = null;
      this.addCardButton.hide();
      this.removeCardButton.hide();
    }
  }

  addCard() {
    this.zone2.addItem(this.selectedCard);
    this.zone1.removeSelectedItem();
  }

  removeCard() {
    this.zone1.addItem(this.selectedCard);
    this.zone2.removeSelectedItem();
  }
};
