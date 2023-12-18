const WIDTH = 1000;
const HEIGHT = 500;

const BLUE_TINT = 0x0066bb;
const YELLOW_TINT = 0xffff88;

class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
    this.load.image('enemy-1', 'assets/sasquatch.svg');

    Object.keys(CARD_DATA).map((card) => {
      this.load.image(`card-${card}`, `assets/cards/${card}.svg`);
    });
  }

  create() {
    // Dropzone, above which dropped cards are played
    this.dropY = HEIGHT - 100;
    this.add.image(WIDTH / 2, HEIGHT / 2, 'background');
    this.add.image(850, HEIGHT / 2 + 40, 'enemy-1');

    this.deck = startingDeck.map((name) => new Card(this, name));
    Phaser.Utils.Array.Shuffle(this.deck);

    this.hand = new Hand(this, WIDTH / 2, HEIGHT);

    // Draw 4 cards
    this.hand.addCards(this.deck, 4);

    this.input.on('dragstart', dragStart.bind(this));
    this.input.on('drag', drag.bind(this));
    this.input.on('dragend', dragEnd.bind(this));
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
  target.clearTint();
  if (target.y < this.dropY) {
    // Use card
    this.hand.removeCard(target);
  } else {
    // Return card to hand
    this.tweens.add({
      targets: target,
      x: target.startX,
      y: target.startY,
      duration: 150,
      ease: 'Quad.easeIn',
    });
  }
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