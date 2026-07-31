// Object to handle player and enemy characters
// Specifically, their health and active spells and enchantments
// This class does not handle rendering, and should not require Phaser.js

class Character {
  constructor(scene, data) {
    this.scene = scene;
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

  enchant(spell) {
    if (spell.source === spell.target) {
      // Character was enchanted by self, so this is a boon, and enters the stack from the bottom
      this.enchantments.push(spell);
    } else {
      // Character was enchanted by enemy, so this is a hex, and enters the stack from the top
      this.enchantments.unshift(spell);
    }
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
  constructor(scene, type, level) {
    const baseData = ENEMY_DATA[type];

    if (!baseData) {
      console.error(`No data for enemy: ${type}`);
    }

    const data = getEnemyData(baseData, level);

    super(scene, data);
    this.type = data.type;
    this.level = data.level;
  }

  turn(player) {
    this.triggerActiveSpells();
    // Enemy AI logic to determine what action to take
  }
}
