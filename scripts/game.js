const WIDTH = 1000;
const HEIGHT = 500;

const BLUE_TINT = 0x0066bb;
const YELLOW_TINT = 0xffff88;

class Game extends Phaser.Scene {
  preload() {
    this.load.image('background', 'assets/background.svg');
    this.load.image('enemy-1', 'assets/sasquatch.svg');
    this.load.image('card', 'assets/card.svg');
  }

  create() {
    this.dropY = HEIGHT - 100;
    this.add.image(WIDTH / 2, HEIGHT / 2, 'background');
    this.add.image(850, HEIGHT / 2 + 40, 'enemy-1');

    this.hand = new Hand(this, WIDTH / 2, HEIGHT);
    this.hand.addCards(4);

    this.input.on('dragstart', dragStart.bind(this));
    this.input.on('drag', drag.bind(this));
    this.input.on('dragend', dragEnd.bind(this));
  }
}

function dragStart(pointer, target) {
  target.setTint(YELLOW_TINT);
  this.hand.bringToFront(target);
  // Save card's current position so we can return it if the card is cancelled
  target.startX = target.x;
  target.startY = target.y;
}

function drag(pointer, target, dragX, dragY) {
  target.x = dragX;
  target.y = dragY;
  const tint = target.y < this.dropY ? BLUE_TINT : YELLOW_TINT;
  target.setTint(tint);
}

function dragEnd(pointer, target) {
  target.clearTint();
  if (target.y < this.dropY) {
    // Use card
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

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: Game,
};

const game = new Phaser.Game(config);