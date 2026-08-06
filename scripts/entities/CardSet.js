// The CardSet handles a character's deck, hand, and discard pile. It does not handle rendering, and should not require Phaser.js

class CardSet {
  constructor(character, deck) {
    this.character = character;
    const cardNames = convertCountsToList(deck || {});
    this.deck = convertNamesToCards(cardNames);
    this.hand = [];
    this.discard = [];
  }

  drawCard() {
    if (this.deck.length > 0) {
      const card = this.deck.pop();
      this.hand.push(card);
      return card;
    } else if (this.discard.length > 0) {
      // Shuffle discard pile into the deck
      this.deck = shuffleArray(this.discard);
      this.discard = [];
      return this.drawCard();
    } else {
      return null; // No cards left to draw
    }
  }

  drawCards(nCards) {
    const drawnCards = [];
    for (let i = 0; i < nCards; i++) {
      const card = this.drawCard();
      if (card) {
        drawnCards.push(card);
      } else {
        break; // No more cards to draw
      }
    }
    return drawnCards;
  }

  discardCard(card) {
    removeFromArray(this.hand, card);
    this.discard.push(card);
  }

  discardHand() {
    this.discard.push(...this.hand);
    this.hand = [];
  }

  removeCardFromHand(card) {
    removeFromArray(this.hand, card);
  }

  shuffle() {
    Phaser.Utils.Array.Shuffle(this.deck);
  }
}