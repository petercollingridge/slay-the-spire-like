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
    this.onResolve = card.data.onResolve;

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
    this.emit('tick', this.time);

    if (this.time <= 0) {
      this.resolve();
    }
  }

  resolve() {
    this.triggerEffect(this.onResolve);
    this.remove();
  }

  remove() {
    removeFromArray(this.source.activeSpells, this);
    removeFromArray(this.target.enchantments, this);
    this.game.discard.addCard(this.card);
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
    }
  }
}
