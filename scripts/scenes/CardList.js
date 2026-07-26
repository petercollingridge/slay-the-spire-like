class CardList {
  constructor(scene, name, x, y, width, height) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x2 = x + width;
    this.y2 = y + height;
    this.margin = 10;
    this.offset = 0;
    this.cards = [];
    this.cardHeight = 20;
    this.cardWidth = width - 2 * this.margin;

    const background = scene.add.graphics();
    background.fillStyle(0xffffff, 0.8); // Light grey background
    background.fillRect(x, y, width, height);

  }

  addCards(cardCounts) {
    const newCards = createCards(cardCounts, this.scene);
    this.cards.push(...newCards);
  }

  showCards() {
    this.cards.forEach((card, index) => {
      const cardX = this.x + this.margin;
      const cardY = this.y + this.margin + index * (this.cardHeight + 2);

      const container = this.scene.add.container(cardX, cardY);
      const background = this.scene.add.graphics();
      background.fillStyle(0xeeeeee, 0.8); // Light grey background
      background.fillRect(cardX, cardY, this.cardWidth, this.cardHeight);
      const cardName = this.scene.add.text(cardX + 10, cardY + this.cardHeight / 2, card.data.name, CARD_NAME_STYLE).setOrigin(0, 0.5);

      // Make interactive
      container.setSize(this.width, this.cardHeight);
      container.setInteractive({ useHandCursor: true });

      // Set up event listeners for the button
      container.on('pointerover', () => {
        background.fillStyle(0xaaccff, 0.8);
        background.fillRect(cardX, cardY, this.cardWidth, this.cardHeight);
      });

      container.on('pointerout', () => {
        background.clear();
        background.fillStyle(0xeeeeee, 0.8);
        background.fillRect(cardX, cardY, this.width - 2 * this.margin, this.cardHeight);
      });


    });
  }
};