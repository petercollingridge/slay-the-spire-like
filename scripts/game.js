const WIDTH = 1000;
const HEIGHT = 500;

class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
    this.load.image('enemy-1', 'assets/sasquatch.svg');
    this.load.image('card', 'assets/card.svg');
  }

  create() {
    this.add.image(WIDTH / 2, HEIGHT / 2, 'background');
    this.add.image(850, 340, 'enemy-1');

    this.hand = new Hand(this, WIDTH / 2, HEIGHT);
    this.hand.addCards(4);

    this.input.on('dragstart', dragStart.bind(this));
    this.input.on('drag', drag);
    this.input.on('dragend', dragEnd.bind(this));
  }
}

function dragStart(pointer, target) {
  target.setTint(0x0066bb);
  this.hand.bringToFront(target);
}

function drag(pointer, target, dragX, dragY) {
  target.x = dragX;
  target.y = dragY;
}

function dragEnd(pointer, target) {
  target.clearTint();
  // if (target.x <)
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: Game,
};

const game = new Phaser.Game(config);