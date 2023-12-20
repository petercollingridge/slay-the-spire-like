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

    // Enemy
    const enemyX = 850;
    const enemyY = HEIGHT / 2 + 40;
    const enemyImg = this.add.image(enemyX, enemyY, 'enemy-1');
    this.enemyHealth = 20;
    this.enemyHealthTxt = this.add.text(
      enemyX,
      enemyY + enemyImg.height / 2,
      `${this.enemyHealth} / 20`,
      { fontSize: '16px', fill: '#000' }
    ).setOrigin(0.5, 0);

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

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: Game,
};

const game = new Phaser.Game(config);