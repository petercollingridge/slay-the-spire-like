class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
    this.load.image('button', 'assets/button.svg');
    this.load.image('enemy-1', 'assets/sasquatch.svg');
    this.load.image('player', 'assets/player.svg');
    this.load.image('card', 'assets/cards/card-base.svg');
    this.load.image('attack', 'assets/cards/attack.svg');
    this.load.image('draw-card', 'assets/cards/draw.svg');
  }

  create() {
    // Dropzone, above which dropped cards are played
    this.dropY = HEIGHT - 160;
    this.add.image(WIDTH / 2, HEIGHT / 2, 'background');

    // Draw Player and Enemy characters
    this.player = new Character(this, PLAYER_DATA, 200, HEIGHT / 2);
    this.enemy = new Character(this, ENEMY_DATA.yeti, 850, HEIGHT / 2);

    this.nextTurnBtn = new Button(this, WIDTH / 2, HEIGHT - 24, 'End turn');

    // Deck
    this.deck = new Deck(this, 'Draw pile', 60, HEIGHT - 72, startingDeck);
    this.deck.shuffle();

    this.discard = new Deck(this, 'Discard pile', WIDTH - 60, HEIGHT - 72, []);

    // Hand
    this.hand = new Hand(this, WIDTH / 2, HEIGHT - 110);
    this.drawCards(4);

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

  drawCards(n) {
    for (let i = 0; i < n; i++) {
      this.drawCard();
    }
  }

  discardCard(card) {
    this.discard.addCard(card);
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