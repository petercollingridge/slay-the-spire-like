// Class to handle rendering of a spell on a character.

class SpellView {
  constructor(scene, spell, targetView) {
    this.scene = scene;
    this.spell = spell;
    this.targetView = targetView;

    this.card = spell.card;
    this.energy = spell.cost;

    const startY = spell.type === 'boon' ? HEIGHT + SPELL_HEIGHT : -SPELL_HEIGHT;
    const { container, timeSprite, powerSprite } = getSpellSprite(
      scene, this.card.data, targetView.x, startY, this.spell.type);

    this.container = container;
    this.timeSprite = timeSprite;
    this.powerSprite = powerSprite;
    this.moveTo(this._getY());
      
    spell.on("tick", (value) => {
      this.timeSprite.setValue(value.toString());
    });

    spell.on("remove", () => {
      this.container.destroy();
    });
  }

  _getY() {
    const target = this.spell.target;
    const index = target.enchantments.indexOf(this.spell);
    return this.targetView.y + this.targetView.img.height / 2 - (index + 0.5) * 25;
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
