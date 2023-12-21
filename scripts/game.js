class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
    this.load.image('button', 'assets/button.svg');

    this.load.image('enemy-1', 'assets/characters/sasquatch.svg');
    this.load.image('enemy-2', 'assets/characters/minotaur.svg');
    this.load.image('player', 'assets/characters/player.svg');

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
    this.enemy = new Enemy(this, 'minotaur', 825, HEIGHT / 2 - 20);

    this.nextTurnBtn = new Button(
      this,
      WIDTH / 2,
      HEIGHT - 24,
      'End turn',
      this.enemyTurn.bind(this)
    );

    // Display mana/cards spent this turn
    this.manaCount = this.add.text(WIDTH / 2, HEIGHT - 200, '', {
      fill: '#111',
      fontFamily: 'Arial',
      fontSize: '20px',
    }).setOrigin(0.5);
    this.setManaSpent(0)

    // Deck
    this.deck = new Deck(this, 'Draw pile', 60, HEIGHT - 72, startingDeck);
    this.deck.shuffle();

    this.discard = new Deck(this, 'Discard\npile', WIDTH - 60, HEIGHT - 72);

    // Hand
    this.hand = new Hand(this, WIDTH / 2, HEIGHT - 110);
    this.drawCards(HAND_SIZE);

    this.input.on('dragstart', dragStart, this);
    this.input.on('drag', drag, this);
    this.input.on('dragend', dragEnd, this);
  }

  characterDies() {
    if (this.player.dead) {
      this.gameOver();
    } else if (this.enemy.dead) {

    }
  }

  gameOver() {
    this.add.text(WIDTH / 2, HEIGHT / 2, 'GAME OVER', {
      fill: '#600',
      fontFamily: 'Impact',
      fontSize: '80px',
    }).setOrigin(0.5);

    this.hand.disable();
    this.nextTurnBtn.disable();
  }

  drawCard() {
    const card = this.deck.draw();
    if (card) {
      this.hand.addCard(card);
    } else if (this.discard.cards.length) {
      // Shuffle discard pile into the deck
      this.deck.cards = this.discard.empty();
      this.deck.shuffle();
      this.drawCard();
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

  setManaSpent(mana) {
    this.manaSpent = mana;
    this.manaCount.setText(`${this.manaSpent} / ${MAX_MANA}`);
  }

  spendMana(mana) {
    this.setManaSpent(this.manaSpent + mana);
  }

  enemyTurn() {
    this.player.dealDamage(this.enemy.attack);
    this.playerTurn();
  }

  playerTurn() {
    if (!this.player.dead) {      
      this.setManaSpent(0)
      this.drawCardsTo(HAND_SIZE);
    }
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