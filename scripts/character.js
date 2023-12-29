const PLAYER_DATA = {
  img: 'player',
  health: 40,
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
    const iconX = x - this.img.width / 2 + 10;
    const iconY = y + this.img.height / 2 + 10;
    this.shieldIcon = new Icon(game, iconX, iconY, 'shield', this.shieldStrength);

    this.poisonAmount = 0;
    this.poisonIcon = new Icon(game, iconX + 90, iconY, 'skull', this.poisonAmount);
  }

  dealDamage(damage) {
    if (damage > this.shieldStrength) {
      damage -= this.shieldStrength;
      this.shield(-this.shieldStrength);
      const newHealth = Math.max(0, this.health - damage);
      this.setHealth(newHealth);
    } else {
      this.shield(-damage);
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

  poison(n) {
    if (!this.shieldStrength) {
      this.poisonAmount += n;
      this.poisonIcon.setValue(this.poisonAmount);
    }
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
    const icon = new Icon(game, iconX, iconY, 'sword-1', this.attack);
  }

  turn(player) {
    if (this.poisonAmount) {
      this.dealDamage(this.poisonAmount);
    }

    if (this.health > 0) {
      player.dealDamage(this.attack);
    }
  }
}
