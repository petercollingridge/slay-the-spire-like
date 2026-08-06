// Code for displaying player and enemy characters, and handling drag and drop events for playing cards on them.

class RenderCharacter {
  constructor(game, character, x, y, size = 120, direction = 1) {
    this.game = game;
    this.character = character;
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.highlightImg = game.add.image(x, y, 'highlight');
    this.highlightImg.setVisible(false);

    this.img = game.add.image(x, y, character.data.img);
    this.img.setDisplaySize(size * this.img.width / this.img.height, size);

    const txtX = x - this.direction * 20;
    const txtY = y + this.img.displayHeight / 2 + 5;
    const txtStyle = { fontSize: '16px', fill: '#000' };

    this.maxHealth = character.data.health;
    this.healthTxt = game.add.text(txtX, txtY, '', txtStyle).setOrigin(0.5, 0);
    this.setHealth(character.data.health);

    this.spellViews = [];

    character.on("addSpell", (spell) => {
      this.addSpellView(spell);
    });

    character.on("shieldBlock", (amount) => {
      this.showShieldBlock(amount);
    });

    character.on("updateEnchantments", () => {
      this.spellViews.forEach((spellView) => {
        spellView.updatePosition();
      });
    });

    character.on("updateHealth", (amount) => {
      this.setHealth(amount);
    });
  }

  dragEnter(card) {     
    const valid = this.isValidDrop(card);
    card.setTint(valid ? BLUE_TINT : RED_TINT);
    if (valid) {
      this.highlight();
    }
  }

  drop(card) {
    if (this.isValidDrop(card)) {
      // Play the card - the source will be the player
      this.game.playCard(card, this.game.player, this.character);
    } else {
      this.game.hand.reorderHand();
    }
    this.clearTint();
  }

  getDropZone() {
    const dropZone = this.game.add
      .zone(this.x, this.y, this.img.displayWidth, this.img.displayHeight)
      .setRectangleDropZone(this.img.displayWidth * 1.5, this.img.displayHeight * 1.5)
      .setName(this.type);

    dropZone.parent = this;
  }

  addSpellView(spell) {
    const spellView = new SpellView(this.game, spell, this);
    this.spellViews.push(spellView);
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

  setHealth(value) {
    this.healthTxt.setText(`${value} / ${this.maxHealth}`);
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

    const x = this.x - this.img.displayWidth / 2;
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
  constructor(game, character, x, y) {    
    super(game, character, x, y - 40, 200, -1);
    this.type = 'enemy';
    this.getDropZone();
  }

  turn(player) {
    this.startTurn();

    if (this.health > 0) {
      Object.entries(this.currentAction).forEach(([name, value]) => {
        if (name === 'damage') {
          this.dealDamage(player, value)
        } else if (name === 'curse') {
          for (let i = 0; i < value; i++) {
            const card = new RenderCard(this.game, 'Curse');
            this.game.discard.addCard(card);
          }
        }
      })
    }
  }

  isValidDrop(card) {
    return ['enemy', 'any'].includes(card.target);
  }
}

class RenderPlayer extends RenderCharacter {
  constructor(game, character, x, y) {
    super(game, character, x, y + 20, 160, 1);
    this.type = 'player';
    this.getDropZone();
  }

  isValidDrop(card) {
    return ['self', 'any'].includes(card.target);
  }
}
