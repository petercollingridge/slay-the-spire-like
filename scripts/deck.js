class Deck {
  constructor(game, cardsIds) {
    this.game = game;
    this.cards = cardsIds.map((id) => new Card(game, id))

    const x = 60;
    const y = HEIGHT - 72;
    const txtY = y - 36;

    game.add.sprite(x, y, 'card');
    game.add.text(x, txtY, 'Draw pile', { fontSize: '13px', fill: '#000' }).setOrigin(0.5);
    this.cardCount = game.add.text(x, y, this.cards.length, { fontSize: '24px', fill: '#000' }).setOrigin(0.5);
  }

  draw() {
    if (this.cards.length === 0) {
      console.log('No cards left');
    } else {
      const card = this.cards.pop();
      this.cardCount.setText(this.cards.length);
      return card;
    }
  }

  shuffle() {
    Phaser.Utils.Array.Shuffle(this.cards);
  }
}