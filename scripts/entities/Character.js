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
    this.mana = 0;
    this.maxMana = data.maxMana || 3;
    this.dead = false;

    this.activeSpells = [];
    this.enchantments = [];
  }

  die() {
    this.dead = true;
    this.scene.characterDies();
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
    removeFromArray(this.enchantments, spell);
    this.emit('updateEnchantments');
  }

  playCard(card, target) {
    const spell = new Spell(this.scene, card, this, target);

    if (spell.time) {
      target.emit('addSpell', spell);
    }
  }

  setHealth(value) {
    this.health = Math.max(0, value);
    this.emit('updateHealth', this.health);
    if (this.health <= 0) {
      this.die();
    }
  }

  triggerDamage(spell, damage) {
    // Spell on the stack passes its damage down the stack to the character
    const index = this.enchantments.indexOf(spell);

    for (let i = index - 1; i >= 0; i--) {
      const enchantment = this.enchantments[i];
      if (enchantment.onDamageIn) {
        let updateValue = getCardValue(enchantment.onDamageIn.damage, enchantment);

        if (updateValue < 0) {
          updateValue = Math.max(-damage, updateValue);
          if (updateValue < 0) {
            this.emit('shieldBlock', -updateValue);
          }
        }

        damage = Math.max(0, damage + updateValue);
      }
    }

    this.setHealth(this.health - damage);
  }

  tickDownActiveSpells() {
    // Remove a time token from each active spell
    // Make a copy of the array so we can safely remove spells from the original array while iterating
    this.activeSpells.slice().forEach((spell) => {
      spell.tick();
    });
  }
}

class Player extends Character {
  constructor(scene, data) {
    super(scene, data);
  }

  discard(card) {
    this.scene.discard.addCard(card);
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

  discard(card) {
    // Enemies don't have a discard pile, so just remove the card from play
  }

  turn(player) {
    console.log(`Enemy turn: ${this.data.name}`);
    console.log(player);
    this.tickDownActiveSpells();

    // Add a delay so it's obvious which cards are cleared and which are new

    // Enemy AI logic to determine what action to take
    const cardName = getRand(['Strike', 'Gentle jab', 'Tenderise', "Slice 'n' dice"])
    // const cardName = 'Poison blade';


    const card = { data: CARD_DATA[cardName] };
    this.playCard(card, player);

  }
}
