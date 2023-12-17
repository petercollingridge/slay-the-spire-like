class Example extends Phaser.Scene {
  preload () {
    this.load.image('background', 'assets/background.svg');
    this.load.image('enemy-1', 'assets/sasquatch.svg');
    this.load.image('card', 'assets/card.svg');
  }

  create () {
    this.add.image(500, 300, 'background');
    this.add.image(850, 340, 'enemy-1');

    this.hand = new Hand(this, 500, 600);
    this.hand.addCards(4);

    const dragStart = (pointer, target) => {
      target.setTint(0x0066bb);
      this.hand.bringToFront(target);
    };
    
    const dragEnd = (pointer, target) => {
      target.clearTint();
    };
    
    const drag = (pointer, target, dragX, dragY) => {
      target.x = dragX;
      target.y = dragY;
    };

    this.input.on('dragstart', dragStart);
    this.input.on('drag', drag);
    this.input.on('dragend', dragEnd);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scene: Example,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 400 }
      }
  }
};

const game = new Phaser.Game(config);