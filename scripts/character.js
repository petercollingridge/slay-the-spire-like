class Character {
  constructor(game, data, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
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

  getDropZone() {
    const dropZone = this.game.add
      .zone(this.x, this.y, this.img.width, this.img.height)
      .setRectangleDropZone(this.img.width * 1.5, this.img.height * 1.5)
      .setName(this.type);

    dropZone.parent = this;
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

  manaBonus(n) {
    this.bonusMana = (this.bonusMana || 0) + n;
  }

  poison(n) {
    if (!this.shieldStrength) {
      this.poisonAmount = Math.max(0, this.poisonAmount + n);
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

  startTurn() {
    if (this.poisonAmount) {
      this.dealDamage(this.poisonAmount);
    }
  }

  highlight() {
    console.log('highlight character');
  }

  removeHighlight() {
    console.log('removeHighlight character');
  }
}

class Enemy extends Character {
  constructor(game, name, x, y) {
    const data = ENEMY_DATA[name];

    if (!data) {
      console.error(`No data for enemy: ${name}`);
    }
    
    super(game, data, x, y);
    this.type = 'enemy';

    this.attack = data.attack;
    this.poisonAttack = data.poisonAttack;

    const iconX = x - this.img.width / 2 + 60;
    const iconY = y + this.img.height / 2 + 10;
    const icon = new Icon(game, iconX, iconY, 'sword-1', this.attack);
  }

  turn(player) {
    this.startTurn();

    if (this.health > 0) {
      player.dealDamage(this.attack);

      if (this.poisonAttack && Math.random() < this.poisonAttack.chance) {
        player.poison(this.poisonAttack.amount);
      }
    }
  }
}

class Player extends Character {
  constructor(game, x, y) {
    super(game, PLAYER_DATA, x, y);
    this.type = 'player';
    this.getDropZone();
  }
}
