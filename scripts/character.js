const PLAYER_DATA = {
  img: 'player',
  health: 40,
};

const ENEMY_DATA = {
  minotaur: {
    img: 'enemy-2',
    health: 30,
    attack: 8,
  },
  yeti: {
    img: 'enemy-1',
    health: 20,
    attack: 5,
  },
};

class Character {
  constructor(game, data, x, y) {
    this.game = game;
    this.img = game.add.image(x, y, data.img);
    const txtY = y - this.img.height / 2 + 5;
    const txtStyle = { fontSize: '16px', fill: '#000' };

    this.maxHealth = data.health;
    this.healthTxt = game.add.text(x, txtY, '', txtStyle).setOrigin(0.5, 1);
    this.setHealth(data.health);

    this.shieldStrength = data.shield || 0;
    const iconX = x - this.img.width / 2 + 20;
    const iconY = y + this.img.height / 2 + 10;
    this.shieldIcon = new Icon(game, iconX, iconY, 'shield', this.shieldStrength);
  }

  dealDamage(n) {
    if (n > this.shieldStrength) {
      n -= this.shieldStrength;
      this.shieldIcon.setValue(0);
      const newHealth = Math.max(0, this.health - n);
      this.setHealth(newHealth);
    } else {
      this.shield(-n);
    }
  }

  die() {
    this.dead = true;
    this.img.setTint(0xff0000);
    this.game.characterDies();
  }

  heal(n) {
    const newHealth = Math.min(this.maxHealth, this.health + n);
    this.setHealth(newHealth);
  }

  shield(n) {
    this.shieldStrength += n;
    this.shieldIcon.setValue(this.shieldStrength);
  }

  setHealth(n) {
    this.health = n;
    this.healthTxt.setText(`${this.health} / ${this.maxHealth}`);
    if (this.health <= 0) {
      this.die();
    }
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

    const iconX = x - this.img.width / 2 + 60;
    const iconY = y + this.img.height / 2 + 10;
    const icon = new Icon(game, iconX, iconY, 'attack', this.attack);
  }
}
