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

    const iconX = x - this.img.width / 2 + 10;
    const iconY = y + this.img.height / 2 + 10;

    this.shieldStrength = 0;
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

  damage(damage) {
    if (damage > this.shieldStrength) {
      damage -= this.shieldStrength;
      this.showShieldBlock(this.shieldStrength);
      this.shield(-this.shieldStrength);

      const newHealth = Math.max(0, this.health - damage);
      this.setHealth(newHealth);
      this.showDamage(damage);
    } else {
      this.shield(-damage);
      this.showShieldBlock(damage);
    }
  }

  showDamage(damage) {
    if (!damage) { return; }

    const text = this.game.add.text(this.x, this.y, damage, {
      font: '40px Impact',
      fill: '#ffffff'
    });

    this.game.tweens.add({
      targets: text,
      x: '+=0',
      y: '-=300',
      alpha: 0,
      ease: 'cubic.out',
      duration: 1500,
      onComplete: function () {
        text.destroy();
      }
    });
  }

  showHeal(damage) {
    if (!damage) { return; }

    const text = this.game.add.text(this.x, this.y, damage, {
      font: '40px Impact',
      fill: '#0000dd'
    });

    this.game.tweens.add({
      targets: text,
      x: '+=0',
      y: '-=300',
      alpha: 0,
      ease: 'cubic.out',
      duration: 1500,
      onComplete: function () {
        text.destroy();
      }
    });
  }

  showShieldBlock(damage) {
    if (!damage) { return; }

    const x = this.x - this.img.width / 2;
    const y = this.y - 20;

    const text = this.game.add.text(x, y, damage, {
      font: '40px Impact',
      fill: '#ffffff'
    });

    this.game.tweens.add({
      targets: text,
      x: `+=${this.direction * 120 }`,
      alpha: 0,
      duration: 1000,
      ease: 'linear',
      onComplete: function () {
        text.destroy();
      }
    });

    this.game.tweens.add({
      targets: text,
      y: `+=${this.img.height / 2}`,
      ease: 'Bounce',
      duration: 1000,
      yoyo: true
    });
  }

  die() {
    this.dead = true;
    this.img.setTint(0xff0000);
    this.game.characterDies();
  }

  heal(amount) {
    const newHealth = Math.min(this.maxHealth, this.health + amount);
    this.setHealth(newHealth);
    this.showHeal(amount);
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
      this.damage(this.poisonAmount);
    }
  }

  highlight() {
    console.log('highlight character');
  }

  removeHighlight() {
    console.log('removeHighlight character');
  }

  dragEnter(card) {
    const tint = this.isValidDrop(card) ? BLUE_TINT : RED_TINT;
    card.highlight(tint);
  }

  drop(card) {
    if (this.isValidDrop(card)) {
      card.play();
    } else {
      this.game.hand.reorderHand();
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
    this.type = 'enemy';
    this.getDropZone();

    this.direction = -1;
    this.actions = data.actions;

    const iconX = x - this.img.width / 2 + 60;
    const iconY = y + this.img.height / 2 + 10;
    // const icon = new Icon(game, iconX, iconY, 'sword-1', this.attack);
  }

  turn(player) {
    this.startTurn();

    if (this.health > 0) {
      const currentAction = getRand(this.actions);
      console.log(currentAction)

      Object.entries(currentAction).forEach(([name, value]) => {
        if (name === 'damage') {
          player.damage(value);
        } else if (name === 'heal') {
          this.heal(value);
        } else if (name === 'poison') {
          player.poison(value);
        } else if (name === 'shield') {
          this.shield(value);
        }
      })
    }
  }

  isValidDrop(card) {
    return card.canPlay && card.target === 'enemy';
  }
}

class Player extends Character {
  constructor(game, x, y) {
    super(game, PLAYER_DATA, x, y);
    this.type = 'player';
    this.getDropZone();
    this.direction = 1;
  }

  manaBonus(n) {
    this.bonusMana = (this.bonusMana || 0) + n;
  }

  isValidDrop(card) {
    return card.canPlay && card.target === 'self';
  }
}
