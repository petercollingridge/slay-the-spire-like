// A Spell is a card that has been cast and is in play as an enchantment on a character.
// It has a duration (time) and can have effects that trigger on each tick or when it resolves.

class Spell extends Phaser.Events.EventEmitter {
  constructor(game, card, source, target) {
    super();
    this.game = game;
    this.card = card;
    this.source = source;
    this.target = target;
    this.type = source === target ? 'boon' : 'hex';

    this.cost = card.data.cost;
    this.power = card.data.power;
    this.time = card.data.time;
    this.onTick = card.data.onTick;
    this.onDamagePass = card.data.onDamagePass;
    this.onResolve = card.data.onResolve;

    // Hexes played on opponents pass through caster's enchantments, which may alter their power.
    if (this.type === 'hex') {
      this.source.enchantments.forEach((enchantment) => {
        if (enchantment.onSpellPass) {
          let updateValue = getCardValue(enchantment.onSpellPass.power, enchantment);
          this.power = Math.max(0, this.power + updateValue);
        }
      });
    }

    if (card.data.onCast) {
      this.triggerEffect(card.data.onCast);
    }

    if (!this.time) {
      this.resolve();
    } else {
      this.source.activeSpells.push(this);
      this.target.enchant(this);
    }
  }

  tick() {
    this.time -= 1;
    this.triggerEffect(this.onTick);
    this.emit('updateTime', this.time);

    if (this.time <= 0) {
      this.resolve();
    }
  }

  updatePower(value) {
    this.power = Math.max(0, value);
    this.emit('updatePower', this.power);
  }

  resolve() {
    this.triggerEffect(this.onResolve);
    this.remove();
  }

  remove() {
    removeFromArray(this.source.activeSpells, this);
    this.target.disenchant(this);
    this.source.discard(this.card);
    this.emit('remove');
  }

  triggerEffect(effect) {
    if (!effect) {
      return;
    }

    if (Array.isArray(effect)) {
      effect.forEach((effect) => this.triggerEffect(effect));
    } else {
      if (effect.damage) {
        const value = getCardValue(effect.damage, this);
        this.target.triggerDamage(this, value);
      }
      if (effect.draw) {
        const value = getCardValue(effect.draw, this);
        this.game.drawCards(value);
      }
      if (effect.mana) {
        const value = getCardValue(effect.mana, this);
        this.target.updateMana(this.target.mana + value);
      }
      if (effect.power) {
        const value = getCardValue(effect.power, this);
        this.updatePower(this.power + value);
      }
      if (effect.special) {
        effect.special(this);
      }
    }
  }
}
