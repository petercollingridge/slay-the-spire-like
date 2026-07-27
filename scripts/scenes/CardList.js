class CardList {
  constructor(scene, name, x, y, width, height) {
    this.scene = scene;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x2 = x + width;
    this.y2 = y + height;
    this.margin = 10;

    this.cards = [];
    this.containerHeight = 20;
    this.containerWidth = width - 2 * this.margin;
    this.cardContainers = [];
    this.selectedCardIndex = null;

    // Light grey background
    const background = scene.add.graphics();
    background.fillStyle(0xffffff, 0.8);
    background.fillRect(x, y + 20, width, height - 20);

    // Add title text
    scene.add.text(x + width / 2, y, name, OPTION_STYLE).setOrigin(0.5);
  }

  addCards(cardCounts) {
    const newCards = createCards(cardCounts, this.scene);
    this.cards.push(...newCards);

    this.cards.forEach((card, index) => {
      if (index >= this.cardContainers.length) {
        this.addCardContainer(card);
      } 
    });
  }

  getContainerPosition(index) {
    const w2 = this.containerWidth / 2;
    const h2 = this.containerHeight / 2;
    const x = this.x + this.margin + w2;
    const y = this.y + this.margin + 20 + index * (this.containerHeight + 2) + h2;
    return { x, y };
  }

  addCardContainer(card) {
    const w2 = this.containerWidth / 2;
    const h2 = this.containerHeight / 2;
    const index = this.cardContainers.length;
    const { x, y } = this.getContainerPosition(index);

    const container = this.scene.add.container(x, y);
    // Make interactive
    container.setSize(this.containerWidth, this.containerHeight);
    container.setInteractive({ useHandCursor: true });

    const background = this.scene.add.graphics();
    background.fillStyle(0xeeeeee, 0.8); // Light grey background
    background.fillRect(-w2, -h2, this.containerWidth, this.containerHeight);
    const cardName = this.scene.add.text(10 - w2, 0, card.data.name, CARD_NAME_STYLE).setOrigin(0, 0.5);

    container.add([background, cardName]);


    // Set up event listeners for the button
    container.on('pointerover', () => {
      background.fillStyle(0xaaccff, 0.8);
      background.fillRect(-w2, -h2, this.containerWidth, this.containerHeight);
    });

    container.on('pointerout', () => {
      background.clear();
      background.fillStyle(0xeeeeee, 0.8);
      background.fillRect(-w2, -h2, this.containerWidth, this.containerHeight);
    });

    container.on('pointerup', () => {
      this.selectCard(card);
    });

    this.cardContainers.push(container);
  }

  selectCard(card) {
    this.selectedCardIndex = this.cards.indexOf(card);
    this.scene.selectCard(this.name, card);
  }

  addCard(card) {
    this.cards.push(card);
    this.addCardContainer(card);
  }

  removeSelectedCard() {
    if (this.selectedCardIndex !== null) {
      this.cards.splice(this.selectedCardIndex, 1);
      this.cardContainers[this.selectedCardIndex].destroy();
      this.cardContainers.splice(this.selectedCardIndex, 1);
      this.selectedCardIndex = null;
      this.updateListPositions();
    }
  }

  updateListPositions() {
    this.cardContainers.forEach((container, index) => {
      const { x, y } = this.getContainerPosition(index);
      container.setPosition(x, y);
    });
  }

};