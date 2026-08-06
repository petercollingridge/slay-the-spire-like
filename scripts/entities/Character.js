// Object to handle player and enemy characters
// Specifically, their health and active spells and enchantments
// This class does not handle rendering, and should not require Phaser.js

class Character extends Phaser.Events.EventEmitter {
  constructor(scene, data, deck) {
    super();
    this.scene = scene;
    this.data = data;
    this.maxHealth = data.health;
    this.health = data.health;
    this.mana = 0;
    this.maxMana = data.maxMana || 3;
    this.dead = false;

    this.cards = new CardSet(this, deck || {});
    this.cards.shuffle();

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
    } else {
      // Character was enchanted by enemy, so this is a hex, and enters the stack from the top
      this.enchantments.push(spell);
    }
  }

  disenchant(spell) {
    removeFromArray(this.enchantments, spell);
    this.emit('updateEnchantments');
  }

  setHealth(value) {
    this.health = Math.max(0, value);
    this.emit('updateHealth', this.health);
    if (this.health <= 0) {
      this.die();
    }
  }

  startTurn() {
    this.cards.drawCards(5);
    this.updateMana(this.maxMana);
    this.tickDownActiveSpells();
    console.log(this.cards.hand);
  }

  endTurn() {
    this.cards.discardHand();
  }

  playCard(card, target) {
    this.updateMana(this.mana - card.data.cost);
    this.cards.removeCardFromHand(card);

    // Playing a card creates a spell, which is added to the target's enchantments
    const spell = new Spell(this.scene, card, this, target);

    if (spell.time) {
      target.emit('addSpell', spell);
    }
  }

  updateMana(amount) {
    this.mana = amount;
    this.emit('updateMana', this.mana, this.maxMana);
  }

  triggerDamage(spell, damage) {
    // Spell on the stack passes its damage down the stack to the character
    const index = this.enchantments.indexOf(spell);

    for (let i = index - 1; i >= 0; i--) {
      const enchantment = this.enchantments[i];
      if (enchantment.onDamagePass) {
        // TODO: Trigger onDamagePass for enchantments, which may modify the damage value

        // Increase damage from hexes, or reduce damage from boons
        const damageValue = getCardValue(enchantment.onDamagePass.damage, enchantment);
        damage = Math.max(0, damage + damageValue);

        let blockValue = getCardValue(enchantment.onDamagePass.block, enchantment);
        blockValue = Math.min(blockValue, damage);
        damage -= blockValue;

        if (blockValue) {
          // Show shields blocking damage
          this.emit('shieldBlock', blockValue);
          // Blocking reduces a spell's power
          enchantment.updatePower(enchantment.power - blockValue);
        }
      }
    }

    this.setHealth(this.health - damage);
  }

  tickDownActiveSpells() {
    // Remove a time token from each active spell
    // Make a copy of the array so we can safely remove spells from the original array while iterating
    // TODO: Add a delay so it's obvious which cards are cleared and which are new
    this.activeSpells.slice().forEach((spell) => {
      spell.tick();
    });
  }
}

class Player extends Character {
  constructor(scene, data, deck) {
    super(scene, data, deck);
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

    // TODO: Get specific deck for this enemy type
    const deck = data.deck || ENEMY_DECK;
    super(scene, data, deck);
    this.type = data.type;
    this.level = data.level;
  }

  discard(card) {
    // Enemies don't have a discard pile, so just remove the card from play
  }

  turn(player) {
    console.log(`Enemy turn: ${this.data.name}`);
    console.log(player);

    this.startTurn();
    console.log(this.cards.hand);

    // Keep playing cards until mana runs out, or no playable cards remain
    while (true) {
      // Enemy AI logic to determine what action to take
      const action = expensiveFirst(this, player);
      
      if (!action) break;

      const { card, target } = action;
      console.log(`Enemy plays card: ${card.name}`);
      this.playCard({ data: card }, target);

      // await this.delay(500);
    }
    this.endTurn();
  }
}
