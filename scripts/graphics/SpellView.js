// Class to handle rendering of a spell on a character.

class SpellView {
  constructor(scene, spell, targetView) {
    this.scene = scene;
    this.spell = spell;
    this.targetView = targetView;

    this.card = spell.card;
    this.energy = spell.cost;

    this.container = getSpellSprite(scene, this.card.data, targetView.x, this._getY());

    spell.on("tick", (value) => {
        this.energyImg.setText(value.toString());
    });
  }

  _getY() {
    const target = this.spell.target;
    const index = target.enchantments.indexOf(this.spell);
    return this.targetView.y + this.targetView.img.height / 2 - (index + 0.5) * 28;
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

  moveTo(y) {
    this.scene.tweens.add({
      targets: this.container,
      y,
      duration: 240,
      ease: 'Sine.easeOut',
    });
  }
}
