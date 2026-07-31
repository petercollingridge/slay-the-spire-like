// Code for displaying player and enemy characters, and handling drag and drop events for playing cards on them.

class RenderCharacter {
  constructor(game, obj, x, y) {
    this.game = game;
    this.obj = obj;
    this.x = x;
    this.y = y;

    this.highlightImg = game.add.image(x, y, 'highlight');
    this.highlightImg.setVisible(false);
    this.img = game.add.image(x, y, obj.data.img);

    const txtY = y - this.img.height / 2 + 5;
    const txtStyle = { fontSize: '16px', fill: '#000' };

    this.maxHealth = obj.data.health;
    this.healthTxt = game.add.text(x, txtY, '', txtStyle).setOrigin(0.5, 1);
    this.setHealth(obj.data.health);
  }

  dragEnter(card) {
    if (card.canPlay) {      
      const valid = this.isValidDrop(card);
      card.setTint(valid ? BLUE_TINT : RED_TINT);
      if (valid) {
        this.highlight();
      }
    }
  }

  drop(card) {
    console.log('RenderCharacter drop');
    if (this.isValidDrop(card)) {
      // Play the card - the source will be the player
      this.game.playCard(card, this.game.player, this.obj);
    } else {
      this.game.hand.reorderHand();
    }
    this.clearTint();
  }

  getDropZone() {
    const dropZone = this.game.add
      .zone(this.x, this.y, this.img.width, this.img.height)
      .setRectangleDropZone(this.img.width * 1.5, this.img.height * 1.5)
      .setName(this.type);

    dropZone.parent = this;
  }

  // dealDamage(target, amount) {
  //   this._getEnchantmentsOfType('attack').forEach((attack) => {
  //     amount = attack.effect(amount);
  //   });
  //   target.takeDamage(amount);
  // }

  // takeDamage(damage) {
  //   // Check for shielding enchantments
  //   this._getEnchantmentsOfType('shield').forEach((shield) => {
  //     if (damage >= shield.energy) {
  //       // Shield destroyed
  //       damage -= shield.energy;
  //       this.showShieldBlock(shield.energy);
  //       shield.setValue(0);
  //     } else {
  //       // Damage fully blocked
  //       this.showShieldBlock(damage);
  //       shield.setValue(shield.energy - damage);
  //       damage = 0;
  //     }
  //   });

  //   if (damage) {
  //     this.setHealth(this.health - damage);
  //     this.showDamage(damage);
  //   }
  // }

  // die() {
  //   this.dead = true;
  //   this.img.setTint(0xff0000);
  //   this.game.characterDies();
  // }

  // enchant(card, energy) {
  //   // Create icon
  //   const enchantment = new Enchantment(this, card, energy);
  //   this.enchantments.push(enchantment);
  // }

  // disenchant(enchantment) {
  //   enchantment.disenchant();
  // }

  heal(amount) {
    const newHealth = Math.min(this.maxHealth, this.health + amount);
    this.setHealth(newHealth);
    this.showHeal(amount);
  }

  setHealth(n) {
    n = Math.max(0, n);
    this.health = n;
    this.healthTxt.setText(`${this.health} / ${this.maxHealth}`);
    if (this.health <= 0) {
      this.die();
    }
  }

  showDamage(damage) {
    if (!damage) { return; }

    const x = this.x + Phaser.Math.Between(-30, 30);
    const text = this.game.add.text(x, this.y, damage, {
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

    const x = this.x + Phaser.Math.Between(-30, 30);
    const text = this.game.add.text(x, this.y, damage, {
      font: '40px Impact',
      fill: '#0000dd'
    });

    this.game.tweens.add({
      targets: text,
      x: '+=0',
      y: '-=300',
      alpha: 0,
      ease: 'cubic.out',
      duration: 2000,
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

  startTurn() {
    // // Activate start of turn enchantments
    // this._getEnchantmentsOfType('start').forEach((enchantment) => {
    //   enchantment.effect(this, enchantment);
    // });

    // // Reduce the energy of each enchantment by 1
    // // and remove them if their energy reaches 0
    // for (let i = this.enchantments.length - 1; i >= 0; i--)  {
    //   const enchantment = this.enchantments[i];
    //   enchantment.setValue(enchantment.energy - 1);
    // }
  }

  highlight() {
    this.highlightImg.setVisible(true);
  }

  clearTint() {
    this.highlightImg.setVisible(false);
  }
}

class RenderEnemy extends RenderCharacter {
  constructor(game, obj, x, y) {    
    super(game, obj, x, y);
    this.type = 'enemy';
    this.getDropZone();

    this.direction = -1;

    const txtStyle = { fontSize: '16px', fill: '#000', fontFamily: 'Arial' };
    this.actionText = game.add.text(x, y - this.img.height / 2 - 24, 'Test', txtStyle).setOrigin(0.5);
  }

  turn(player) {
    this.startTurn();

    if (this.health > 0) {
      Object.entries(this.currentAction).forEach(([name, value]) => {
        if (name === 'damage') {
          this.dealDamage(player, value)
        } else if (name === 'heal') {
          this.heal(value);
        } else if (name === 'poison') {
          player.enchant({ data: ENEMY_CARDS.poison }, value);
        } else if (name === 'shield') {
          this.enchant({ data: ENEMY_CARDS.shield }, value);
        } else if (name === 'curse') {
          for (let i = 0; i < value; i++) {
            const card = new Card(this.game, 'Curse');
            this.game.discard.addCard(card);
          }
        }
      })
    }
  }

  isValidDrop(card) {
    return card.canPlay && ['enemy', 'any'].includes(card.target);
  }
}

class RenderPlayer extends RenderCharacter {
  constructor(game, obj, x, y) {
    super(game, obj, x, y);
    this.type = 'player';
    this.getDropZone();
    this.direction = 1;
  }

  isValidDrop(card) {
    return card.canPlay && ['self', 'any'].includes(card.target);
  }
}
