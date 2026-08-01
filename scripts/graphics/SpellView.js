// Class to handle rendering of a spell on a character.

class SpellView {
  constructor(scene, spell, targetView) {
    this.scene = scene;
    this.spell = spell;
    this.targetView = targetView;

    this.card = spell.card;
    this.energy = spell.cost;

    const { container, timeSprite, powerSprite } = getSpellSprite(scene, this.card.data, targetView.x, this._getY());
    this.container = container;
    this.timeSprite = timeSprite;
    this.powerSprite = powerSprite;

    spell.on("tick", (value) => {
      this.timeSprite.setValue(value.toString());
    });
  }

  _getY() {
    const target = this.spell.target;
    const index = target.enchantments.indexOf(this.spell);
    return this.targetView.y + this.targetView.img.height / 2 - (index + 0.5) * 25;
  }

  disenchant() {
    // Remove from list of enchanments
    const enchantmentsList = this.spell.target.enchantments;
    const index = enchantmentsList.indexOf(this.spell);
    enchantmentsList.splice(index, 1);
    this.container.destroy();

    // Move later enchanments down;
    // for (let i = index; i < enchantmentsList.length; i++) {
    //   const y = this._getY(i);
    //   enchantmentsList[i].moveTo(y);
    // }
  }

  updatePosition() {
    const y = this._getY();
    this.moveTo(y);
  }

  moveTo(y) {
    this.scene.tweens.add({
      targets: this.container,
      y,
      duration: 240,
      ease: 'Sine.easeOut',
    });
  }
}
