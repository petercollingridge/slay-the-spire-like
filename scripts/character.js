const PLAYER_DATA = {
  img: 'player',
  health: 40,
};

const ENEMY_DATA = {
  yeti: {
    img: 'enemy-1',
    health: 20,
    attack: 2,
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
    this.setHealth(data.health)
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
