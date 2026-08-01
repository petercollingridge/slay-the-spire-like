// Object to handle player and enemy characters
// Specifically, their health and active spells and enchantments
// This class does not handle rendering, and should not require Phaser.js

class Character extends Phaser.Events.EventEmitter {
  constructor(scene, data) {
    super();
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
      this.enchantments.unshift(spell);
      this.emit('updateEnchantments');
      // TODO: Need to reorder spell views
    } else {
      // Character was enchanted by enemy, so this is a hex, and enters the stack from the top
      this.enchantments.push(spell);
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

  triggerDamage(spell, value) {
    // Spell on the stack passes its damage down the stack to the character
    console.log(`Spell effect: ${spell.card.data.name} deals ${value} damage to ${this.data.name}`);
    const index = this.enchantments.indexOf(spell);
    console.log(index);
    this.setHealth(this.health - value);
  }

  tickDownActiveSpells() {
    // Remove a time token from each active spell
    // Make a copy of the array so we can safely remove spells from the original array while iterating
    this.activeSpells.slice().forEach((spell) => {
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
    this.tickDownActiveSpells();
    // Enemy AI logic to determine what action to take
  }
}
