// Class to handle rendering of a spell on a character.

class SpellView {
  constructor(target, card, energy) {
    if (card && card.card) {
      this.cast(target, card);
      return;
    }

    this.target = target;
    this.card = card;
    this.energy = energy;

    const scene = target.game;
    this.scene = scene;
    this.type = card.data.enchant.type;
    this.effect = card.data.enchant.effect;
    this.mode = card.data.target === 'self' ? 'boon' : 'hex';

    const cardImg = scene.add.sprite(0, 0, this.mode);
    const image = scene.add.sprite(cardImg.width / 2 - 13, 0, card.data.img).setScale(0.3);
    
    const cardName = scene.add.text(0, 0, card.data.name, CARD_NAME_STYLE).setOrigin(0.5);
    this.energyImg = scene.add.text(13 - cardImg.width / 2, 1, this.energy, CIRCLE_NUM_STYLE).setOrigin(0.5);

    const x = target.x;
    const y = this._getY(target.enchantments.length);
    this.container = scene.add.container(x, y, [cardImg, image, this.energyImg, cardName]);
  }

  _getY(index) {
    return this.target.y + this.target.img.height / 2 - (index + 0.5) * 28;
  }

  disenchant() {
    // Remove from list of enchanments
    const enchantmentsList = this.target.enchantments;
    const index = enchantmentsList.indexOf(this);
    enchantmentsList.splice(index, 1);
    this.container.destroy();

    // Move later enchanments down;
    for (let i = index; i < enchantmentsList.length; i++) {
      const y = this._getY(i);
      enchantmentsList[i].moveTo(y);
    }
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
