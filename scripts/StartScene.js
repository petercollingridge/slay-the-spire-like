class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image('background', 'assets/option-background.svg');
    this.load.image('rect', 'assets/characters/choice-outline.svg');
    this.load.image('button', 'assets/button.svg');
    this.load.image('card', 'assets/cards/card-base.svg');
    this.load.image('card-large', 'assets/cards/card-base-large.svg');
    
    this.load.image('enemy-1', 'assets/characters/sasquatch.svg');
    this.load.image('enemy-2', 'assets/characters/minotaur.svg');
    this.load.image('enemy-3', 'assets/characters/spikey.svg');
    this.load.image('enemy-4', 'assets/characters/poison-demon.svg');

    this.load.image('arrow-1', 'assets/cards/arrow-1.svg');
    this.load.image('sword-1', 'assets/cards/sword-1.svg');
    this.load.image('sword-2', 'assets/cards/sword-2.svg');
    this.load.image('sword-3', 'assets/cards/sword-3.svg');
    this.load.image('sword-4', 'assets/cards/sword-4.svg');
    this.load.image('sword-magic', 'assets/cards/sword-magic.svg');
    this.load.image('sword-poison', 'assets/cards/sword-poison.svg');
    this.load.image('sword-spinning', 'assets/cards/sword-spinning.svg');
    this.load.image('heart', 'assets/cards/heart.svg');
    this.load.image('draw-card', 'assets/cards/draw.svg');
    this.load.image('potion', 'assets/cards/potion.svg');
    this.load.image('poison-mushroom', 'assets/cards/poison-mushroom.svg');
    this.load.image('sickness', 'assets/cards/sickness.svg');
    this.load.image('fangs', 'assets/cards/fangs.svg');
    this.load.image('shield', 'assets/cards/shield.svg');
    this.load.image('shield-magic', 'assets/cards/shield-magic.svg');
    this.load.image('scythe', 'assets/cards/scythe.svg');
  }

  create() {
    const background = this.add.image(MIDX, MIDY, 'background');
    this.add.text(MIDX, MIDY - 40, 'Click to start', IMPACT_STYLE).setOrigin(0.5);

    background.setInteractive();
    background.on('pointerup', () => {
      this.scene.start('EnemyChoice', { choices: getMonstersToFight(3) });
    });
  }
}
