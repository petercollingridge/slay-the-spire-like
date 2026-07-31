class Spell {
  constructor(source, target, data) {
    this.source = source;
    this.target = target;

    this.cost = data.cost;
    this.power = data.power;
    this.time = data.time;
    this.onTick = data.onTick;
    this.onResolve = data.onResolve;
  }

  tick() {
    this.time -= 1;
    if (this.onTick){
      this.onTick();
    }
    if (this.time <= 0) {
      this.resolve();
    }
  }

  resolve() {
    if (this.onResolve) {
      this.onResolve();
    }
    this.remove();
  }

  remove() {
    removeFromArray(this.source.activeSpells, this);
    removeFromArray(this.target.enchantments, this);
    // Add card to the discard pile
  }

  triggerEffect(effect) {
    if (Array.isArray(effect)) {
      effect.forEach((effect) => this.triggerEffect(effect));
    } else {
      if (effect.damage) {
        const value = getCardValue(effect.damage, this);
        this.target.takeDamage(value);
      }
    }
  }
}
