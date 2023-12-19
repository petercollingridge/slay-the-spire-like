class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
    this.load.image('enemy-1', 'assets/sasquatch.svg');
    this.load.image('card', 'assets/cards/card-base.svg');
    this.load.image('attack', 'assets/cards/attack.svg');
  }

  create() {
    // Dropzone, above which dropped cards are played
    this.dropY = HEIGHT - 160;
    this.add.image(WIDTH / 2, HEIGHT / 2, 'background');
    this.add.image(850, HEIGHT / 2 + 40, 'enemy-1');

    this.input.on('dragstart', dragStart.bind(this));
    this.input.on('drag', drag.bind(this));
    this.input.on('dragend', dragEnd.bind(this));

    this.deck = createCards(this, [0, 0, 0, 1, 1, 2]);
    this.shuffleDeck();

    this.hand = new Hand(this, WIDTH / 2, HEIGHT - 60);
    this.drawCards(4);
  }

  drawCard() {
    if (this.deck.length === 0) {
      console.log('No cards left');
      return
    }

    const card = this.deck.pop();
    this.hand.addCard(card);
  }

  drawCards(n) {
    for (let i = 0; i < n; i++) {
      this.drawCard();
    }
  }

  shuffleDeck() {
    Phaser.Utils.Array.Shuffle(this.deck);
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

function playCard(card) {
  this.hand.removeCard(card);
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: Game,
};

const game = new Phaser.Game(config);