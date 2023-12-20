class Deck {
  constructor(game, name, x, y, cardsIds) {
    this.game = game;
    this.cards = cardsIds.map((id) => new Card(game, id))

    game.add.sprite(x, y, 'card');
    game.add.text(x, y - 36, name, { fontSize: '13px', fill: '#000' }).setOrigin(0.5);
    this.cardCount = game.add.text(x, y, this.cards.length, { fontSize: '24px', fill: '#000' }).setOrigin(0.5);
  }

  addCard(card) {
    this.cards.push(card);
    this.updateCount();
  }

  draw() {
    if (this.cards.length === 0) {
      console.log('No cards left');
    } else {
      const card = this.cards.pop();
      this.updateCount();
      return card;
    }
  }

  updateCount() {
    this.cardCount.setText(this.cards.length);
  }

  shuffle() {
    Phaser.Utils.Array.Shuffle(this.cards);
  }
}