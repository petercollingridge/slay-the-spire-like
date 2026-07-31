// Object to handle player and enemy characters
// Specifically, their health and active spells and enchantments
// This class does not handle rendering, and should not require Phaser.js

class Character {
  constructor(data) {
    this.data = data;
    this.maxHealth = data.health;
    this.health = data.health;
    this.dead = false;

    this.activeSpells = [];
    this.enchantments = [];
  }

  die() {
    this.dead = true;
  }

  enchant(card) {
    this.enchantments.push(new Spell(this, card));
  }

  disenchant(spell) {
    const index = this.enchantments.indexOf(spell);
    this.enchantments.splice(index, 1);
  }

  setHealth(value) {
    this.health = Math.max(0, value);
    if (this.health <= 0) {
      this.die();
    }
  }

  triggerActiveSpells() {
    console.log('Trigger active spells');

    // Reduce the time of each spell in play by 1
    // and remove them if their energy reaches 0
    this.activeSpells.forEach((spell) => {
      spell.tick();
    });
  }

}

class Enemy extends Character {
  constructor(type, level) {
    const baseData = ENEMY_DATA[type];

    if (!baseData) {
      console.error(`No data for enemy: ${type}`);
    }

    const data = getEnemyData(baseData, level);

    super(data);
    this.type = data.type;
    this.level = data.level;
  }
}
