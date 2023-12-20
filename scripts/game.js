class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
    this.load.image('button', 'assets/button.svg');
    this.load.image('enemy-1', 'assets/sasquatch.svg');
    this.load.image('player', 'assets/player.svg');

    this.load.image('card', 'assets/cards/card-base.svg');
    this.load.image('attack', 'assets/cards/attack.svg');
    this.load.image('attack-2', 'assets/cards/mighty-sword.svg');
    this.load.image('heart', 'assets/cards/heart.svg');
    this.load.image('shield', 'assets/cards/shield.svg');
    this.load.image('draw-card', 'assets/cards/draw.svg');
  }

  create() {
    // Dropzone, above which dropped cards are played
    this.dropY = HEIGHT - 160;
    this.add.image(WIDTH / 2, HEIGHT / 2, 'background');

    // Draw Player and Enemy characters
    this.player = new Character(this, PLAYER_DATA, 200, HEIGHT / 2 - 20);
    this.enemy = new Enemy(this, 'yeti', 825, HEIGHT / 2 - 20);

    this.nextTurnBtn = new Button(
      this,
      WIDTH / 2,
      HEIGHT - 24,
      'End turn',
      this.enemyTurn.bind(this)
    );

    // Deck
    this.deck = new Deck(this, 'Draw pile', 60, HEIGHT - 72, startingDeck);
    this.deck.shuffle();

    this.discard = new Deck(this, 'Discard\npile', WIDTH - 60, HEIGHT - 72, []);

    // Hand
    this.hand = new Hand(this, WIDTH / 2, HEIGHT - 110);
    this.drawCards(5);

    this.input.on('dragstart', dragStart.bind(this));
    this.input.on('drag', drag.bind(this));
    this.input.on('dragend', dragEnd.bind(this));
  }

  drawCard() {
    const card = this.deck.draw();
    if (card) {
      this.hand.addCard(card);
    }
  }

  drawCards(nCards) {
    for (let i = 0; i < nCards; i++) {
      this.drawCard();
    }
  }

  drawCardsTo(maxCards) {
    const nCards = maxCards - this.hand.cards.length;
    if (nCards > 0) {
      this.drawCards(nCards);
    }
  }

  discardCard(card) {
    this.discard.addCard(card);
  }

  enemyTurn() {
    this.player.dealDamage(this.enemy.attack);
    this.playerTurn();
  }

  playerTurn() {
    this.drawCardsTo(5);
  }
}

function dragStart(pointer, target) {
  target.parent.dragStart();
}

function drag(pointer, target, dragX, dragY) {
  target.x = dragX;
  target.y = dragY;
  target.parent.drag();
}

function dragEnd(pointer, target) {
  target.parent.dragEnd();
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: Game,
};

const game = new Phaser.Game(config);