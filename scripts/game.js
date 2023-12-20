class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
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
    this.player = new Character(this, PLAYER_DATA, 180, HEIGHT / 2 + 30);
    this.enemy = new Character(this, ENEMY_DATA.yeti, 850, HEIGHT / 2 + 30);

    this.input.on('dragstart', dragStart.bind(this));
    this.input.on('drag', drag.bind(this));
    this.input.on('dragend', dragEnd.bind(this));

    // Deck
    this.deck = new Deck(this, [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 4]);
    this.deck.shuffle();

    // Hand
    this.hand = new Hand(this, WIDTH / 2, HEIGHT - 60);
    this.drawCards(4);
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