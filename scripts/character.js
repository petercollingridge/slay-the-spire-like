const PLAYER_DATA = {
  img: 'player',
  health: 40,
};

const ENEMY_DATA = {
  yeti: {
    img: 'enemy-1',
    health: 20,
    attack: 4,
  },
};

class Character {
  constructor(game, data, x, y) {
    this.game = game;
    this.img = game.add.image(x, y, data.img);
    const txtY = y + this.img.height / 2
    const txtStyle = { fontSize: '16px', fill: '#000' };

    this.maxHealth = data.health;
    this.healthTxt = game.add.text(x, txtY, '', txtStyle).setOrigin(0.5, 0);
    this.setHealth(data.health);
  }

  dealDamage(n) {
    const newHealth = Math.max(0, this.health - n);
    if (newHealth !== this.health) {
      this.setHealth(newHealth);
    }
  }

  setHealth(n) {
    this.health = n;
    this.healthTxt.setText(`${this.health} / ${this.maxHealth}`);
  }
}

class Enemy extends Character {
  constructor(game, name, x, y) {
    const data = ENEMY_DATA[name];

    if (!data) {
      console.error(`No data for enemy: ${name}`);
    }

    super(game, data, x, y);

    this.attack = data.attack;

    const iconTxtStyle = { fontSize: '20px', fill: '#000' };
    const iconX = x - this.img.width / 2 + 20;
    const iconY = y + this.img.height / 2 + 30;
    const attackIcon = game.add.image(iconX, iconY, 'attack');
    attackIcon.displayWidth = 20;
    attackIcon.displayHeight = 20;
    game.add.text(iconX + 14, iconY, this.attack, iconTxtStyle).setOrigin(0, 0.5);
  }
}
